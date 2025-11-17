"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpDown, ChevronLeft, ChevronRight, Loader2, Download } from "lucide-react";

import { generateBookingPdfAndOpen } from "./BookingPdf";
import { generateBookingPdfAndOpen2 } from "./BookingPdf2";

const STATUS_COLORS: Record<string, string> = {
    pending: "bg-amber-50 text-amber-800 ring-1 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-300",
    approved: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300",
    confirmed: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300",
    cancelled: "bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800/40 dark:text-slate-300",
};

export default function BookingsTable({
    rows,
    finance,
    sort,
    toggleSort,
    totalPages,
    page,
    setPage,
    count,
    loading,
}: {
    rows: any[];
    finance: Record<number, any>;
    sort: { col: string; dir: "asc" | "desc" };
    toggleSort: (col: string) => void;
    totalPages: number;
    page: number;
    setPage: (n: number) => void;
    count: number;
    loading: boolean;
}) {

    const PAGE_SIZE = 10;

    const [loading2, setLoading2] = useState(false);
    const [loadingRow, setLoadingRow] = useState<number | null>(null);
     const [loadingRow2, setLoadingRow2] = useState<number | null>(null);

    async function onPrint2(id: number) {
        try {
            setLoadingRow2(id);
            await generateBookingPdfAndOpen2(id);
        } catch (e) {
            console.error(e);
            alert("Failed to generate PDF");
        } finally {
            setLoadingRow2(null);
        }
    }

    async function onPrint(id: number) {
        try {
            setLoadingRow(id);
            await generateBookingPdfAndOpen(id);
        } catch (e) {
            console.error(e);
            alert("Failed to generate PDF");
        } finally {
            setLoadingRow(null);
        }
    }


    return (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-white/10 dark:bg-[#0b0f1a]">
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-slate-900 dark:text-slate-100">
                    <thead className="bg-slate-50 text-slate-700 dark:bg-white/5 dark:text-slate-300">
                        <tr className="border-b border-slate-200 dark:border-white/10">
                            <Th onClick={() => toggleSort("created_at")} active={sort.col === "created_at"} dir={sort.dir}>
                                Created
                            </Th>
                            <Th onClick={() => toggleSort("name")} active={sort.col === "name"} dir={sort.dir}>
                                Name
                            </Th>
                            <Th>Trip</Th>
                            <Th onClick={() => toggleSort("status")} active={sort.col === "status"} dir={sort.dir}>
                                Status
                            </Th>
                            <Th>Pilgr</Th>
                            <Th className="text-right">Actions</Th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                        {loading ? (
                            <tr>
                                <td colSpan={9} className="p-6 text-slate-500 dark:text-slate-400 text-center">
                                    <div className="flex items-center justify-center gap-2 animate-pulse">
                                        <div className="h-4 w-4 rounded-full bg-slate-400/30 animate-spin" />
                                        Loading bookings...
                                    </div>
                                </td>
                            </tr>
                        ) : rows.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="p-8 text-center text-slate-500 dark:text-slate-400">
                                    No bookings found.
                                </td>
                            </tr>
                        ) : (
                            rows.map((r) => {
                                const f = finance[r.id] || {};
                                return (
                                    <tr
                                        key={r.id}
                                        className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors duration-150"
                                    >
                                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            {new Date(r.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3 font-medium">{r.name}</td>
                                        <td className="px-4 py-3">{r.trips?.title || "—"}</td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${STATUS_COLORS[r.status]}`}
                                            >
                                                {r.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 font-mono text-xs">{f.headcount ?? 0}</td>
                                        <td className="px-4 py-3 text-right">

                                            <button
                                                onClick={() => onPrint(r.id)}
                                                disabled={loadingRow === r.id}
                                                className={`inline-flex items-center gap-2 rounded-lg border border-slate-200 
                                                            px-3 py-1.5 text-sm font-medium transition-all
                                                            ${loadingRow === r.id
                                                        ? "bg-slate-100 dark:bg-black text-slate-500 cursor-wait"
                                                        : "hover:bg-slate-50 dark:hover:bg-white/10"} 
                                                             dark:border-white/10 dark:text-white`}
                                                title="Print booking PDF"
                                            >
                                                {loadingRow === r.id ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
                                                        Generating…
                                                    </>
                                                ) : (
                                                    <>
                                                        <Download className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                                    </>
                                                )}
                                            </button>

                                            <button
                                                onClick={() => onPrint2(r.id)}
                                                disabled={loadingRow2 === r.id}
                                                className={`inline-flex items-center ml-3 gap-2 rounded-lg border border-slate-200 
                                                            px-3 py-1.5 text-sm font-medium transition-all
                                                            ${loadingRow2 === r.id
                                                        ? "bg-slate-100 dark:bg-black text-slate-500 cursor-wait"
                                                        : "hover:bg-slate-50 dark:hover:bg-white/10"} 
                                                             dark:border-white/10 dark:text-white`}
                                                title="Print booking PDF"
                                            >
                                                {loadingRow2 === r.id ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
                                                        Generating…
                                                    </>
                                                ) : (
                                                    <>
                                                        <Download className="h-4 w-4 text-red-900 dark:text-rose-600" />
                                                    </>
                                                )}
                                            </button>

                                            <Link
                                                href={`/dashboard/bookings/${r.id}`}
                                                className="rounded-lg ml-2 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-1.5 text-xs
                                                     hover:bg-slate-50 dark:hover:bg-white/10"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5 px-4 py-3">
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                        Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, count)} of {count}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage(Math.max(1, page - 1))}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-white/10"
                        >
                            <ChevronLeft className="h-4 w-4" /> Prev
                        </button>
                        <div className="text-sm text-slate-600 dark:text-slate-300">
                            Page {page} / {totalPages}
                        </div>
                        <button
                            onClick={() => setPage(Math.min(totalPages, page + 1))}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-white/10"
                        >
                            Next <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* TH Component                                                               */
/* -------------------------------------------------------------------------- */
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
            className={`whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide ${onClick ? "cursor-pointer select-none" : ""
                } ${className}`}
        >
            <div className="inline-flex items-center gap-1">
                {children}
                {onClick && (
                    <ArrowUpDown
                        className={`h-3.5 w-3.5 ${active ? "text-slate-900 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"
                            }`}
                    />
                )}
                {active && (
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        {dir === "asc" ? "▲" : "▼"}
                    </span>
                )}
            </div>
        </th>
    );
}
