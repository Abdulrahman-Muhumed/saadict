"use client";

import { Loader2, ArrowUpDown, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";

type Props = {
    rows: any[];
    loading: boolean;
    sort: { col: string; dir: "asc" | "desc" };
    setSort: (v: any) => void;
};

export default function TripsTable({
    rows,
    loading,
    sort,
    setSort,
}: Props) {
    function toggleSort(col: string) {
        setSort((s: any) =>
            s.col === col
                ? { col, dir: s.dir === "asc" ? "desc" : "asc" }
                : { col, dir: "desc" }
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-border/40 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-md shadow-lg transition-colors duration-300">
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    {/* Table Header */}
                    <thead className="bg-slate-100/70 dark:bg-neutral-800/70 text-slate-700 dark:text-slate-200 border-b border-border/30">
                        <tr>
                            <Th
                                onClick={() => toggleSort("created_at")}
                                active={sort.col === "created_at"}
                                dir={sort.dir}
                            >
                                Created
                            </Th>
                            <Th
                                onClick={() => toggleSort("title")}
                                active={sort.col === "title"}
                                dir={sort.dir}
                            >
                                Title
                            </Th>
                            <Th
                                onClick={() => toggleSort("season")}
                                active={sort.col === "season"}
                                dir={sort.dir}
                            >
                                Season
                            </Th>
                            <Th
                                onClick={() => toggleSort("start_date")}
                                active={sort.col === "start_date"}
                                dir={sort.dir}
                            >
                                Dates
                            </Th>
                            <Th
                                onClick={() => toggleSort("status")}
                                active={sort.col === "status"}
                                dir={sort.dir}
                            >
                                Status
                            </Th>
                            <Th className="text-right">Actions</Th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-border/30 dark:divide-border/10 text-slate-900 dark:text-slate-100">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="p-6 text-center text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Loading…
                                    </div>
                                </td>
                            </tr>
                        ) : rows.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-slate-500 dark:text-slate-400">
                                    No trips found.
                                </td>
                            </tr>
                        ) : (
                            rows.map((r) => (
                                <tr
                                    key={r.id}
                                    className="hover:bg-slate-50/60 dark:hover:bg-neutral-800/60 transition-colors duration-150"
                                >
                                    <td className="whitespace-nowrap px-4 py-3 text-slate-500 dark:text-slate-400">
                                        {r.created_at ? new Date(r.created_at).toLocaleDateString() : "—"}
                                    </td>
                                    <td className="px-4 py-3 font-medium">{r.title}</td>
                                    <td className="px-4 py-3">{r.season || "—"}</td>
                                    <td className="px-4 py-3">
                                        <span className="font-mono text-xs">
                                            {r.start_date || "—"} {r.end_date ? `→ ${r.end_date}` : ""}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <StatusBadge text={r.status} />
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            {/* Manage */}
                                            <Link
                                                href={`/dashboard/trips/${r.id}`}
                                                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-1.5 text-xs hover:bg-slate-50 dark:hover:bg-neutral-800 transition"
                                            >
                                                <MoreHorizontal className="h-4 w-4" /> Manage
                                            </Link>

                                           
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

/* ------------------------------ Header Cell ------------------------------ */
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
    dir?: "asc" | "desc";
    className?: string;
}) {
    return (
        <th
            onClick={onClick}
            className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide ${onClick ? "cursor-pointer select-none" : ""
                } ${className}`}
        >
            <div className="inline-flex items-center gap-1">
                {children}
                {onClick && (
                    <ArrowUpDown
                        className={`h-3.5 w-3.5 transition-colors ${active ? "text-slate-900 dark:text-white" : "text-slate-400"
                            }`}
                    />
                )}
                {active && (
                    <span className="text-[10px] text-slate-500">
                        {dir === "asc" ? "▲" : "▼"}
                    </span>
                )}
            </div>
        </th>
    );
}

/* ------------------------------ Status Badge ----------------------------- */
function StatusBadge({ text }: { text: string }) {
    let colorClass = "bg-amber-50 text-amber-800 ring-amber-200"; // default: draft

    if (text === "active")
        colorClass = "bg-emerald-50 text-emerald-700 ring-emerald-200";
    else if (text === "archived")
        colorClass = "bg-slate-100 text-slate-700 ring-slate-200";

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ring-1 ${colorClass}`}
        >
            {text}
        </span>
    );
}

