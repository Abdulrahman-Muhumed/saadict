"use client";

import { Loader2, Eye, CheckCircle2, XCircle, Phone, MapPin } from "lucide-react";

type Props = {
  rows: any[];
  loading: boolean;
  onView?: (row: any) => void;
  onApprove?: (row: any) => void;
  onReject?: (row: any) => void;
};

export default function UmrahRequestTable({ rows, loading, onView, onApprove, onReject }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/40 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-md shadow-lg transition-colors duration-300">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          {/* Header */}
          <thead className="bg-slate-100/70 dark:bg-neutral-800/70 text-slate-700 dark:text-slate-200 border-b border-border/30">
            <tr>
              <Th>Created</Th>
              <Th>Full Name</Th>
              <Th>Phone</Th>
              <Th>City</Th>
              <Th>Group</Th>
              <Th>Status</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-border/30 dark:divide-border/10 text-slate-900 dark:text-slate-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-slate-500 dark:text-slate-400">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500 dark:text-slate-400">
                  No requests found.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-slate-50/60 dark:hover:bg-neutral-800/60 transition-colors duration-150"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500 dark:text-slate-400">
                    {r.created_at ? new Date(r.created_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3 font-medium">{r.full_name}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      {r.phone_num || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {r.city || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">{r.group_name || "—"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onView?.(r)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-900 px-2.5 py-1.5 text-xs hover:bg-slate-50 dark:hover:bg-neutral-800 transition"
                      >
                        <Eye className="h-4 w-4" /> View
                      </button>
                      {r.status === "pending" && (
                        <>
                          <button
                            onClick={() => onApprove?.(r)}
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs text-black hover:bg-emerald-700 transition"
                          >
                            <CheckCircle2 className="h-4 w-4" /> Approve
                          </button>
                          <button
                            onClick={() => onReject?.(r)}
                            className="inline-flex items-center gap-1 rounded-lg bg-slate-700 px-2.5 py-1.5 text-xs text-white hover:bg-slate-800 transition"
                          >
                            <XCircle className="h-4 w-4" /> Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------ Header Cell ------------------------------ */
function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide ${className}`}>
      {children}
    </th>
  );
}

/* ------------------------------ Status Badge ----------------------------- */
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
