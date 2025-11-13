"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

export default function RequestsList({
  rows = [],
  onApprove,
  onReject,
}: {
  rows: any[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  if (!rows?.length)
    return (
      <div className="flex flex-col items-center justify-center h-40 text-slate-500 dark:text-slate-400">
        <Clock className="h-5 w-5 mb-1" />
        <p className="text-sm">No pending requests.</p>
      </div>
    );

  return (
    <div className="space-y-3">
      {rows.map((r, i) => (
        <motion.div
          key={r.id || i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-neutral-950/70 backdrop-blur-md p-4 shadow-sm"
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {r.full_name}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {r.passport_number || "—"} • {r.phone_number || "—"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onApprove(r.id)}
                className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs text-white hover:bg-emerald-700"
              >
                <CheckCircle2 className="h-4 w-4" /> Approve
              </button>
              <button
                onClick={() => onReject(r.id)}
                className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-xs text-white hover:bg-red-700"
              >
                <XCircle className="h-4 w-4" /> Reject
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
