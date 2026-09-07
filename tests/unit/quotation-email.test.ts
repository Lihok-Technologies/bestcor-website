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
    expect(text).toContain("SOURCE: Bestcor Phils., Inc. website (bestcor.ph)");
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

  it("keeps the muted footer colors readable (AA contrast on light background)", () => {
    const html = buildEmailHtml(PAYLOAD);
    // footer/meta text darkened from #7c8b82 to #4e6257 (>= 4.5:1 on #fff/#f0f3f1)
    expect(html).not.toContain("color:#7c8b82");
    expect(html).toContain("color:#4e6257");
    expect(html).toContain("Built on integrity. Driven by quality.");
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

/* Reviewer-driven hardening tests (MINOR findings) */

describe("subject edge cases", () => {
  it("falls back to the person's name when no company is given", () => {
    expect(buildSubject({ ...PAYLOAD, company: "" })).toContain("Maria Santos");
  });

  it("falls back to 'Website inquiry' when company and name are empty", () => {
    expect(buildSubject({ ...PAYLOAD, company: "", name: "" })).toBe(
      "Quotation Request — Website inquiry — Electrical Testing & Diagnostics",
    );
  });

  it("caps overlong company values in the subject", () => {
    const subject = buildSubject({ ...PAYLOAD, company: "A".repeat(300) });
    expect(subject).not.toContain("A".repeat(121));
    expect(subject.length).toBeLessThan(400);
  });
});

describe("content-injection coverage across all user fields", () => {
  it("escapes markup placed in description, name and email rows", () => {
    const html = buildEmailHtml({
      ...PAYLOAD,
      name: "<img src=x onerror=1>",
      email: "maria'&\"<script>alert(1)</script>@example.com",
      description: '<script>alert("xss")</script> body & more',
    });
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).not.toContain("<img src=x onerror=1>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&lt;img src=x onerror=1&gt;");
    expect(html).toContain("&amp; more");
  });
});

describe("display formatting details", () => {
  it("preserves internal spacing in display values", () => {
    const text = buildEmailText({ ...PAYLOAD, phone: "+63  900  000  0000" });
    expect(text).toContain("Phone: +63  900  000  0000");
  });

  it("maps unicode line separators to newlines", () => {
    expect(sanitizeMultiline("a\u2028b\u2029c")).toBe("a\nb\nc");
  });

  it("sanitizes unparseable timestamps instead of echoing them raw", () => {
    expect(humanTimestamp("bad\u0007stamp")).toBe("bad stamp");
  });
});

describe("HTML structural safety", () => {
  it("starts with a doctype and declares UTF-8", () => {
    const html = buildEmailHtml(PAYLOAD);
    expect(html.startsWith("<!doctype html>")).toBe(true);
    expect(html).toContain('meta http-equiv="Content-Type" content="text/html; charset=UTF-8"');
  });

  it("emits balanced tables and rows", () => {
    const html = buildEmailHtml(PAYLOAD);
    expect((html.match(/<table/g) ?? []).length).toBe((html.match(/<\/table>/g) ?? []).length);
    expect((html.match(/<tr/g) ?? []).length).toBe((html.match(/<\/tr>/g) ?? []).length);
    expect((html.match(/<td/g) ?? []).length).toBe((html.match(/<\/td>/g) ?? []).length);
  });

  it("omits empty optional rows in HTML too", () => {
    const p = { ...PAYLOAD, company: "", phone: "", location: "", schedule: "" };
    const html = buildEmailHtml(p);
    for (const label of ["Company", "Phone", "Project Location", "Desired Schedule"]) {
      expect(html).not.toContain(`>${label}<`);
    }
    expect(html).toContain(">Name<");
    expect(html).toContain(">Timestamp<");
  });
});

describe("sendViaResend sender/recipient isolation", () => {
  it("keeps from/to bound to config regardless of user payload", async () => {
    const fetchMock = vi.fn(async (_input: RequestInfo | URL, _init?: RequestInit) =>
      jsonResponse(200, { id: "iso-1" }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const hostile = {
      ...PAYLOAD,
      company: CONFIG.from,
      email: `to:${CONFIG.to}@example.com`,
      description: `To: ${CONFIG.to}\nFrom: attacker@evil.example`,
    };
    const res = await sendViaResend({ config: CONFIG, payload: hostile });
    expect(res.ok).toBe(true);
    const body = JSON.parse(String(fetchMock.mock.calls[0]![1]?.body));
    expect(body.from).toBe(CONFIG.from);
    expect(body.to).toEqual([CONFIG.to]);
    expect(body.reply_to).toEqual([hostile.email]);
  });
});
