"use client";

import { BadgeCheck } from "lucide-react";

export default function StatusBadge({
  ok,
  text,
}: {
  ok: boolean;
  text: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
        ok
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
          : "bg-slate-100 text-slate-700 ring-1 ring-slate-200"
      }`}
    >
      <BadgeCheck className="h-3.5 w-3.5" />
      {text}
    </span>
  );
}
