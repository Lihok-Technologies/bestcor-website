import { describe, expect, it } from "vitest";
import {
  cleanPayload,
  validateQuotation,
  isBot,
  ALLOWED_SERVICES,
} from "@/lib/quotation/validate";

const VALID = {
  name: "Maria Santos",
  company: "ACME Power",
  email: "maria@example.com",
  phone: "+63 900 000 0000",
  location: "Bulacan",
  service: "Electrical Testing & Diagnostics",
  description:
    "We need electrical testing of our transformer and switchgear at our plant. Please advise on scope and schedule.",
  schedule: "Next quarter",
  consent: true,
};

describe("cleanPayload", () => {
  it("normalizes and trims strings, and caps field lengths", () => {
    const p = cleanPayload({ ...VALID, name: "  Juan  ", description: "x".repeat(20_000) });
    expect(p.name).toBe("Juan");
    expect(p.description.length).toBeLessThanOrEqual(6000);
    expect(typeof p.submittedAt).toBe("string");
  });

  it("treats non-string values as empty", () => {
    const p = cleanPayload({ name: 123, email: null, consent: "yes" });
    expect(p.name).toBe("");
    expect(p.email).toBe("");
    expect(p.consent).toBe(false);
  });
});

describe("isBot (honeypot)", () => {
  it("detects a filled honeypot field", () => {
    expect(isBot({ company_website: "http://spam.example" })).toBe(true);
    expect(isBot({ company_website: "" })).toBe(false);
    expect(isBot({})).toBe(false);
  });
});

describe("validateQuotation", () => {
  it("accepts a complete valid quotation", () => {
    const res = validateQuotation(cleanPayload(VALID));
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.payload.submittedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("rejects missing required fields", () => {
    const res = validateQuotation(cleanPayload({ ...VALID, name: "", consent: false }));
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.fields).toContain("name");
      expect(res.fields).toContain("consent");
    }
  });

  it("rejects an invalid email format", () => {
    const res = validateQuotation(cleanPayload({ ...VALID, email: "not-an-email" }));
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.fields).toContain("email");
  });

  it("rejects a service value outside the allow-list", () => {
    const res = validateQuotation(cleanPayload({ ...VALID, service: "Hacking services" }));
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.fields).toContain("service");
  });

  it("accepts every published service plus the multi-service option", () => {
    for (const service of ALLOWED_SERVICES) {
      const res = validateQuotation(cleanPayload({ ...VALID, service }));
      expect(res.ok).toBe(true);
    }
  });

  it("rejects too-short or empty descriptions", () => {
    const short = validateQuotation(cleanPayload({ ...VALID, description: "too short" }));
    expect(short.ok).toBe(false);
    const empty = validateQuotation(cleanPayload({ ...VALID, description: "" }));
    expect(empty.ok).toBe(false);
  });

  it("requires an email address overall length check", () => {
    const res = validateQuotation(
      cleanPayload({ ...VALID, email: `${"a".repeat(180)}@example.com` }),
    );
    expect(res.ok).toBe(false);
  });
});
