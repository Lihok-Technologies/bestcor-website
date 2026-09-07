import { describe, expect, it, vi } from "vitest";
import { handleQuotationRequest, createRateLimiter } from "@/lib/quotation/service";
import type { EmailConfig, SendFn, SendResult } from "@/lib/quotation/email";

type SendOpts = Parameters<SendFn>[0];

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

const CONFIG: EmailConfig = {
  apiKey: "re_test-key",
  from: "Bestcor <onboarding@resend.dev>",
  to: "bestcorofficial2005@gmail.com",
};

const sendOk = vi.fn(async (_o: SendOpts): Promise<SendResult> => ({ ok: true, providerId: "mocked-id" }));
const sendFail = vi.fn(async (_o: SendOpts): Promise<SendResult> => ({ ok: false, reason: "provider-http-500" }));

describe("handleQuotationRequest", () => {
  it("returns silent success for honeypot hits without calling the provider", async () => {
    const send = vi.fn();
    const res = await handleQuotationRequest({
      raw: { ...VALID, company_website: "http://spam.example" },
      config: CONFIG,
      send,
    });
    expect(res.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });

  it("returns 503 UNCONFIGURED when no Resend key is set", async () => {
    const res = await handleQuotationRequest({ raw: VALID, config: null });
    expect(res.status).toBe(503);
    if (res.status === 503) expect(res.body.code).toBe("UNCONFIGURED");
  });

  it("returns 503 CONFIG_INCOMPLETE when a key exists but no sender is set", async () => {
    const res = await handleQuotationRequest({
      raw: VALID,
      config: { apiKey: "re_x", from: "", to: "bestcorofficial2005@gmail.com" },
    });
    expect(res.status).toBe(503);
    if (res.status === 503) expect(res.body.code).toBe("CONFIG_INCOMPLETE");
  });

  it("returns 422 VALIDATION for bad payloads", async () => {
    const res = await handleQuotationRequest({
      raw: { ...VALID, email: "nope", consent: false },
      config: CONFIG,
      send: sendOk,
    });
    expect(res.status).toBe(422);
    if (res.status === 422) {
      expect(res.body.fields).toContain("email");
      expect(res.body.fields).toContain("consent");
    }
  });

  it("returns 429 when the rate limiter refuses the IP", async () => {
    const limiter = createRateLimiter(1, 60_000);
    const first = await handleQuotationRequest({ raw: VALID, config: CONFIG, send: sendOk, limiter, ip: "1.2.3.4" });
    expect(first.status).toBe(200);
    const second = await handleQuotationRequest({ raw: VALID, config: CONFIG, send: sendOk, limiter, ip: "1.2.3.4" });
    expect(second.status).toBe(429);
  });

  it("returns 200 only after the provider accepts the message", async () => {
    const res = await handleQuotationRequest({ raw: VALID, config: CONFIG, send: sendOk, limiter: () => true });
    expect(res.status).toBe(200);
    if (res.status === 200 && "providerId" in res.body) {
      expect(res.body.providerId).toBe("mocked-id");
    }
  });

  it("returns 502 when the provider rejects or fails", async () => {
    const res = await handleQuotationRequest({ raw: VALID, config: CONFIG, send: sendFail, limiter: () => true });
    expect(res.status).toBe(502);
    if (res.status === 502) expect(res.body.code).toBe("DELIVERY_FAILED");
  });

  it("does not include the visitor as sender; only as recipient of the response", async () => {
    const send = vi.fn(async (_o: SendOpts): Promise<SendResult> => ({ ok: true }));
    await handleQuotationRequest({ raw: VALID, config: CONFIG, send, limiter: () => true });
    expect(send).toHaveBeenCalledTimes(1);
    const arg = send.mock.calls[0]![0];
    expect(arg.config.to).toBe("bestcorofficial2005@gmail.com");
    expect(arg.config.from).toBe(CONFIG.from);
  });
});
