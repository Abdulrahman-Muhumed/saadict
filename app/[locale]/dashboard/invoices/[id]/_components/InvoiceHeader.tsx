"use client";

import { Printer, Pencil, Trash2 } from "lucide-react";

export default function InvoiceHeader({ invoice, onEdit, onDelete, onPrint }: any) {
  return (
    <div
      className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#241c72] to-[#0b1020] text-white shadow-xl"
    >
      <div className="p-6 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Invoice #{invoice.invoice_number}</h1>
          <p className="text-white/70 text-sm mt-1">Status: {invoice.status}</p>
        </div>

        <div className="flex gap-2 mt-3 sm:mt-0">
          <button
            onClick={onDelete}
            className="flex items-center gap-2 bg-red-600 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-slate-700"
          >
            <Pencil className="h-4 w-4" /> Edit
          </button>
          <button
            onClick={onPrint}
            className="flex items-center gap-2 bg-white text-slate-900 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-white/90"
          >
            <Printer className="h-4 w-4" /> Print / PDF
          </button>
        </div>
      </div>
    </div>
  );
}
