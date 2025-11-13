"use client";

import { Pencil, Trash2, ArrowUpDown, Star } from "lucide-react";

export default function HotelTable({
  rows,
  loading,
  sort,
  toggleSort,
  onEdit,
  onDelete,
}: {
  rows: any[];
  loading: boolean;
  sort: { col: string; dir: string };
  toggleSort: (col: string) => void;
  onEdit: (r: any) => void;
  onDelete: (r: any) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-neutral-950 shadow-lg transition-colors duration-300">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-neutral-900/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
            <tr>
              <Th
                onClick={() => toggleSort("created_at")}
                active={sort.col === "created_at"}
                dir={sort.dir}
              >
                Created
              </Th>
              <Th
                onClick={() => toggleSort("name")}
                active={sort.col === "name"}
                dir={sort.dir}
              >
                Name
              </Th>
              <Th
                onClick={() => toggleSort("city")}
                active={sort.col === "city"}
                dir={sort.dir}
              >
                City
              </Th>
              <Th
                onClick={() => toggleSort("capacity")}
                active={sort.col === "capacity"}
                dir={sort.dir}
              >
                Capacity
              </Th>
              <Th
                onClick={() => toggleSort("stars")}
                active={sort.col === "stars"}
                dir={sort.dir}
              >
                Stars
              </Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-slate-500 dark:text-slate-400"
                >
                  Loading hotels…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-slate-500 dark:text-slate-400"
                >
                  No hotels found.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-neutral-900/70 transition-colors"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500 dark:text-slate-400">
                    {r.created_at
                      ? new Date(r.created_at).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
                    {r.name}
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                    {r.city}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-700 dark:text-slate-300">
                    {r.capacity ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Stars value={r.stars} />
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(r)}
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs text-white hover:bg-blue-700 transition"
                      >
                        <Pencil className="h-4 w-4" /> Edit
                      </button>
                      <button
                        onClick={() => onDelete(r)}
                        className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-2.5 py-1.5 text-xs text-white hover:bg-red-700 transition"
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    </div>
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

/* -------------------------- Subcomponent: Th -------------------------- */
function Th({
  children,
  onClick,
  active,
  dir,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  dir?: string;
  className?: string;
}) {
  return (
    <th
      onClick={onClick}
      className={`whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide ${
        onClick ? "cursor-pointer select-none" : ""
      } ${className}`}
    >
      <div className="inline-flex items-center gap-1">
        {children}
        {onClick ? (
          <ArrowUpDown
            className={`h-3.5 w-3.5 ${
              active ? "text-slate-900 dark:text-slate-100" : "text-slate-400"
            }`}
          />
        ) : null}
        {active ? (
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            {dir === "asc" ? "▲" : "▼"}
          </span>
        ) : null}
      </div>
    </th>
  );
}

function Stars({ value }: { value?: number | null }) {
  const v = Number(value || 0);

  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < v
              ? "fill-amber-400 text-amber-400"
              : "text-slate-300 dark:text-slate-700"
          } transition-colors`}
        />
      ))}
    </span>
  );
}
