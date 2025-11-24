"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import PilgrimsTable from "./PilgrimsTable";
import Pagination from "./Pagination";
import { brand } from "@/components/config/brand";
import { Link } from "@/lib/i18n/navigation";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PAGE_SIZE = 10;
const PRIMARY = brand.colors.primary;
const ACCENT = brand.colors.accent;

export default function PilgrimsClient() {
    const [rows, setRows] = useState<any[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState("");
    const [refresh, setRefresh] = useState(0);

    const totalPages = useMemo(
        () => Math.max(1, Math.ceil(count / PAGE_SIZE)),
        [count]
    );

    // Fetch data
    useEffect(() => {
        (async () => {
            setLoading(true);
            const from = (page - 1) * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;

            let query = supabase
                .from("pilgrims")
                .select("*", { count: "exact" })
                .order("created_at", { ascending: false })
                .range(from, to);

            if (q.trim()) {
                const term = q.trim();
                query = query.or(`full_name.ilike.%${term}%,city.ilike.%${term}%`);
            }

            const { data, error, count: total } = await query;
            if (error) console.error(error);
            setRows(data || []);
            setCount(total || 0);
            setLoading(false);
        })();
    }, [page, q, refresh]);


    async function updateVisaStatus(id: string, status: "issued" | "not_issued") {
        await supabase.from("pilgrims").update({
            visa_issue_status: status,
            billed_at: status === "issued" ? new Date().toISOString() : null
        }).eq("id", id);
        
        setRefresh((x) => x + 1);
    }

    async function updatePaymentStatus(id: string, status: "paid" | "not_paid") {

        await supabase.from("pilgrims").update({
            payment_status: status,
            issued_at: status === "paid" ? new Date().toISOString() : null
        }).eq("id", id);

        setRefresh((x) => x + 1);

    }

    return (
        <div className="w-full">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden rounded-3xl border border-white/10 text-white mb-8 " style={{
                    backgroundImage: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                }}
            >
                <div className="flex flex-wrap items-center justify-between gap-3">

                    <div className="px-5 py-5 md:px-8 md:py-7">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Pilgrims</h1>
                        <p className="mt-1 text-sm text-white/80">
                            Manage your pilgrims here. You can add, edit, or remove pilgrims as needed.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            placeholder="Search name or city…"
                            className="w-64 md:w-80 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                            value={q}
                            onChange={(e) => {
                                setQ(e.target.value);
                                setPage(1);
                            }}
                        />
                        <Link
                            href="pilgrims/new"
                            className="inline-flex mr-2 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
                        >
                            <Plus className="h-4 w-4" /> Add Pilgrim
                        </Link>

                    </div>
                </div>
            </motion.div>

            {/* Table */}

            <PilgrimsTable
                rows={rows}
                loading={loading}
                onVisaChange={updateVisaStatus}
                onPaymentChange={updatePaymentStatus}
            />

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    total={count}
                    pageSize={PAGE_SIZE}
                    setPage={setPage}
                />
            )}
        </div>
    );
}



