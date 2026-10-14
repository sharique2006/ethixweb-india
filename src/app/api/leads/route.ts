import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(120).optional().default(""),
  service: z.enum([
    "Website design & development",
    "AI & automation",
    "Web application",
    "CRM & integrations",
    "SEO & digital marketing",
    "Other / not sure yet",
  ]),
  message: z.string().trim().min(10).max(3000),
  website: z.string().max(0).optional().default(""),
});

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function getClientIp(request: NextRequest): string | null {
  // Vercel supplies the client IP through x-real-ip.
  const realIp = request.headers.get("x-real-ip")?.trim();

  if (realIp) {
    return realIp;
  }

  // Fallback for local development or other trusted proxies.
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    // Accept JSON requests only.
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return jsonError("Please submit a valid form.", 415);
    }

    // Reject cross-origin browser submissions.
    const origin = request.headers.get("origin");

    if (origin) {
      try {
        if (new URL(origin).origin !== new URL(request.url).origin) {
          return jsonError("Invalid request origin.", 403);
        }
      } catch {
        return jsonError("Invalid request origin.", 403);
      }
    }

    // Reject oversized requests when the size is provided.
    const contentLength = Number(
      request.headers.get("content-length") || 0
    );

    if (contentLength > 12000) {
      return jsonError("Request is too large.", 413);
    }

    let raw: unknown;

    try {
      raw = await request.json();
    } catch {
      return jsonError("Invalid JSON request.", 400);
    }

    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      return jsonError("Please submit valid form details.", 400);
    }

    const input = raw as Record<string, unknown>;

    // Honeypot: accept bot submissions without storing them.
    if (
      typeof input.website === "string" &&
      input.website.trim().length > 0
    ) {
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    // Rate limit each client IP to 5 requests per minute.
    const clientIp = getClientIp(request);

    if (!clientIp) {
      console.error("Rate limiting unavailable: client IP missing.");
      return jsonError(
        "We couldn't process your request right now. Please try again later.",
        503
      );
    }

    // If Upstash is unavailable, the outer catch fails closed.
    const rateLimit = await checkRateLimit(clientIp);

    if (!rateLimit.success) {
      const retryAfter = Math.max(
        1,
        Math.ceil((rateLimit.reset - Date.now()) / 1000)
      );

      return NextResponse.json(
        {
          error: "Too many requests. Please try again in a minute.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfter),
            "X-RateLimit-Limit": String(rateLimit.limit),
            "X-RateLimit-Remaining": String(rateLimit.remaining),
          },
        }
      );
    }

    // Validate all submitted fields.
    const parsed = schema.safeParse(raw);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please check your details and try again.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, company, service, message } = parsed.data;

    // Store the enquiry in Supabase.
    const supabase = getSupabaseAdmin();

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      company,
      service,
      message,
      status: "new",
    });

    if (error) {
      console.error("Lead insert failed:", error.code);

      return jsonError(
        "We couldn't save your enquiry right now. Please try again later.",
        503
      );
    }

    return NextResponse.json(
      { ok: true },
      {
        status: 201,
        headers: {
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      }
    );
  } catch (error) {
    console.error(
      "Lead API error:",
      error instanceof Error ? error.message : "unknown"
    );

    return jsonError(
      "Service temporarily unavailable. Please try again later.",
      503
    );
  }
}