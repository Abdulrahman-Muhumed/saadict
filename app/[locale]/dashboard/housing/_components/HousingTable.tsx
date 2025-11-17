"use client";

import { useRouter } from "next/navigation";
import { Users } from "lucide-react";

export default function HousingTable({ rows }: { rows: any[] }) {
  const router = useRouter();

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 
                    bg-white dark:bg-neutral-950 shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-neutral-900/80 
                           border-b border-slate-200 dark:border-slate-800 
                           text-slate-600 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold uppercase whitespace-nowrap">
                Booking
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase whitespace-nowrap">
                Code
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase whitespace-nowrap">
                Pilgrims
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase whitespace-nowrap text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-slate-500 dark:text-slate-400"
                >
                  No bookings found.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-neutral-900/70 
                             transition cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium">{r.name}</td>
                  <td className="px-4 py-3">{r.code}</td>
                  <td className="px-4 py-3 flex items-center gap-1">
                    <Users className="h-4 w-4" /> {r.pilgrims_count}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs text-white 
                                 hover:bg-indigo-700 transition"
                      onClick={() => router.push(`/dashboard/housing/${r.id}`)}
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
