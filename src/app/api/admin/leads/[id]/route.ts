
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

const ALLOWED_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "closed",
] as const;

type LeadStatus = (typeof ALLOWED_STATUSES)[number];

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Verify the signed-in admin.
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

    if (
      authError ||
      !user ||
      !adminEmail ||
      user.email?.trim().toLowerCase() !== adminEmail
    ) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in as admin." },
        { status: 401 }
      );
    }

    // Validate the lead ID.
    const { id } = await context.params;

    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
    ) {
      return NextResponse.json(
        { error: "Invalid lead ID." },
        { status: 400 }
      );
    }

    // Validate the requested status.
    const body: unknown = await request.json();

    if (
      !body ||
      typeof body !== "object" ||
      !("status" in body) ||
      typeof body.status !== "string" ||
      !ALLOWED_STATUSES.includes(body.status as LeadStatus)
    ) {
      return NextResponse.json(
        { error: "Invalid status." },
        { status: 400 }
      );
    }

    const status = body.status as LeadStatus;
    const db = getSupabaseAdmin();

    const { data, error } = await db
      .from("leads")
      .update({ status })
      .eq("id", id)
      .select("id,status")
      .maybeSingle();

    if (error) {
      console.error("Lead status update failed:", error.message);
      return NextResponse.json(
        { error: "Could not update lead status." },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Lead not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      lead: data,
    });
  } catch (error) {
    console.error(
      "Unexpected lead status update error:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
