import { NextResponse } from "next/server";
import {
  handleQuotationRequest,
  quotationConfigFromEnv,
} from "@/lib/quotation/service";

/**
 * Bestcor quotation intake endpoint (server only).
 *
 * Order: honeypot → server-side validation → per-IP rate limit → Resend
 * delivery (server-side only, key never leaves the server). Success is
 * reported ONLY after the provider accepts the message. Without
 * RESEND_API_KEY the endpoint reports UNCONFIGURED and the UI offers an
 * honest email fallback to bestcorofficial2005@gmail.com.
 *
 * Required env (server): RESEND_API_KEY, BESTCOR_QUOTATION_FROM_EMAIL.
 * Optional env: BESTCOR_QUOTATION_TO_EMAIL (defaults to the published
 * Bestcor email).
 */

export const runtime = "nodejs";

export async function POST(request: Request) {
  // Oversized request guard (belt and braces; Next also enforces a body cap).
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 64_000) {
    return NextResponse.json(
      { ok: false, code: "PAYLOAD_TOO_LARGE", message: "Request too large." },
      { status: 413 },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "BAD_REQUEST", message: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || "unknown";

  const result = await handleQuotationRequest({
    raw,
    ip,
    config: quotationConfigFromEnv(),
  });

  return NextResponse.json(result.body, { status: result.status });
}
