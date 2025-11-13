// app/(dashboard)/bookings/page-content.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import BookingsTable from "./_components/BookingsTable";
import { brand } from "@/components/config/brand";
import {
    Plus,
} from "lucide-react";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

import { Printer } from "lucide-react";
import { generateBookingPdfAndOpen } from "./_components/BookingPdf";


const PAGE_SIZE = 10;

type BookingRow = {
    id: number;
    name: string;
    created_at: string;
    status: string;
    trip_id: number;
    trips?: { title?: string }[]; // Supabase returns related rows as an array
};

type FinanceRow = {
    booking_id: number;
    headcount: number;
    due: number;
    paid: number;
    balance: number;
};

export default function PageContent() {
    const [rows, setRows] = useState<BookingRow[]>([]);
    const [finance, setFinance] = useState<Record<number, FinanceRow>>({});
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [q, setQ] = useState("");
    const [sort, setSort] = useState({ col: "created_at", dir: "desc" as "asc" | "desc" });
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        let active = true;
        (async () => {
            setLoading(true);
            setErrorMsg(null);

            const from = (page - 1) * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;

            let query = supabase
                .from("bookings")
                .select("id,name,created_at,status,trip_id,trips(title)", { count: "exact" })
                .order(sort.col, { ascending: sort.dir === "asc" })
                .range(from, to);

            if (q.trim()) query = query.ilike("name", `%${q.trim()}%`);

            const { data, error, count: total } = await query;
            if (!active) return;
            if (error) {
                setErrorMsg(error.message);
                setRows([]);
                setCount(0);
                setLoading(false);
                return;
            }

            setRows(data || []);
            setCount(total || 0);

            const ids = (data || []).map((b) => b.id);
            if (ids.length) {
                const { data: fin } = await supabase
                    .from("v_booking_financials")
                    .select("*")
                    .in("booking_id", ids);
                const map: Record<number, FinanceRow> = {};
                (fin || []).forEach((f) => (map[f.booking_id] = f));
                setFinance(map);
            } else {
                setFinance({});
            }

            setLoading(false);
        })();
        return () => {
            active = false;
        };
    }, [page, sort, q]);

    const totalPages = useMemo(() => Math.max(1, Math.ceil(count / PAGE_SIZE)), [count]);

    const toggleSort = (col: string) => {
        setSort((s) => (s.col === col ? { col, dir: s.dir === "asc" ? "desc" : "asc" } : { col, dir: "desc" }));
        setPage(1);
    };


    return (
        <div>
            {/* Header */}
            <div
                className="overflow-hidden rounded-3xl border border-white/10 text-white mb-6"
                style={{
                    backgroundImage: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.accent})`,
                }}
            >
                <div className="px-5 py-5 md:px-8 md:py-7">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Bookings</h1>
                            <p className="mt-1 text-sm text-white/80">
                                Groups linked to trips. Totals show live due / paid / balance.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <input
                                placeholder="Search name or trip..."
                                className="w-64 md:w-80 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                                value={q}
                                onChange={(e) => {
                                    setQ(e.target.value);
                                    setPage(1);
                                }}
                            />
                            <Link
                                href="/dashboard/bookings/new"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
                            >
                                <Plus className="h-4 w-4" /> New Booking
                            </Link>
                        </div>
                    </div>
                    {errorMsg && (
                        <div className="mt-3 rounded-lg border border-red-300/20 bg-red-400/10 px-3 py-2 text-sm text-red-100">
                            {errorMsg}
                        </div>
                    )}
                </div>
            </div>

            {/* Table */}
            <BookingsTable
                rows={rows}
                finance={finance}
                sort={sort}
                toggleSort={toggleSort}
                totalPages={totalPages}
                page={page}
                setPage={setPage}
                count={count}
                loading={loading}
            />

        </div>
    );
}
