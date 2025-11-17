"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { brand } from "@/components/config/brand";

export default function HousingHeader({
  q,
  setQ,
}: {
  q: string;
  setQ: (v: string) => void;
}) {
  const headerA = brand.colors.primary;
  const headerB = brand.colors.accent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 text-white shadow-xl"
      style={{
        backgroundImage: `linear-gradient(135deg, ${headerA}, ${headerB})`,
      }}
    >
      {/* Top */}
      <div className="flex items-center justify-between px-6 py-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Housing</h1>
          <p className="text-xs text-white/70 mt-1">
            Manage room assignments for active bookings.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 pb-6">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search booking name or code…"
            className="w-full rounded-xl border border-white/20 bg-white/10 pl-10 pr-3 py-2 
                       text-sm text-white placeholder:text-white/60
                       focus:ring-2 focus:ring-white/30 focus:outline-none transition"
          />
        </div>
      </div>
    </motion.div>
  );
}
