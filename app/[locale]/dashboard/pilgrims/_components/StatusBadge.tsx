"use client";

import { BadgeCheck, AlertCircle } from "lucide-react";

export default function StatusBadge({
  ok,
  text,
}: {
  ok: boolean;
  text: string;
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium 
        border shadow-sm transition-all duration-200
        ${
          ok
            ? // ---- OK STYLE ----
              "bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 dark:bg-emerald-500/20 dark:border-emerald-500/40"
            : // ---- NOT OK STYLE ----
              "bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300 dark:bg-amber-500/20 dark:border-amber-500/40"
        }
      `}
    >
      {ok ? (
        <BadgeCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" />
      ) : (
        <AlertCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
      )}
      {text}
    </span>
  );
}
