import { site } from "@/lib/site";
import {
  cleanPayload,
  isBot,
  validateQuotation,
  type QuotationPayload,
} from "@/lib/quotation/validate";
import { sendViaResend, type EmailConfig, type SendFn } from "@/lib/quotation/email";

/**
 * Bestcor quotation intake — orchestration (unit-testable, no Next deps).
 *
 * Order of checks:
 *   1. malformed JSON (handled by the caller)
 *   2. honeypot  → silent success (never stored or sent)
 *   3. validation (required fields, email format, service allow-list,
 *      description length, consent)
 *   4. rate limit (per IP, in-memory — fine for a single instance)
 *   5. delivery via Resend when RESEND_API_KEY is configured
 *      → honest 200 only after provider acceptance
 *   6. otherwise NOT_CONFIGURED → UI offers the email fallback
 */

export type QuotationResult =
  | { status: 200; body: { ok: true; accepted: true } }
  | { status: 422; body: { ok: false; code: "VALIDATION"; message: string; fields: string[] } }
  | { status: 429; body: { ok: false; code: "RATE_LIMITED"; message: string } }
  | {
      status: 503;
      body: {
        ok: false;
        code: "UNCONFIGURED" | "CONFIG_INCOMPLETE";
        message: string;
      };
    }
  | { status: 502; body: { ok: false; code: "DELIVERY_FAILED"; message: string } }
  | { status: 200; body: { ok: true; accepted: true; providerId?: string } };

export type RateLimiter = (ip: string) => boolean;

export function createRateLimiter(max = 6, windowMs = 3_600_000): RateLimiter {
  const hits = new Map<string, number[]>();
  return (ip: string) => {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= max) {
      hits.set(ip, recent);
      return false;
    }
    recent.push(now);
    hits.set(ip, recent);
    return true;
  };
}

/** Module-level limiter shared by all requests on this instance. */
const defaultLimiter = createRateLimiter(6, 3_600_000);

export async function handleQuotationRequest(opts: {
  raw: unknown;
  ip?: string;
  config?: EmailConfig | null;
  send?: SendFn;
  limiter?: RateLimiter;
  now?: Date;
}): Promise<QuotationResult> {
  const raw = (typeof opts.raw === "object" && opts.raw !== null
    ? opts.raw
    : {}) as Record<string, unknown>;
  const ip = opts.ip ?? "unknown";
  const send = opts.send ?? sendViaResend;
  const limiter = opts.limiter ?? defaultLimiter;
  const now = opts.now ?? new Date();

  if (isBot(raw)) {
    return { status: 200, body: { ok: true, accepted: true } };
  }

  const payload: QuotationPayload = cleanPayload(raw);
  const validated = validateQuotation(payload, now);
  if (!validated.ok) {
    return {
      status: 422,
      body: {
        ok: false,
        code: "VALIDATION",
        message: "Please complete the required fields with a valid email.",
        fields: validated.fields,
      },
    };
  }
  const clean = validated.payload;

  if (!limiter(ip)) {
    return {
      status: 429,
      body: {
        ok: false,
        code: "RATE_LIMITED",
        message: "Too many requests. Please wait a while and try again.",
      },
    };
  }

  const config = opts.config && opts.config.apiKey && opts.config.from ? opts.config : null;
  if (!config) {
    // Distinguish "no key set at all" (normal, waiting for owner setup)
    // from "key present but sender address missing" (misconfiguration).
    const incomplete = Boolean(opts.config?.apiKey);
    return {
      status: 503,
      body: {
        ok: false,
        code: incomplete ? "CONFIG_INCOMPLETE" : "UNCONFIGURED",
        message: incomplete
          ? "Quotation delivery is misconfigured. Please use the email fallback."
          : "Quotation delivery is not enabled on this deployment. Please use the email fallback.",
      },
    };
  }

  const result = await send({ config, payload: clean });
  if (!result.ok) {
    return {
      status: 502,
      body: {
        ok: false,
        code: "DELIVERY_FAILED",
        message: "We couldn't send your request right now. Please try again or email Bestcor directly.",
      },
    };
  }
  return {
    status: 200,
    body: { ok: true, accepted: true, providerId: result.providerId },
  };
}

/** Runtime configuration assembled from environment variables (server only). */
export function quotationConfigFromEnv(): EmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.BESTCOR_QUOTATION_FROM_EMAIL?.trim();
  if (!apiKey) return null;
  return {
    apiKey,
    from: from ?? "",
    to: process.env.BESTCOR_QUOTATION_TO_EMAIL?.trim() || site.email,
  };
}
