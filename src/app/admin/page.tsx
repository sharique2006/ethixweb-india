
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import AdminLeadStatus from "@/components/admin-lead-status";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string;
  message: string;
  status: string;
  created_at: string;
};

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (
    !user ||
    !adminEmail ||
    user.email?.trim().toLowerCase() !== adminEmail
  ) {
    redirect("/admin/login");
  }

  let leads: Lead[] = [];
  let loadError = "";

  try {
    const admin = getSupabaseAdmin();

    const { data, error } = await admin
      .from("leads")
      .select(
        "id,name,email,company,service,message,status,created_at"
      )
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) throw error;

    leads = (data ?? []) as Lead[];
  } catch (error) {
    console.error(
      "Could not load admin leads:",
      error instanceof Error ? error.message : "Unknown error"
    );

    loadError =
      "Could not load leads. Check your database setup and environment variables.";
  }

  return (
    <main className="admin-wrap">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Protected dashboard</div>
            <h1
              style={{
                fontFamily: "Manrope",
                fontSize: 38,
                letterSpacing: -1,
              }}
            >
              Enquiries
            </h1>
            <p className="section-intro">
              Signed in as {user.email}. Showing the latest 200 submissions.
            </p>
          </div>

          <form action="/api/admin/logout" method="post">
            <button className="button" type="submit">
              Sign out
            </button>
          </form>
        </div>

        {loadError && <p role="alert">{loadError}</p>}

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Lead</th>
                <th>Service</th>
                <th>Message</th>
                <th>Status</th>
                <th>Received</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <strong>{lead.name}</strong>
                    <br />
                    <a href={`mailto:${lead.email}`}>{lead.email}</a>
                    <br />
                    <span>{lead.company || "—"}</span>
                  </td>

                  <td>{lead.service}</td>

                  <td style={{ minWidth: 240, maxWidth: 360 }}>
                    {lead.message}
                  </td>

                  <td>
                    <AdminLeadStatus
                      leadId={lead.id}
                      initialStatus={lead.status}
                    />
                  </td>

                  <td>
                    {new Date(lead.created_at).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!loadError && leads.length === 0 && (
            <p>
              No enquiries yet. Test the public contact form to create the
              first lead.
            </p>
          )}
        </div>

        <p className="form-note" style={{ marginTop: 20 }}>
          Lead statuses are saved to the database. Only the authenticated
          administrator can update them.
        </p>

        <Link href="/" className="text-link">
          Back to website
        </Link>
      </div>
    </main>
  );
}
