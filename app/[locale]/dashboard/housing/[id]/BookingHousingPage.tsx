"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { brand } from "@/components/config/brand";
import { Users } from "lucide-react";

export default function BookingHousingPage({
  booking,
  travelers,
  tripHotels,
}: {
  booking: any;
  travelers: any[];
  tripHotels: any[];
}) {
  const [q, setQ] = useState("");

  const headerA = brand.colors.primary;
  const headerB = brand.colors.accent;

  const filtered = travelers.filter((t) =>
    t.pilgrims?.full_name?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* ---------------------- HEADER ---------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-white/10 text-white shadow-xl"
        style={{
          backgroundImage: `linear-gradient(135deg, ${headerA}, ${headerB})`,
        }}
      >
        <div className="px-6 py-6">
          <h1 className="text-3xl font-bold">
            Housing – {booking.name || booking.code}
          </h1>
          <p className="text-xs text-white/70 mt-1">
            Assign hotel rooms to pilgrims in this booking.
          </p>
        </div>

        {/* Search Travelers */}
        <div className="px-6 pb-6">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search pilgrim name…"
            className="w-full sm:w-96 rounded-xl border border-white/20 bg-white/10 pl-4 pr-3 py-2 
                     text-sm text-white placeholder:text-white/60
                     focus:ring-2 focus:ring-white/30 focus:outline-none transition"
          />
        </div>
      </motion.div>

      {/* ---------------------- CONTENT ---------------------- */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* ------------------- PILGRIMS TABLE ------------------- */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 
                        bg-white dark:bg-neutral-950 shadow-lg overflow-hidden">
          <div className="border-b border-slate-200 dark:border-slate-800 p-4 font-semibold text-sm">
            Pilgrims ({travelers.length})
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-neutral-900/80 
                               border-b border-slate-200 dark:border-slate-800 
                               text-slate-600 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Passport</th>
                  <th className="px-4 py-3">Nationality</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-6 text-center text-slate-500">
                      No pilgrims found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/70 dark:hover:bg-neutral-900/70 transition">
                      <td className="px-4 py-3 font-medium">{t.pilgrims.full_name}</td>
                      <td className="px-4 py-3">{t.pilgrims.passport_number}</td>
                      <td className="px-4 py-3">{t.pilgrims.nationality}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ------------------ HOTELS CARDS ------------------ */}
        <div className="space-y-4">
          {tripHotels.length === 0 ? (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 text-slate-500">
              No hotels found for this trip.
            </div>
          ) : (
            tripHotels.map((h) => (
              <div
                key={h.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 
                           bg-white dark:bg-neutral-950 shadow p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {h.hotel.name} – {h.city}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {h.nights} nights
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      window.location.assign(`/dashboard/housing/${booking.id}/${h.id}`)
                    }
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-xs text-white hover:bg-indigo-700 transition"
                  >
                    Manage Rooms
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
