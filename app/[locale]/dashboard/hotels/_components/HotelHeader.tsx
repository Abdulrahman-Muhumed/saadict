"use client";

import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { brand } from "@/components/config/brand";

export default function HotelHeader({
  q,
  setQ,
  onAdd,
}: {
  q: string;
  setQ: (v: string) => void;
  onAdd: () => void;
}) {
  const headerA = brand.colors.primary;
  const headerB = brand.colors.accent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 rounded-2xl border border-white/10 bg-gradient-to-br text-white shadow-xl"
      style={{
        backgroundImage: `linear-gradient(135deg, ${headerA}, ${headerB})`,
      }}
    >
      {/* Top Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Hotels
          </h1>
          <p className="mt-1 text-xs text-white/70">
            Manage hotels, view details, and maintain capacity records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition"
          >
            <Plus className="h-4 w-4" /> Add Hotel
          </button>
        </div>
      </div>

      {/* Search Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 pb-5">
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, city, or address…"
            className="w-full rounded-xl border border-white/20 bg-white/10 pl-9 pr-3 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
          />
        </div>
      </div>
    </motion.div>
  );
}
