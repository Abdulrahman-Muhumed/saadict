"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { PAID_FILTERS } from "./TicketUtils";
import { brand } from "@/components/config/brand";

const headerA = brand.colors.primary ;
const headerB = brand.colors.accent ;

export default function TicketHeader({
  q,
  setQ,
  paidFilter,
  setPaidFilter,
  onAdd,
}: {
  q: string;
  setQ: (v: string) => void;
  paidFilter: string;
  setPaidFilter: (v: string) => void;
  onAdd: () => void;
}) {
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Tickets
        </h1>

        {/* Right Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter Pills */}
          <div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-1 py-1 backdrop-blur-sm">
            {PAID_FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setPaidFilter(f.key)}
                className={`rounded-full px-3 py-1.5 text-sm transition-all ${
                  paidFilter === f.key
                    ? "bg-white/25 text-white font-medium shadow-inner"
                    : "text-white/80 hover:bg-white/15"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Add Ticket Button */}
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition"
          >
            <Plus className="h-4 w-4" /> Add Ticket
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <input
          placeholder="Search name, passport, reference, airports…"
          className="w-64 md:w-80 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
    </motion.div>
  );
}
