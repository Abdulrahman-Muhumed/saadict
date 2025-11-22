"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import {
    Loader2,
    ChevronLeft,
    ChevronRight,
    FileText,
    Filter,
    Search,
    ArrowUpDown,
    Plus,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
type SortDir = "asc" | "desc";

type Invoice = {
    id: string;
    created_at: string | null;
    invoice_number: string | null;
    bill_to_name: string | null;
    bill_to_passport?: string | null;
    currency?: string | null;
    total?: number | null;
    status: "issued" | "paid" | "draft" | "void" | string;
};

type Props = {
    brandPrimary: string;
    brandAccent: string;
};

/* ------------------------------------------------------------------ */
/* Supabase Client (client-side)                                      */
/* ------------------------------------------------------------------ */
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* ------------------------------------------------------------------ */
/* Constants                                                          */
/* ------------------------------------------------------------------ */
const PAGE_SIZE = 10;
const FILTER_STATUSES = ["issued", "paid"] as const;

const STATUS_STYLE: Record<string, string> = {
    issued:
        "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/30",
    paid:
        "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30",
    draft:
        "bg-amber-50 text-amber-800 ring-1 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30",
    void:
        "bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-neutral-700/40 dark:text-neutral-300 dark:ring-neutral-600/50",
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
export default function InvoicesClient({ brandPrimary, brandAccent }: Props) {
    const [rows, setRows] = useState<Invoice[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(true);  // table state
    const [err, setErr] = useState<string | null>(null);

    const [q, setQ] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "issued" | "paid">("all");
    const [sort, setSort] = useState<{ col: keyof Invoice | "created_at"; dir: SortDir }>({
        col: "created_at",
        dir: "desc",
    });

    /* -------------------------------- Fetch ---------------------------------- */
    useEffect(() => {
        let alive = true;
        (async () => {
            setLoading(true);
            setErr(null);

            const from = (page - 1) * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;

            let query = supabase
                .from("invoices")
                .select("*", { count: "exact" })
                .order(sort.col, { ascending: sort.dir === "asc" })
                .range(from, to);

            if (q.trim()) {
                const term = q.trim();
                query = query.or(
                    `invoice_number.ilike.%${term}%,bill_to_name.ilike.%${term}%,bill_to_passport.ilike.%${term}%`
                );
            }

            if (statusFilter !== "all") {
                query = query.eq("status", statusFilter);
            }

            const { data, error, count: total } = await query;

            if (!alive) return;

            if (error) {
                setErr(error.message);
                setRows([]);
                setCount(0);
            } else {
                setRows((data as Invoice[]) || []);
                setCount(total || 0);
            }

            setLoading(false);
        })();

        return () => {
            alive = false;
        };
    }, [page, sort, q, statusFilter]);

    const totalPages = useMemo(
        () => Math.max(1, Math.ceil(count / PAGE_SIZE)),
        [count]
    );

    function toggleSort(col: keyof Invoice | "created_at") {
        setSort((s) =>
            s.col === col ? { col, dir: s.dir === "asc" ? "desc" : "asc" } : { col, dir: "desc" }
        );
        setPage(1);
    }

    /* ------------------------------ Render ----------------------------------- */
    return (
        <div className="relative">

            {/* Header */}
            <div
                className="overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 text-white shadow-xl"
                style={{ backgroundImage: `linear-gradient(135deg, ${brandPrimary}, ${brandAccent})` }}
            >
                <div className="p-5 md:p-7 lg:p-8">
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Invoices</h1>
                            <p className="mt-1 text-sm text-white/80">
                                Create, search and manage invoices with filters and sorting.
                            </p>
                        </div>
                        <Link
                            href="/dashboard/invoices/new"
                            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-white/90"
                        >
                            <Plus className="h-4 w-4" /> New Invoice
                        </Link>
                    </div>

                    {/* Search + Filter */}
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                            <input
                                placeholder="Search number, name, passport…"
                                className="w-72 rounded-lg border border-white/15 bg-white/10 pl-8 pr-3 py-2 text-sm text-white placeholder:text-white/70 outline-none focus:bg-white/15"
                                value={q}
                                onChange={(e) => {
                                    setQ(e.target.value);
                                    setPage(1);
                                }}
                            />
                        </div>

                        <div className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-1 py-1">
                            <span className="inline-flex items-center gap-1 px-2 text-xs text-white/80">
                                <Filter className="h-3.5 w-3.5" /> Status
                            </span>
                            <select
                                className="rounded-md bg-transparent px-2 py-1 text-xs text-white outline-none"
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value as any);
                                    setPage(1);
                                }}
                            >
                                <option className="text-slate-900" value="all">
                                    All
                                </option>
                                {FILTER_STATUSES.map((s) => (
                                    <option key={s} className="text-slate-900" value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {err ? (
                        <div className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-100">
                            {err}
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl mt-5 border border-slate-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600 dark:bg-neutral-800 dark:text-neutral-300">
                            <tr className="border-b border-slate-200 dark:border-neutral-800">
                                <Th onClick={() => toggleSort("created_at")} active={sort.col === "created_at"} dir={sort.dir}>
                                    Created
                                </Th>
                                <Th onClick={() => toggleSort("invoice_number")} active={sort.col === "invoice_number"} dir={sort.dir}>
                                    Number
                                </Th>
                                <Th onClick={() => toggleSort("bill_to_name")} active={sort.col === "bill_to_name"} dir={sort.dir}>
                                    Bill To
                                </Th>
                                <Th onClick={() => toggleSort("status")} active={sort.col === "status"} dir={sort.dir}>
                                    Status
                                </Th>
                                
                                <Th className="text-right">Actions</Th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-200 dark:divide-neutral-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="p-6 text-slate-500 dark:text-neutral-400">
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" /> loading...
                                        </div>
                                    </td>
                                </tr>
                            ) : rows.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500 dark:text-neutral-400">
                                        No invoices found.
                                    </td>
                                </tr>
                            ) : (
                                rows.map((r) => {
                                    const badgeClass =
                                        STATUS_STYLE[r.status] ||
                                        "bg-slate-50 text-slate-700 ring-1 ring-slate-200 dark:bg-neutral-800 dark:text-neutral-300 dark:ring-neutral-700";

                                    return (
                                        <tr key={r.id} className="hover:bg-slate-50/60 dark:hover:bg-neutral-800/40">
                                            <td className="px-4 py-3 text-slate-500 dark:text-neutral-400">
                                                {r.created_at ? new Date(r.created_at).toLocaleDateString() : "—"}
                                            </td>

                                            <td className="px-4 py-3 font-mono text-xs text-slate-700 dark:text-neutral-200">
                                                {r.invoice_number ?? "—"}
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="font-medium text-slate-900 dark:text-neutral-100">
                                                    {r.bill_to_name || "—"}
                                                </div>
                                            </td>

                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${badgeClass}`}
                                                >
                                                    {r.status}
                                                </span>
                                            </td>


                                            <td className="px-4 py-3 text-right">
                                                <Link
                                                    href={`/dashboard/invoices/${r.id}`}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs hover:bg-slate-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition"
                                                >
                                                    <FileText className="h-4 w-4" /> Open
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
                        <div className="text-xs">
                            Showing {(page - 1) * PAGE_SIZE + 1}–
                            {Math.min(page * PAGE_SIZE, count)} of {count}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page <= 1}
                                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                            >
                                <ChevronLeft className="h-4 w-4" /> Prev
                            </button>
                            <div className="text-sm">
                                Page {page} / {totalPages}
                            </div>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages}
                                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                            >
                                Next <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Table Header Cell                                                  */
/* ------------------------------------------------------------------ */
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
    dir?: SortDir;
    className?: string;
}) {
    return (
        <th
            onClick={onClick}
            className={`whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide ${onClick ? "cursor-pointer select-none" : ""
                } ${className}`}
        >
            <div className="inline-flex items-center gap-1">
                {children}
                {onClick ? (
                    <ArrowUpDown className={`h-3.5 w-3.5 ${active ? "text-slate-900 dark:text-neutral-100" : "text-slate-400 dark:text-neutral-500"}`} />
                ) : null}
                {active ? (
                    <span className="text-[10px] text-slate-500 dark:text-neutral-400">
                        {dir === "asc" ? "▲" : "▼"}
                    </span>
                ) : null}
            </div>
        </th>
    );
}
