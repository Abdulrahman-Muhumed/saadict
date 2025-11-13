"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import ConfirmDialog from "../hajj/_components/ConfirmDialog";
import FlightForm from "./_components/FlightForm";
import { brand } from "@/components/config/brand";
import FlightTable from "./_components/FlightTable";

import {
    Plus,
    Pencil,
    Trash2,
    Loader2,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    PlaneTakeoff,
    PlaneLanding,
} from "lucide-react";

/* ------------------------------- Supabase -------------------------------- */
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* --------------------------------- UI ------------------------------------ */
const PAGE_SIZE = 10;

/* ------------------------------- Page ------------------------------------ */
export default function FlightsPageContent() {
    const [rows, setRows] = useState<any[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [saving, setSaving] = useState(false);
    const [confirm, setConfirm] = useState({ open: false, id: null, label: "" });

    const [sort, setSort] = useState({ col: "created_at", dir: "desc" });
    const [q, setQ] = useState("");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const empty = {
        airline: "",
        flight_number: "",
        flight_number2: "",
        departure_airport: "",
        departure_time: "",
        arrival_airport: "",
        arrival_time: "",
    };
    const [form, setForm] = useState(empty);

    /* ------------------------------- Load Data ------------------------------ */
    useEffect(() => {
        let active = true;
        (async () => {
            setLoading(true);
            setErrorMsg(null);

            const from = (page - 1) * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;

            let query = supabase
                .from("flights")
                .select("*", { count: "exact" })
                .order(sort.col, { ascending: sort.dir === "asc" })
                .range(from, to);

            if (q.trim()) {
                const term = q.trim();
                query = query.or(
                    `airline.ilike.%${term}%,flight_number.ilike.%${term}%,departure_airport.ilike.%${term}%,arrival_airport.ilike.%${term}%`
                );
            }

            const { data, error, count: total } = await query;
            if (!active) return;
            setLoading(false);

            if (error) {
                console.error(error);
                setErrorMsg(error.message);
                return;
            }

            setRows(data || []);
            setCount(total || 0);
        })();

        return () => {
            active = false;
        };
    }, [page, sort, q]);

    const totalPages = useMemo(
        () => Math.max(1, Math.ceil(count / PAGE_SIZE)),
        [count]
    );

    /* ------------------------------- Actions ------------------------------- */
    function openNew() {
        setEditing(null);
        setForm(empty);
        setOpen(true);
        setErrorMsg(null);
    }

    function openEdit(row: any) {
        setEditing(row);
        setForm({
            airline: row.airline ?? "",
            flight_number: row.flight_number ?? "",
            flight_number2: row.flight_number2 ?? "",
            departure_airport: row.departure_airport ?? "",
            departure_time: toLocalInputValue(row.departure_time),
            arrival_airport: row.arrival_airport ?? "",
            arrival_time: toLocalInputValue(row.arrival_time),
        });
        setOpen(true);
        setErrorMsg(null);
    }

    async function save(data: any) {
        setSaving(true);
        setErrorMsg(null);

        // Basic validation
        if (data.departure_time && data.arrival_time) {
            const d = new Date(data.departure_time);
            const a = new Date(data.arrival_time);
            if (!(a > d)) {
                setSaving(false);
                setErrorMsg("Arrival time must be after departure time.");
                return;
            }
        }

        const payload = {
            airline: titleCase(data.airline.trim()),
            flight_number: data.flight_number.trim().toUpperCase(),
            flight_number2: data.flight_number2.trim().toUpperCase() || null,
            departure_airport: data.departure_airport.trim().toUpperCase(),
            departure_time: data.departure_time
                ? new Date(data.departure_time).toISOString()
                : null,
            arrival_airport: data.arrival_airport.trim().toUpperCase(),
            arrival_time: data.arrival_time
                ? new Date(data.arrival_time).toISOString()
                : null,
        };

        let res;
        if (editing) {
            res = await supabase
                .from("flights")
                .update(payload)
                .eq("id", editing.id)
                .select()
                .single();
        } else {
            res = await supabase
                .from("flights")
                .insert([payload])
                .select()
                .single();
        }

        setSaving(false);
        if (res.error) {
            const msg =
                res.error.code === "23505"
                    ? "Duplicate flight (airline + flight number + departure time) already exists."
                    : res.error.message;
            setErrorMsg(msg);
            return;
        }

        setOpen(false);
        setPage(1);
    }

    function askDelete(row: any) {
        setConfirm({
            open: true,
            id: row.id,
            label: `${row.airline} ${row.flight_number} (${formatDateTime(
                row.departure_time
            )})`,
        });
    }

    async function confirmDelete() {
        if (!confirm.id) return;
        const { error } = await supabase
            .from("flights")
            .delete()
            .eq("id", confirm.id);
        if (error) {
            setErrorMsg(error.message);
            return;
        }
        setRows((r) => r.filter((x) => x.id !== confirm.id));
        setConfirm({ open: false, id: null, label: "" });
    }

    const toggleSort = (col: string) => {
        setSort((s) =>
            s.col === col
                ? { col, dir: s.dir === "asc" ? "desc" : "asc" }
                : { col, dir: "desc" }
        );
        setPage(1);
    };

    /* ------------------------------- Render ------------------------------- */
    return (
        <div>
            {/* Header */}
            <div
                className="mb-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] px-6 py-5 text-white shadow-xl"
                style={{
                    backgroundImage: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.accent})`,
                }}
            >
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                            Flights
                        </h1>
                        <p className="mt-1 text-xs text-white/70">
                            Manage airlines and schedules. Trips will reference these flights.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <input
                            placeholder="Search airline, flight no, airports…"
                            className="w-72 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
                            value={q}
                            onChange={(e) => {
                                setQ(e.target.value);
                                setPage(1);
                            }}
                        />
                        <button
                            onClick={openNew}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition"
                        >
                            <Plus className="h-4 w-4" /> Add Flight
                        </button>
                    </div>
                </div>
            </div>

            {errorMsg && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                    {errorMsg}
                </div>
            )}

            {/* Table */}
            <FlightTable
                rows={rows}
                loading={loading}
                count={count}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                onEdit={(r) => openEdit(r)}
                onDelete={(r) => askDelete(r)}
                formatDateTime={formatDateTime}
            />


            {/* Slide-over Form */}
            <FlightForm
                open={open}
                onClose={() => setOpen(false)}
                onSave={save}
                editing={editing}
                saving={saving}
                form={form}
                setForm={setForm}
            />

            {/* Confirm delete */}
            {confirm.open && (
                <ConfirmDialog
                    title="Delete Flight"
                    message={`Are you sure you want to delete "${confirm.label}"?`}
                    confirmText="Delete"
                    onCancel={() => setConfirm({ open: false, id: null, label: "" })}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
}

/* ------------------------------ Helpers ------------------------------ */
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
            className={`whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide ${onClick ? "cursor-pointer select-none" : ""
                } ${className}`}
        >
            <div className="inline-flex items-center gap-1">
                {children}
                {onClick ? (
                    <ArrowUpDown
                        className={`h-3.5 w-3.5 ${active ? "text-slate-900" : "text-slate-400"
                            }`}
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

/* ------------------------------ Small utils ------------------------------ */
function titleCase(s?: string) {
    if (!s) return s;
    return s
        .toLowerCase()
        .split(" ")
        .filter(Boolean)
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" ");
}

function formatDateTime(v?: string | null) {
    if (!v) return "—";
    const d = new Date(v);
    if (isNaN(d.getTime())) return "—";
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    })}`;
}

function toLocalInputValue(v?: string | null) {
    if (!v) return "";
    const d = new Date(v);
    if (isNaN(d.getTime())) return "";
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
        d.getDate()
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
