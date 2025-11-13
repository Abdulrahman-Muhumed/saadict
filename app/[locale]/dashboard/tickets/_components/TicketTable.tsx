"use client";

import { ChevronLeft, ChevronRight, Pencil, Trash2, Eye, Plane, CheckCircle2, Circle, ArrowUpDown } from "lucide-react";
import { money, fmtDate, PAGE_SIZE } from "./TicketUtils";

export default function TicketTable({
  rows,
  sort,
  setSort,
  page,
  setPage,
  totalPages,
  count,
  onEdit,
  onDelete,
}: any) {
  function toggleSort(col: string) {
    setSort((s: any) =>
      s.col === col ? { col, dir: s.dir === "asc" ? "desc" : "asc" } : { col, dir: "desc" }
    );
    setPage(1);
  }

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-neutral-950 shadow-lg transition-colors duration-300">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-800 dark:text-slate-200">
          <thead className="bg-slate-50 dark:bg-neutral-900/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <Th onClick={() => toggleSort("created_at")} active={sort.col === "created_at"} dir={sort.dir}>
                Created
              </Th>
              <Th onClick={() => toggleSort("full_name")} active={sort.col === "full_name"} dir={sort.dir}>
                Passenger
              </Th>
              <Th>Route</Th>
              <Th onClick={() => toggleSort("price")} active={sort.col === "price"} dir={sort.dir}>
                Sell
              </Th>
              <Th onClick={() => toggleSort("paid")} active={sort.col === "paid"} dir={sort.dir}>
                Paid
              </Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500 dark:text-slate-400">
                  No tickets found.
                </td>
              </tr>
            ) : (
              rows.map((r: any) => (
                <tr
                  key={r.id}
                  className="hover:bg-slate-50 dark:hover:bg-neutral-900/60 transition-colors"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500 dark:text-slate-400">
                    {fmtDate(r.created_at)}
                  </td>

                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                    <div>{r.full_name}</div>
                    {r.pilgrim && (
                      <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                        Linked to:{" "}
                        <span className="font-medium">{r.pilgrim.full_name}</span>
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2 font-mono text-xs text-slate-700 dark:text-slate-300">
                      <Plane className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                      {r.from_airport} → {r.to_airport}
                    </span>
                  </td>

                  <td className="px-4 py-3 font-mono text-xs text-slate-800 dark:text-slate-200">
                    {money(r.price)} {r.currency}
                  </td>

                  <td className="px-4 py-3">
                    {r.paid ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-200 dark:ring-emerald-800">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-900/30 px-2.5 py-0.5 text-[11px] font-medium text-amber-700 dark:text-amber-300 ring-1 ring-amber-200 dark:ring-amber-800">
                        <Circle className="h-3.5 w-3.5" /> Unpaid
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end">
                      <div className="inline-flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-900 shadow-sm">
                        <div className="w-px bg-slate-200 dark:bg-slate-700" />
                        <button
                          onClick={() => onEdit(r)}
                          className="px-2.5 py-1.5 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-1 transition"
                          title="Edit Ticket"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <div className="w-px bg-slate-200 dark:bg-slate-700" />
                        <button
                          onClick={() => onDelete(r)}
                          className="px-2.5 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-1 transition"
                          title="Delete Ticket"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-neutral-900/80 px-4 py-3 transition-colors">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Showing {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, count)} of {count}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p: number) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-neutral-800 transition"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Page {page} / {totalPages}
            </div>
            <button
              onClick={() => setPage((p: number) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-neutral-800 transition"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );

}

function Th({ children, onClick, active, dir, className = "" }: any) {
  return (
    <th
      onClick={onClick}
      className={`whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide ${onClick ? "cursor-pointer select-none" : ""
        } ${className}`}
    >
      <div className="inline-flex items-center gap-1">
        {children}
        {onClick ? <ArrowUpDown className={`h-3.5 w-3.5 ${active ? "text-slate-900" : "text-slate-400"}`} /> : null}
        {active ? <span className="text-[10px] text-slate-500">{dir === "asc" ? "▲" : "▼"}</span> : null}
      </div>
    </th>
  );
}
