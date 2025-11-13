"use client";

import { motion } from "framer-motion";

interface Column {
  key: string;
  title: string;
  render?: (row: any) => React.ReactNode;
  fmt?: (v: any, row: any) => React.ReactNode;
}

export default function DataTable({
  rows = [],
  columns = [],
}: {
  rows: any[];
  columns: Column[];
}) {
  if (!rows.length)
    return (
      <div className="py-12 text-center text-sm text-neutral-500">
        No data available for this period.
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-800 text-neutral-400 dark:text-neutral-400">
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-3 font-medium">
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/50">
          {rows.map((row, i) => (
            <motion.tr
              key={row.id || i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="hover:bg-neutral-800/30 dark:hover:bg-neutral-800/40 transition"
            >
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 text-neutral-200 dark:text-neutral-300">
                  {"render" in c
                    ? c.render!(row)
                    : c.fmt
                    ? c.fmt(row[c.key], row)
                    : row[c.key] ?? "—"}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
