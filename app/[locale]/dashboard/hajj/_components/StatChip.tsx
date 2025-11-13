"use client";

import { motion } from "framer-motion";

export default function StatChip({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-neutral-900/70 backdrop-blur-md px-4 py-3 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold text-slate-800 dark:text-slate-100">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
    </motion.div>
  );
}
