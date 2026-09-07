import { site } from "@/lib/site";
import { services } from "@/lib/services";
import type { QuotationPayload } from "@/lib/quotation/validate";

/**
 * Bestcor quotation — email message building and Resend delivery.
 *
 * The provider is called from the server only. The visitor's address is
 * used as the reply-to, never as the sender.
 */

export type EmailConfig = {
  apiKey: string;
  to: string;
  from: string;
};

export function serviceLabel(service: string): string {
  return services.find((s) => s.title === service)?.title ?? service;
}

export function buildSubject(p: QuotationPayload): string {
  const who = p.company || p.name || "Website inquiry";
  const what = serviceLabel(p.service) || "Quotation request";
  return `NEW WEBSITE QUOTATION REQUEST — ${who} — ${what}`;
}

export function buildEmailText(p: QuotationPayload): string {
  const lines = [
    "BESTCOR WEBSITE QUOTATION REQUEST",
    "==================================",
    "",
    `Name: ${p.name}`,
    p.company ? `Company: ${p.company}` : "",
    `Email: ${p.email}`,
    p.phone ? `Phone: ${p.phone}` : "",
    p.location ? `Project Location: ${p.location}` : "",
    p.service ? `Service Required: ${serviceLabel(p.service)}` : "",
    p.schedule ? `Desired Schedule: ${p.schedule}` : "",
    "",
    "PROJECT DESCRIPTION / SCOPE:",
    p.description,
    "",
    `SOURCE: ${site.legalName} website`,
    `TIMESTAMP: ${p.submittedAt} (UTC)`,
  ];
  return lines.filter((l) => l !== "").join("\n") + "\n";
}

export type SendResult =
  | { ok: true; providerId?: string }
  | { ok: false; reason: string };

export type SendFn = (opts: {
  config: EmailConfig;
  payload: QuotationPayload;
}) => Promise<SendResult>;

/** Real Resend transport. Never import this client-side. */
export async function sendViaResend(opts: {
  config: EmailConfig;
  payload: QuotationPayload;
}): Promise<SendResult> {
  const { config, payload } = opts;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: [payload.email],
        subject: buildSubject(payload),
        text: buildEmailText(payload),
      }),
      signal: controller.signal,
    });
    if (!res.ok) {
      // Log operational detail server-side only; never expose to the visitor.
      console.warn(
        `[quotation] provider rejected (${res.status}): ${(await res.text()).slice(0, 300)}`,
      );
      return { ok: false, reason: `provider-http-${res.status}` };
    }
    const body = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, providerId: body.id };
  } catch (err) {
    console.warn(`[quotation] provider error: ${err instanceof Error ? err.message : "unknown"}`);
    return { ok: false, reason: "provider-network-error" };
  } finally {
    clearTimeout(timer);
  }
}
