"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Inbox, Search, ChevronDown, Printer } from "lucide-react";
import { brand } from "@/components/config/brand";
export default function HajjHeader({
  q,
  setQ,
  pendingCount,
  onAdd,
  onRequests,
  onPrintWithMoney,
  onPrintWithoutMoney,
}: {
  q: string;
  setQ: (v: string) => void;
  pendingCount: number;
  onAdd: () => void;
  onRequests: () => void;
  onPrintWithMoney: () => void;
  onPrintWithoutMoney: () => void;
}) {

  const headerA = brand.colors.primary;
  const headerB = brand.colors.accent;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close dropdown on outside click
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] px-6 py-5 text-white shadow-xl"
      style={{
        backgroundImage: `linear-gradient(135deg, ${headerA}, ${headerB})`,
      }}
    >
      {/* Top row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Hajj 2026
          </h1>
          <p className="mt-1 text-xs text-white/70">
            Manage pilgrims, review requests, and keep documents organized.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Requests Button */}
          <button
            onClick={onRequests}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
          >
            <Inbox className="h-4 w-4" /> Requests
            {!!pendingCount && (
              <span className="ml-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-slate-900">
                {pendingCount}
              </span>
            )}
          </button>

          {/* Add Pilgrim dropdown */}
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition"
            >
              <Plus className="h-4 w-4" /> Add Pilgrim
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {open && (
              <div className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-lg border border-slate-200 bg-white text-slate-700 shadow-xl">
                <button
                  onClick={() => {
                    onAdd();
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50"
                >
                  <Plus className="h-4 w-4" /> Add Pilgrim
                </button>
                <div className="my-1 h-px bg-slate-100" />
                <button
                  onClick={() => {
                    onPrintWithMoney();
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50"
                >
                  <Printer className="h-4 w-4" /> Print with money
                </button>
                <button
                  onClick={() => {
                    onPrintWithoutMoney();
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50"
                >
                  <Printer className="h-4 w-4" /> Print without money
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, passport, phone…"
            className="w-full rounded-xl border border-white/20 bg-white/10 pl-9 pr-3 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
          />
        </div>
      </div>
    </motion.div>
  );
}
