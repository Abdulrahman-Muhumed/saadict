"use client";

import { useEffect, useState, useMemo } from "react";
import { Plus, Trash2, Loader2, ArrowUpDown } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
    bookingId: number;
};

export default function TravelersTable({ bookingId }: Props) {
    const [rows, setRows] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [q, setQ] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [sort, setSort] = useState({ col: "full_name", dir: "asc" });

    /* ───────────────────── Fetch Travelers ───────────────────── */
    useEffect(() => {
        let active = true;
        (async () => {
            setLoading(true);
            const [{ data: bal }, { data: names }] = await Promise.all([
                supabase.from("v_traveler_balance").select("*").eq("booking_id", bookingId),
                supabase
                    .from("booking_travelers")
                    .select("id, pilgrims(full_name, passport_number, phone)")
                    .eq("booking_id", bookingId),
            ]);

            if (!active) return;
            const mapName: Record<number, any> = {};
            (names || []).forEach((n) => (mapName[n.id] = n.pilgrims));

            const merged = (bal || []).map((t) => ({
                ...t,
                full_name: mapName[t.booking_traveler_id]?.full_name || "—",
                passport_number: mapName[t.booking_traveler_id]?.passport_number || "—",
                phone: mapName[t.booking_traveler_id]?.phone || "—",
            }));
            setRows(merged);
            setLoading(false);
        })();
        return () => {
            active = false;
        };
    }, [bookingId]);

    /* ───────────────────── Search Pilgrims ───────────────────── */
    async function searchPilgrims(term: string) {
        const qTrim = term.trim();
        if (!qTrim) return setResults([]);
        const { data, error } = await supabase
            .from("pilgrims")
            .select("id, full_name, passport_number, phone, city")
            .or(
                `full_name.ilike.%${qTrim}%,passport_number.ilike.%${qTrim}%,phone.ilike.%${qTrim}%`
            )
            .limit(15);
        if (!error) setResults(data || []);
    }

    /* ───────────────────── Add Traveler ───────────────────── */
    async function addTraveler(pilgrim: any) {
        const bId = bookingId;
        const pId = Number(pilgrim.id);
        if (!bId || !pId) return;

        // upsert booking_travelers
        const { data: bt, error: btErr } = await supabase
            .from("booking_travelers")
            .upsert({ booking_id: bId, pilgrim_id: pId }, { onConflict: "booking_id,pilgrim_id" })
            .select()
            .single();
        if (btErr) return alert(btErr.message);

        // trigger pricing snapshot
        const { error: rpcErr } = await supabase.rpc("snap_trip_prices_to_traveler2", {
            p_booking_id: bId,
            p_pilgrim_id: pId,
        });
        if (rpcErr) return alert(rpcErr.message);

        setAddOpen(false);
        await reloadTravelers();
    }

    /* ───────────────────── Remove Traveler ───────────────────── */
    async function removeTraveler(row: any) {
        if (!confirm(`Remove ${row.full_name}?`)) return;
        const { error } = await supabase
            .from("booking_travelers")
            .delete()
            .eq("booking_traveler_id", row.booking_traveler_id);
        if (error) return alert(error.message);
        await reloadTravelers();
    }

    async function reloadTravelers() {
        const { data: bal } = await supabase
            .from("v_traveler_balance")
            .select("*")
            .eq("booking_id", bookingId);
        const { data: names } = await supabase
            .from("booking_travelers")
            .select("id, pilgrims(full_name, passport_number, phone)")
            .eq("booking_id", bookingId);
        const map: Record<number, any> = {};
        (names || []).forEach((n) => (map[n.id] = n.pilgrims));
        const merged = (bal || []).map((t) => ({
            ...t,
            full_name: map[t.booking_traveler_id]?.full_name || "—",
            passport_number: map[t.booking_traveler_id]?.passport_number || "—",
            phone: map[t.booking_traveler_id]?.phone || "—",
        }));
        setRows(merged);
    }

    /* ───────────────────── Sorting ───────────────────── */
    function toggleSort(col: string) {
        setSort((s) =>
            s.col === col ? { col, dir: s.dir === "asc" ? "desc" : "asc" } : { col, dir: "asc" }
        );
    }

    const sorted = useMemo(() => {
        const arr = [...rows];
        arr.sort((a, b) => {
            const va = a[sort.col];
            const vb = b[sort.col];
            if (typeof va === "number" && typeof vb === "number")
                return sort.dir === "asc" ? va - vb : vb - va;
            return sort.dir === "asc"
                ? String(va).localeCompare(String(vb))
                : String(vb).localeCompare(String(va));
        });
        return arr;
    }, [rows, sort]);

    /* ───────────────────── UI ───────────────────── */
    return (
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b0f1a] overflow-hidden shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 px-4 py-3">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Travelers ({rows.length})
                </div>
                <button
                    onClick={() => setAddOpen(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
                >
                    <Plus className="h-4 w-4" /> Add Traveler
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                        <tr className="border-b border-slate-200 dark:border-white/10">
                            <Th onClick={() => toggleSort("full_name")} active={sort.col === "full_name"} dir={sort.dir}>
                                Traveler
                            </Th>
                            <Th>Passport</Th>
                            <Th>Phone</Th>
                           
                            <Th className="text-right">Actions</Th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                        {loading ? (
                            <tr>
                                <td colSpan={10} className="p-6 text-center text-slate-500 dark:text-slate-400">
                                    <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                                    Loading travelers...
                                </td>
                            </tr>
                        ) : sorted.length === 0 ? (
                            <tr>
                                <td colSpan={10} className="p-6 text-center text-slate-500 dark:text-slate-400">
                                    No travelers yet.
                                </td>
                            </tr>
                        ) : (
                            sorted.map((r) => (
                                <tr key={r.booking_traveler_id} className="hover:bg-slate-50/50 dark:hover:bg-white/5">
                                    <td className="px-4 py-3">{r.full_name}</td>
                                    <td className="px-4 py-3 font-mono text-xs">{r.passport_number}</td>
                                    <td className="px-4 py-3">{r.phone}</td>
                                    <td className="px-4 py-3 text-right">
                                        <button
                                            onClick={() => removeTraveler(r)}
                                            className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-2.5 py-1.5 text-xs text-white hover:bg-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" /> Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Modal */}
            {addOpen && (
                <div className="fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setAddOpen(false)}
                    />
                    <div className="absolute left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b0f1a] shadow-2xl p-6">
                        <h3 className="text-base font-semibold mb-3">Add Traveler</h3>
                        <input
                            placeholder="Search pilgrims by name, passport, or phone..."
                            value={q}
                            onChange={(e) => {
                                setQ(e.target.value);
                                searchPilgrims(e.target.value);
                            }}
                            className="w-full rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-[#0b0f1a] px-3 py-2 text-sm mb-3"
                        />
                        <div className="max-h-72 overflow-y-auto border rounded-lg">
                            {results.length === 0 ? (
                                <div className="p-3 text-sm text-slate-500 dark:text-slate-400">
                                    No results.
                                </div>
                            ) : (
                                results.map((p) => (
                                    <div
                                        key={p.id}
                                        className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-white/10"
                                    >
                                        <div>
                                            <div className="text-sm font-medium">{p.full_name}</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                                {p.passport_number} • {p.phone} • {p.city || "—"}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => addTraveler(p)}
                                            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
                                        >
                                            Add
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ───────────────────── Helpers ───────────────────── */
function Th({ children, onClick, active, dir, className = "" }: any) {
    return (
        <th
            onClick={onClick}
            className={`whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide ${onClick ? "cursor-pointer select-none" : ""
                } ${className}`}
        >
            <div className="inline-flex items-center gap-1">
                {children}
                {onClick ? (
                    <ArrowUpDown
                        className={`h-3.5 w-3.5 ${active ? "text-slate-900" : "text-slate-400"}`}
                    />
                ) : null}
                {active ? (
                    <span className="text-[10px] text-slate-500">
                        {dir === "asc" ? "▲" : "▼"}
                    </span>
                ) : null}
            </div>
        </th>
    );
}

function money(v: any) {
    const n = Number(v || 0);
    return n.toFixed(2);
}
