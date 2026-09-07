import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildEmailHtml,
  buildEmailText,
  buildSubject,
  escapeHtml,
  humanTimestamp,
  sanitizeMultiline,
  sendViaResend,
  stripControl,
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
  description: "Testing of transformer and switchgear at our plant.\nPlease advise on scope.",
  schedule: "Next quarter",
  consent: true,
  submittedAt: "2026-09-07T00:00:00.000Z",
};

const CONFIG: EmailConfig = {
  apiKey: "re_test-key",
  from: "Bestcor Website <noreply@bestcor.ph>",
  to: "info@bestcor.ph",
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

describe("sanitization", () => {
  it("strips control characters from single-line values", () => {
    expect(stripControl("ACME Power\r\nBcc: evil@example.com")).toBe(
      "ACME Power Bcc: evil@example.com",
    );
    expect(stripControl("  spaced\tout  ")).toBe("spaced out");
  });

  it("keeps intentional line breaks in multiline content but strips other controls", () => {
    expect(sanitizeMultiline("line one\nline two")).toBe("line one\nline two");
    expect(sanitizeMultiline("bell\u0007char")).toBe("bellchar");
  });

  it("escapes HTML metacharacters in user content", () => {
    expect(escapeHtml(`<script>alert("x")</script> & 'q'`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;q&#39;",
    );
  });
});

describe("subject", () => {
  it("never contains line breaks even if company attempts injection", () => {
    const subject = buildSubject({
      ...PAYLOAD,
      company: "ACME Power\r\nBcc: attacker@example.com",
    });
    expect(subject).not.toMatch(/[\r\n]/);
    expect(subject).toBe(
      "Quotation Request — ACME Power Bcc: attacker@example.com — Electrical Testing & Diagnostics",
    );
  });

  it("builds the expected subject with dynamic values", () => {
    expect(buildSubject(PAYLOAD)).toBe(
      "Quotation Request — ACME Power — Electrical Testing & Diagnostics",
    );
  });
});

describe("email content", () => {
  it("formats the server timestamp readably", () => {
    expect(humanTimestamp(PAYLOAD.submittedAt)).toBe("Mon, 07 Sep 2026 00:00:00 GMT");
    expect(humanTimestamp("garbage")).toBe("garbage");
  });

  it("builds a complete plain-text fallback", () => {
    const text = buildEmailText(PAYLOAD);
    expect(text).toContain("BESTCOR PHILS., INC. — QUOTATION REQUEST");
    expect(text).toContain("Name: Maria Santos");
    expect(text).toContain("Company: ACME Power");
    expect(text).toContain("Email: maria@example.com");
    expect(text).toContain("Phone: +63 900 000 0000");
    expect(text).toContain("Project Location: Bulacan");
    expect(text).toContain("Service Required: Electrical Testing & Diagnostics");
    expect(text).toContain("Desired Schedule: Next quarter");
    expect(text).toContain(
      "Testing of transformer and switchgear at our plant.\nPlease advise on scope.",
    );
    expect(text).toContain("SOURCE: Bestcor website (bestcor.ph)");
    expect(text).toContain("TIMESTAMP: Mon, 07 Sep 2026 00:00:00 GMT");
  });

  it("builds a branded HTML message with heading, values and source", () => {
    const html = buildEmailHtml(PAYLOAD);
    expect(html).toContain("BESTCOR&nbsp;<span style=\"color:#7fd56f;\">PHILS., INC.</span>");
    expect(html).toContain("Quotation Request");
    expect(html).toContain("Maria Santos");
    expect(html).toContain("ACME Power");
    expect(html).toContain("maria@example.com");
    expect(html).toContain("bestcor.ph");
    expect(html).toContain("white-space:pre-wrap;");
    expect(html).not.toContain("bestcorofficial2005@gmail.com");
  });

  it("escapes user HTML so it cannot alter the message markup", () => {
    const html = buildEmailHtml({
      ...PAYLOAD,
      company: "<b>bold</b><script>alert(1)</script>",
    });
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).toContain("&lt;b&gt;bold&lt;/b&gt;");
  });

  it("omits empty optional fields from both formats", () => {
    const p = { ...PAYLOAD, company: "", phone: "", location: "", schedule: "" };
    const text = buildEmailText(p);
    const html = buildEmailHtml(p);
    for (const frag of ["Company:", "Phone:", "Desired Schedule:", "Project Location:"]) {
      expect(text).not.toContain(frag);
    }
    expect(html).not.toContain("ACME Power");
  });
});

describe("sendViaResend (mocked transport)", () => {
  it("sends html + text with reply-to set to the customer email", async () => {
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
    expect(body.reply_to).toEqual([PAYLOAD.email]); // customer as reply-to only
    expect(body.subject).toBe("Quotation Request — ACME Power — Electrical Testing & Diagnostics");
    expect(body.text).toContain("PROJECT DESCRIPTION / SCOPE:");
    expect(body.html).toContain("<html");
    expect(body.html).toContain("Quotation Request");
  });

  it("reports failure on provider HTTP error", async () => {
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
