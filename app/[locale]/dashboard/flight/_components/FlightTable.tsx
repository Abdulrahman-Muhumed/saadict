"use client";

import {
  PlaneTakeoff,
  PlaneLanding,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

export default function FlightTable({
  rows,
  loading,
  count,
  page,
  setPage,
  totalPages,
  onEdit,
  onDelete,
  formatDateTime,
}: {
  rows: any[];
  loading: boolean;
  count: number;
  page: number;
  setPage: (p: number) => void;
  totalPages: number;
  onEdit: (r: any) => void;
  onDelete: (r: any) => void;
  formatDateTime: (v: string) => string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-neutral-950 shadow-lg transition-colors duration-300">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          {/* Table Head */}
          <thead className="bg-slate-50 dark:bg-neutral-900/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3 font-semibold">Created</th>
              <th className="px-4 py-3 font-semibold">Airline</th>
              <th className="px-4 py-3 font-semibold">Flight No</th>
              <th className="px-4 py-3 font-semibold">Departure</th>
              <th className="px-4 py-3 font-semibold">Arrival</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-slate-500 dark:text-slate-400"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading Flights...
                  </div>
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-slate-500 dark:text-slate-400"
                >
                  No flights found.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-neutral-900/70 transition-colors"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500 dark:text-slate-400">
                    {r.created_at
                      ? new Date(r.created_at).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
                    {r.airline}
                  </td>

                  <td className="px-4 py-3 font-mono text-xs text-slate-700 dark:text-slate-400">
                    {r.flight_number}
                  </td>

                  <td className="px-4 py-3">
                    <div className="inline-flex items-center gap-2">
                      <PlaneTakeoff className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                      <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
                        {r.departure_airport} • {formatDateTime(r.departure_time)}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="inline-flex items-center gap-2">
                      <PlaneLanding className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                      <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
                        {r.arrival_airport} • {formatDateTime(r.arrival_time)}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center justify-end gap-2">
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
            Showing {(page - 1) * 10 + 1}–
            {Math.min(page * 10, count)} of {count}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-950 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-neutral-900 disabled:opacity-50 transition"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Page {page} / {totalPages}
            </div>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-950 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-neutral-900 disabled:opacity-50 transition"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
