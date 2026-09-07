import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildEmailText,
  buildSubject,
  sendViaResend,
  type EmailConfig,
} from "@/lib/quotation/email";
import type { QuotationPayload } from "@/lib/quotation/validate";

const PAYLOAD: QuotationPayload = {
  name: "Maria Santos",
  company: "ACME Power",
  email: "maria@example.com",
  phone: "+63 900 000 0000",
  location: "Bulacan",
  service: "Electrical Testing & Diagnostics",
  description: "Testing of transformer and switchgear at our plant, including scope advice.",
  schedule: "Next quarter",
  consent: true,
  submittedAt: "2026-09-07T00:00:00.000Z",
};

const CONFIG: EmailConfig = {
  apiKey: "re_test-key",
  from: "Bestcor Website <onboarding@resend.dev>",
  to: "bestcorofficial2005@gmail.com",
};

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("email content", () => {
  it("builds an immediately useful subject", () => {
    expect(buildSubject(PAYLOAD)).toBe(
      "NEW WEBSITE QUOTATION REQUEST — ACME Power — Electrical Testing & Diagnostics",
    );
  });

  it("uses the person's name in the subject when no company is given", () => {
    expect(buildSubject({ ...PAYLOAD, company: "" })).toContain("Maria Santos");
  });

  it("lays out every submitted field in the body and nothing false", () => {
    const text = buildEmailText(PAYLOAD);
    expect(text).toContain("BESTCOR WEBSITE QUOTATION REQUEST");
    expect(text).toContain("Name: Maria Santos");
    expect(text).toContain("Company: ACME Power");
    expect(text).toContain("Email: maria@example.com");
    expect(text).toContain("Phone: +63 900 000 0000");
    expect(text).toContain("Project Location: Bulacan");
    expect(text).toContain("Service Required: Electrical Testing & Diagnostics");
    expect(text).toContain("Desired Schedule: Next quarter");
    expect(text).toContain("PROJECT DESCRIPTION / SCOPE:");
    expect(text).toContain("SOURCE: Bestcor Phils., Inc. website");
    expect(text).toContain("TIMESTAMP: 2026-09-07T00:00:00.000Z (UTC)");
  });

  it("omits empty optional fields", () => {
    const text = buildEmailText({ ...PAYLOAD, company: "", phone: "", location: "", schedule: "" });
    expect(text).not.toContain("Company:");
    expect(text).not.toContain("Phone:");
    expect(text).not.toContain("Desired Schedule:");
  });
});

describe("sendViaResend (mocked transport)", () => {
  it("returns ok with provider id on 200", async () => {
    const fetchMock = vi.fn(async (_input: RequestInfo | URL, _init?: RequestInit) =>
      jsonResponse(200, { id: "resend-id-123" }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const res = await sendViaResend({ config: CONFIG, payload: PAYLOAD });
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.providerId).toBe("resend-id-123");

    const [url, init] = fetchMock.mock.calls[0]!;
    expect(String(url)).toBe("https://api.resend.com/emails");
    const body = JSON.parse(String(init?.body));
    expect(body.from).toBe(CONFIG.from);
    expect(body.to).toEqual([CONFIG.to]);
    expect(body.reply_to).toEqual([PAYLOAD.email]); // visitor address as reply-to only
    expect(body.subject).toContain("ACME Power");
    expect(body.text).toContain("PROJECT DESCRIPTION / SCOPE:");
  });

  it("reports failure on provider HTTP error without leaking details", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (_input: RequestInfo | URL) => jsonResponse(401, { message: "unauthorized" })),
    );
    const res = await sendViaResend({ config: CONFIG, payload: PAYLOAD });
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.reason).toBe("provider-http-401");
  });

  it("reports failure on network error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (_input: RequestInfo | URL) => Promise.reject(new Error("ECONNREFUSED"))),
    );
    const res = await sendViaResend({ config: CONFIG, payload: PAYLOAD });
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.reason).toBe("provider-network-error");
  });
});
