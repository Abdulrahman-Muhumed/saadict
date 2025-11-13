"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { ChevronLeft, ChevronRight, Filter, Plus } from "lucide-react";
import { brand } from "@/components/config/brand";
import TripsTable from "./_components/TripsTable";
import TripFormDrawer from "./_components/TripFormDrawer";
import ConfirmModal from "../packages/_components/ConfirmModal";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PAGE_SIZE = 10;
const TRIP_STATUSES = ["draft", "active", "archived"];

export default function PageContent() {
    const [rows, setRows] = useState<any[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState<{ col: string; dir: "asc" | "desc" }>({ col: "created_at", dir: "desc" });
    const [q, setQ] = useState("");
    const [qDebounced, setQDebounced] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingPage, setLoadingPage] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    // Drawer + confirm
    const [drawer, setDrawer] = useState({ open: false, row: null });
    const [confirm, setConfirm] = useState({ open: false, row: null });

    // debounce search
    useEffect(() => {
        const t = setTimeout(() => setQDebounced(q.trim()), 280);
        return () => clearTimeout(t);
    }, [q]);

    // fetch data
    useEffect(() => {
        let alive = true;
        (async () => {
            setLoading(true);
            setErr(null);
            const from = (page - 1) * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;

            let query = supabase
                .from("trips")
                .select("*", { count: "exact" })
                .order(sort.col, { ascending: sort.dir === "asc" })
                .range(from, to);

            if (qDebounced) {
                const term = qDebounced.replaceAll(",", " ");
                query = query.or(
                    `title.ilike.%${term}%,season.ilike.%${term}%`
                );
            }

            const { data, error, count: total } = await query;
            if (!alive) return;
            setLoading(false);
            setLoadingPage(false);

            if (error) {
                setErr(error.message);
                setRows([]);
                setCount(0);
                return;
            }
            setRows(data || []);
            setCount(total || 0);
        })();

        return () => {
            alive = false;
        };
    }, [page, sort, qDebounced]);

    const totalPages = useMemo(
        () => Math.max(1, Math.ceil(count / PAGE_SIZE)),
        [count]
    );

    const headerA = brand.colors.primary;
    const headerB = brand.colors.accent;

    return (
        <>
            {/* Header */}
            <div
                className="overflow-hidden rounded-2xl border border-white/10 text-white shadow-xl"
                style={{
                    backgroundImage: `linear-gradient(135deg, ${headerA}, ${headerB})`,
                }}
            >
                <div className="px-5 py-6 md:px-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                                Trips
                            </h1>
                            <p className="mt-1 text-sm text-white/80">
                                Manage and schedule upcoming trips, seasons, and statuses.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <input
                                placeholder="Search title, season…"
                                className="w-64 md:w-72 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 outline-none focus:bg-white/15"
                                value={q}
                                onChange={(e) => {
                                    setQ(e.target.value);
                                    setPage(1);
                                }}
                            />
                            <button
                                onClick={() => setDrawer({ open: true, row: null })}
                                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
                            >
                                <Plus className="h-4 w-4" /> Add Trip
                            </button>
                        </div>
                    </div>

                    {err && (
                        <div className="mt-3 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-100">
                            {err}
                        </div>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="mt-6">
                <TripsTable
                    rows={rows}
                    loading={loading}
                    sort={sort}
                    setSort={setSort}
                />
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <div>
                        Showing {(page - 1) * PAGE_SIZE + 1}–
                        {Math.min(page * PAGE_SIZE, count)} of {count}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-neutral-800"
                        >
                            <ChevronLeft className="h-4 w-4" /> Prev
                        </button>
                        <span className="text-sm">
                            Page {page} / {totalPages}
                        </span>
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-neutral-800"
                        >
                            Next <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Modals */}
            {drawer.open && (
                <TripFormDrawer
                    open={drawer.open}
                    row={drawer.row}
                    onClose={() => setDrawer({ open: false, row: null })}
                    onSaved={() => setPage(1)}
                />
            )}

            {confirm.open && confirm.row && (
                <ConfirmModal
                    open={true}
                    title="Delete Trip?"
                    body={`This will permanently remove This trip.`}
                    onCancel={() => setConfirm({ open: false, row: null })}
                    onConfirm={async () => {
                        
                    }}
                />
            )}

        </>
    );
}

