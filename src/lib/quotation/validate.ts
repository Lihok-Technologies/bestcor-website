/**
 * Bestcor quotation — server-side validation.
 * Input is never trusted; everything is trimmed, length-capped and checked.
 */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LIMITS = {
  name: 160,
  company: 200,
  email: 150,
  phone: 60,
  location: 200,
  service: 160,
  schedule: 200,
  description: { min: 20, max: 6000 },
} as const;

export const ALLOWED_SERVICES = [
  "Preventive Maintenance",
  "On-Site Repairs",
  "Supply, Installation & Construction",
  "Electrical Testing & Diagnostics",
  "Distribution Components & Works",
  "Transmission & Pole-Line Works",
  "Multiple services / not listed",
] as const;

export type QuotationPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  description: string;
  schedule: string;
  consent: boolean;
  submittedAt: string;
};

type Raw = Record<string, unknown>;

export function isBot(raw: Raw): boolean {
  // Honeypot field that humans never fill
  const hp = raw.company_website;
  return typeof hp === "string" && hp.trim().length > 0;
}

/** Normalize + trim + cap. Non-string fields become "". */
export function cleanPayload(raw: Raw): QuotationPayload {
  const str = (v: unknown, max: number) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";
  return {
    name: str(raw.name, LIMITS.name),
    company: str(raw.company, LIMITS.company),
    email: str(raw.email, LIMITS.email),
    phone: str(raw.phone, LIMITS.phone),
    location: str(raw.location, LIMITS.location),
    service: str(raw.service, LIMITS.service),
    description: str(raw.description, LIMITS.description.max),
    schedule: str(raw.schedule, LIMITS.schedule),
    consent: raw.consent === true,
    submittedAt: "",
  };
}

export type ValidationResult = { ok: true; payload: QuotationPayload } | { ok: false; fields: string[] };

/**
 * Server-side validation of a cleaned payload. Service must be one of the
 * known choices; description must be substantive; email format enforced.
 */
export function validateQuotation(p: QuotationPayload, now = new Date()): ValidationResult {
  const fields: string[] = [];
  if (!p.name) fields.push("name");
  if (!p.email) fields.push("email");
  else if (!EMAIL_RE.test(p.email) || p.email.length > LIMITS.email) fields.push("email");
  if (!p.service || !(ALLOWED_SERVICES as readonly string[]).includes(p.service)) fields.push("service");
  const desc = p.description;
  if (!desc || desc.length < LIMITS.description.min || desc.length > LIMITS.description.max) {
    fields.push("description");
  }
  if (p.consent !== true) fields.push("consent");
  // sanity: timestamps come from the server, but guard odd clock inputs
  if (Number.isNaN(now.getTime())) fields.push("description");
  if (fields.length > 0) return { ok: false, fields };
  return { ok: true, payload: { ...p, submittedAt: now.toISOString() } };
}
