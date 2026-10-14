
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const statuses = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "closed", label: "Closed" },
] as const;

type LeadStatus = (typeof statuses)[number]["value"];

export default function AdminLeadStatus({
  leadId,
  initialStatus,
}: {
  leadId: string;
  initialStatus: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function updateStatus(nextStatus: string) {
    const previousStatus = status;

    setStatus(nextStatus);
    setMessage("");
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not update status.");
      }

      setMessage("Saved");
      router.refresh();
    } catch (error) {
      setStatus(previousStatus);
      setMessage(
        error instanceof Error ? error.message : "Update failed."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-status-control">
      <select
        aria-label="Update lead status"
        value={status}
        disabled={saving}
        onChange={(event) => updateStatus(event.target.value)}
      >
        {statuses.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <span
        className="admin-status-message"
        role="status"
        aria-live="polite"
      >
        {saving ? "Saving…" : message}
      </span>
    </div>
  );
}
