
"use client";

import { Phone, MapPin, IdCard, Loader2, CheckCircle2, XCircle } from "lucide-react";

type Props = {
  row: any;
  onClose: () => void;
  onApprove: (row: any) => void;
  onReject: (row: any) => void;
  approvingId?: string | null;
};

export default function RequestDetailsDrawer({
  row,
  onClose,
  onApprove,
  onReject,
  approvingId,
}: Props) {
  if (!row) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto bg-white dark:bg-neutral-950 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-border/30 bg-white/80 dark:bg-neutral-900/80 backdrop-blur px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Request Details</h3>
            <button
              onClick={onClose}
              className="rounded-lg border border-border/40 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-neutral-800 transition"
            >
              Close
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoBox label="Full Name">{row.full_name}</InfoBox>
            <InfoBox label="Phone">
              <span className="inline-flex items-center gap-1">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                {row.phone_num || "—"}
              </span>
            </InfoBox>
            <InfoBox label="City">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                {row.city || "—"}
              </span>
            </InfoBox>
            <InfoBox label="Group">{row.group_name || "—"}</InfoBox>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoBox label="Status">
              <StatusBadge status={row.status} />
            </InfoBox>
            <InfoBox label="Submitted At">
              {row.created_at ? new Date(row.created_at).toLocaleString() : "—"}
            </InfoBox>
            <InfoBox label="Processed At">
              {row.processed_at ? new Date(row.processed_at).toLocaleString() : "—"}
            </InfoBox>
            <InfoBox label="Linked Pilgrim">
              {row.pilgrim_id ? (
                <a
                  className="text-indigo-700 underline"
                  href={`/pilgrims/${row.pilgrim_id}`}
                >
                  #{row.pilgrim_id}
                </a>
              ) : (
                "—"
              )}
            </InfoBox>
          </div>

          <InfoBox label="Notes">
            <div className="whitespace-pre-wrap">{row.notes || "—"}</div>
          </InfoBox>

          <InfoBox label="Passport Document">
            {row.passport_doc ? (
              <a
                href={row.passport_doc}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-indigo-700 underline"
              >
                <IdCard className="h-4 w-4" /> View / Download
              </a>
            ) : (
              "—"
            )}
          </InfoBox>

          {row.status === "pending" && (
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => onApprove(row)}
                disabled={approvingId === row.id}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-700 disabled:opacity-60"
              >
                {approvingId === row.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                {approvingId === row.id ? "Approving…" : "Approve → Create Pilgrim"}
              </button>

              <button
                onClick={() => onReject(row)}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                <XCircle className="h-4 w-4" /> Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Info Box ------------------------------ */
function InfoBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/40 bg-slate-50/60 dark:bg-neutral-900/60 p-3">
      <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-sm text-slate-900 dark:text-white">{children}</div>
    </div>
  );
}

/* ------------------------------ Status Badge -------------------------- */
function StatusBadge({ status }: { status?: string }) {
  const colorMap: Record<string, string> = {
    pending: "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
    accepted: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    rejected: "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
  };
  const cls = colorMap[status || "pending"] || "bg-slate-50 text-slate-700 ring-1 ring-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${cls}`}
    >
      {status || "pending"}
    </span>
  );
}
