import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Quotation intake endpoint.
 *
 * The website must never claim a quotation was delivered unless it actually
 * was. Delivery works like this, in order:
 *   1. If QUOTATION_WEBHOOK_URL is set, the payload is POSTed there as JSON
 *      (any future integration — Resend/SMTP/Supabase — can sit behind that
 *      endpoint). Success is reported ONLY when that endpoint returns 2xx.
 *   2. Otherwise the API reports NOT_CONFIGURED and the UI offers an honest
 *      mailto fallback to bestcorofficial2005@gmail.com.
 *
 * Required env: none. Optional env: QUOTATION_WEBHOOK_URL.
 * See README "Environment variables".
 */

const REQUIRED_FIELDS = ["name", "email", "description"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const runtime = "nodejs";

type Payload = {
  name?: string;
  company?: string;
  company_website?: string; // honeypot
  email?: string;
  phone?: string;
  location?: string;
  service?: string;
  description?: string;
  schedule?: string;
  consent?: boolean;
};

function clean(p: Payload) {
  const str = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 2000) : "");
  return {
    name: str(p.name),
    company: str(p.company),
    email: str(p.email),
    phone: str(p.phone),
    location: str(p.location),
    service: str(p.service),
    description: str(p.description).slice(0, 6000),
    schedule: str(p.schedule),
    consent: Boolean(p.consent),
    submittedAt: new Date().toISOString(),
  };
}

export async function POST(request: Request) {
  let raw: Payload;
  try {
    raw = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, code: "BAD_REQUEST", message: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const payload = clean(raw);

  // Honeypot: silently accept so bots learn nothing, but never store/send.
  const spam =
    typeof raw.company_website === "string" && raw.company_website.trim().length > 0;
  if (spam) {
    return NextResponse.json({ ok: true, accepted: true });
  }

  const missing = REQUIRED_FIELDS.filter((f) => !payload[f]);
  if (missing.length > 0 || !EMAIL_RE.test(payload.email)) {
    return NextResponse.json(
      {
        ok: false,
        code: "VALIDATION",
        message: "Please complete the required fields with a valid email.",
        fields: missing,
      },
      { status: 422 },
    );
  }

  const webhookUrl = process.env.QUOTATION_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return NextResponse.json(
      {
        ok: false,
        code: "UNCONFIGURED",
        message:
          "Quotation delivery is not enabled on this deployment. Please use the email fallback.",
      },
      { status: 503 },
    );
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "bestcor-website",
        form: "quotation",
        to: site.email,
        payload,
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, code: "DELIVERY_FAILED", message: "Delivery failed. Please try again or email us directly." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, accepted: true });
  } catch {
    return NextResponse.json(
      { ok: false, code: "DELIVERY_FAILED", message: "Delivery failed. Please try again or email us directly." },
      { status: 502 },
    );
  }
}
