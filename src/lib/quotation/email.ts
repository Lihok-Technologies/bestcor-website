import { site } from "@/lib/site";
import { services } from "@/lib/services";
import type { QuotationPayload } from "@/lib/quotation/validate";

/**
 * Bestcor quotation — email message building and Resend delivery.
 *
 * The provider is called from the server only. The visitor's address is
 * used as the reply-to, never as the sender. Messages are delivered as
 * branded HTML with a plain-text fallback. All user-supplied values are
 * escaped for HTML and stripped of control characters before they can
 * reach the subject line or body — no header/content injection.
 */

export type EmailConfig = {
  apiKey: string;
  to: string;
  from: string;
};

/* ------------------------------------------------------------------ */
/* Sanitization helpers                                                */
/* ------------------------------------------------------------------ */

/** One-line value: control characters gone, whitespace runs collapsed. */
export function stripControl(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f-\u009f]/g, " ").replace(/\s+/g, " ").trim();
}

/** Display value: control characters gone but internal spacing preserved. */
export function stripControlKeepSpacing(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f-\u009f]/g, " ").trim();
}

/** Keep real line breaks but drop every other control character. */
export function sanitizeMultiline(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/g, "")
    .replace(/[\u2028\u2029]/g, "\n")
    .trim();
}

/** HTML-escape user content so it can never alter email markup. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** One-line value for the subject line (no line breaks possible). */
function oneLine(value: string): string {
  return stripControl(value).slice(0, 120) || "Website inquiry";
}

export function serviceLabel(service: string): string {
  return services.find((s) => s.title === service)?.title ?? service;
}

/* ------------------------------------------------------------------ */
/* Subject + body builders                                             */
/* ------------------------------------------------------------------ */

export function buildSubject(p: QuotationPayload): string {
  const who = oneLine(p.company || p.name || "Website inquiry");
  const what = oneLine(serviceLabel(p.service) || "Quotation request");
  return `Quotation Request — ${who} — ${what}`;
}

export function humanTimestamp(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? stripControl(iso) : d.toUTCString();
}

function optionalLines(p: QuotationPayload): string[] {
  return [
    p.company ? `Company: ${stripControlKeepSpacing(p.company)}` : "",
    `Email: ${stripControlKeepSpacing(p.email)}`,
    p.phone ? `Phone: ${stripControlKeepSpacing(p.phone)}` : "",
    p.location ? `Project Location: ${stripControlKeepSpacing(p.location)}` : "",
    p.service ? `Service Required: ${stripControlKeepSpacing(serviceLabel(p.service))}` : "",
    p.schedule ? `Desired Schedule: ${stripControlKeepSpacing(p.schedule)}` : "",
  ].filter(Boolean);
}

export function buildEmailText(p: QuotationPayload): string {
  const lines = [
    "BESTCOR PHILS., INC. — QUOTATION REQUEST",
    "========================================",
    "",
    `Name: ${stripControlKeepSpacing(p.name)}`,
    ...optionalLines(p),
    "",
    "PROJECT DESCRIPTION / SCOPE:",
    sanitizeMultiline(p.description),
    "",
    `SOURCE: ${site.legalName} website (${site.websiteDomain})`,
    `TIMESTAMP: ${humanTimestamp(p.submittedAt)}`,
  ];
  return lines.join("\n") + "\n";
}

function rowHtml(label: string, value: string): string {
  return (
    `<tr>` +
    `<td style="width:220px;padding:7px 0;vertical-align:top;color:#4e6257;font-size:13px;line-height:1.5;">${escapeHtml(label)}</td>` +
    `<td style="padding:7px 0;vertical-align:top;color:#131b16;font-size:14px;line-height:1.5;font-weight:600;">${escapeHtml(value)}</td>` +
    `</tr>`
  );
}

export function buildEmailHtml(p: QuotationPayload): string {
  const rows = [
    rowHtml("Name", stripControlKeepSpacing(p.name)),
    ...optionalLines(p).map((line) => {
      const idx = line.indexOf(": ");
      const label = idx > -1 ? line.slice(0, idx) : line;
      const value = idx > -1 ? line.slice(idx + 2) : "";
      return rowHtml(label, value);
    }),
    rowHtml("Timestamp", humanTimestamp(p.submittedAt)),
  ].join("\n");

  const description = escapeHtml(sanitizeMultiline(p.description));

  return `<!doctype html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#e7ece8;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e7ece8;padding:24px 12px;">
  <tr><td align="center">
  <table role="presentation" width="620" cellpadding="0" cellspacing="0" style="width:620px;max-width:100%;background:#ffffff;border:1px solid #d7ded9;font-family:Arial,Helvetica,sans-serif;">
    <tr>
      <td style="background:#0b100e;padding:26px 34px;">
        <div style="font-size:17px;font-weight:bold;color:#ffffff;letter-spacing:0.4px;">BESTCOR&nbsp;<span style="color:#7fd56f;">PHILS., INC.</span></div>
        <div style="font-size:10px;color:#8fa39a;letter-spacing:2.4px;margin-top:7px;text-transform:uppercase;">Civil · Electromechanical Contractor</div>
      </td>
    </tr>
    <tr>
      <td style="padding:30px 34px 6px;">
        <div style="font-size:11px;font-weight:bold;color:#d0211a;letter-spacing:2.2px;text-transform:uppercase;">${site.legalName} website — ${site.websiteDomain}</div>
        <h1 style="margin:10px 0 0;font-size:24px;color:#101612;letter-spacing:0.2px;">Quotation Request</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 34px 4px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${rows}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 34px 0;">
        <div style="border-left:3px solid #d0211a;background:#f5f7f6;padding:16px 20px;font-size:14px;color:#222b26;line-height:1.55;white-space:pre-wrap;">${description}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:22px 34px 8px;font-size:12px;color:#4e6257;line-height:1.7;">
        This request was submitted through the Bestcor website quotation form at <b>${site.websiteDomain}</b>.
      </td>
    </tr>
    <tr>
      <td style="background:#f0f3f1;padding:18px 34px;font-size:11px;color:#4e6257;line-height:1.7;">
        Built on integrity. Driven by quality.<br/>
        ${escapeHtml(site.legalName)} · San Jose del Monte, Bulacan, Philippines · ${escapeHtml(site.email)}
      </td>
    </tr>
  </table>
  </td></tr>
</table>
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/* Transport                                                           */
/* ------------------------------------------------------------------ */

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
        html: buildEmailHtml(payload),
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
