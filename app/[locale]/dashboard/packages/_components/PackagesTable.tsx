"use client";

import { Loader2, Pencil, Trash2 } from "lucide-react";

type Props = {
  rows: any[];
  loading: boolean;
  requestEdit: (row: any) => void;
  requestDelete: (row: any) => void;
};

/* -------------------------------------------------------------------------- */
/*  Packages Table                                                            */
/* -------------------------------------------------------------------------- */
export default function PackagesTable({ rows, loading, requestEdit, requestDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/40 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-md shadow-lg transition-colors duration-300">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          {/* Table Header */}
          <thead className="bg-slate-100/70 dark:bg-neutral-800/70 text-slate-700 dark:text-slate-200 border-b border-border/30">
            <tr>
              <Th>Created</Th>
              <Th>Title</Th>
              <Th>Base Price</Th>
              <Th>Currency</Th>
              <Th>Days</Th>
              <Th>Status</Th>
              <Th>Active</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-border/30 dark:divide-border/10 text-slate-900 dark:text-slate-100">
            {loading ? (
              <tr>
                <td colSpan={9} className="p-6 text-slate-500 dark:text-slate-400">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="p-8 text-center text-slate-500 dark:text-slate-400"
                >
                  No packages found.
                </td>
              </tr>
            ) : (
              rows.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-slate-50/60 dark:hover:bg-neutral-800/60 transition-colors duration-150"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500 dark:text-slate-400">
                    {p.created_at ? new Date(p.created_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {money(p.base_price)}
                  </td>
                  <td className="px-4 py-3">{p.currency || "—"}</td>
                  <td className="px-4 py-3">{p.days ?? "—"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3">{p.is_active ? "Yes" : "No"}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => requestEdit(p)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-1.5 text-xs hover:bg-slate-50 dark:hover:bg-neutral-800 transition"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => requestDelete(p)}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-1.5 text-xs text-red-700 dark:text-red-400 hover:bg-red-500/20 transition"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
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

/* -------------------------------------------------------------------------- */
/*  Header Cell                                                               */
/* -------------------------------------------------------------------------- */
function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide ${className}`}
    >
      {children}
    </th>
  );
}

/* -------------------------------------------------------------------------- */
/*  Status Badge (inline for safety)                                          */
/* -------------------------------------------------------------------------- */
function StatusBadge({ status }: { status?: string }) {
  const styleMap: Record<string, string> = {
    draft: "bg-amber-100 text-amber-800 border-amber-200",
    published: "bg-emerald-100 text-emerald-800 border-emerald-200",
    archived: "bg-slate-200 text-slate-700 border-slate-300",
  };
  const cls =
    styleMap[status || "draft"] ||
    "bg-slate-200 text-slate-700 border-slate-300";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium capitalize ${cls}`}
    >
      {status || "draft"}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Small helper                                                              */
/* -------------------------------------------------------------------------- */
function money(v: number | null | undefined) {
  const n = Number(v ?? 0);
  return n ? n.toFixed(2) : "—";
}
