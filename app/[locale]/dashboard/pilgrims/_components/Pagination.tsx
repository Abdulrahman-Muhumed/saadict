"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  setPage,
}: {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  setPage: (p: number) => void;
}) {
  return (
    <div className="mt-4 flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 rounded-b-2xl">
      <div className="text-xs text-slate-500">
        Showing {(page - 1) * pageSize + 1}–
        {Math.min(page * pageSize, total)} of {total}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" /> Prev
        </button>
        <div className="text-sm text-slate-600">
          Page {page} / {totalPages}
        </div>
        <button
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
