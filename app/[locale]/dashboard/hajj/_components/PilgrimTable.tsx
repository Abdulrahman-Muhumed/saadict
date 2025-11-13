"use client";

import { Eye, Pencil, Trash2, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";

const PAGE_SIZE = 10;

export default function PilgrimTable({
  rows,
  onView,
  onEdit,
  onDelete,
}: {
  rows: any[];
  onView: (r: any) => void;
  onEdit: (r: any) => void;
  onDelete: (r: any) => void;
}) {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(rows.length / PAGE_SIZE)), [rows]);
  const visible = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return rows.slice(start, start + PAGE_SIZE);
  }, [rows, page]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-neutral-950 shadow-lg transition-colors duration-300">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-neutral-900/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Passport</th>
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold text-right">Paid</th>
              <th className="px-4 py-3 font-semibold text-right">Remaining</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {visible.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-slate-500 dark:text-slate-400"
                >
                  No pilgrims found.
                </td>
              </tr>
            ) : (
              visible.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-neutral-900/70 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-100">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                      {r.full_name}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                    {r.passport_number || "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">
                    {r.phone_number || "—"}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-right text-emerald-600 dark:text-emerald-400">
                    {Number(r.paid || 0).toLocaleString()} USD
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-right text-amber-600 dark:text-amber-400">
                    {Math.max(
                      Number(r.total || 0) - Number(r.paid || 0),
                      0
                    ).toLocaleString()}{" "}
                    USD
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center justify-end gap-2">
                      <button
                        onClick={() => onView(r)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-950 px-2.5 py-1.5 text-xs hover:bg-slate-50 dark:hover:bg-neutral-900 transition"
                      >
                        <Eye className="h-4 w-4" /> View
                      </button>
                      <button
                        onClick={() => onEdit(r)}
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs text-white hover:bg-blue-700 transition"
                      >
                        <Pencil className="h-4 w-4" /> Edit
                      </button>
                      <button
                        onClick={() => onDelete(r)}
                        className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-2.5 py-1.5 text-xs text-white hover:bg-red-700 transition"
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-neutral-900/50 px-4 py-3">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Showing {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, rows.length)} of {rows.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-950 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-900 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Page {page} / {totalPages}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-950 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-900 disabled:opacity-40"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
