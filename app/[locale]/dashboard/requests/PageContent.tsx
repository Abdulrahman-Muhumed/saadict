"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
    Filter,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";


import UmrahRequestTable from "./_components/UmrahRequestTable";
import ConfirmModal from "../packages/_components/ConfirmModal";
import ReasonModal from "./_components/ReasonModal";
import RequestDetailsDrawer from "./_components/RequestDetailsDrawer";
import { brand } from "@/components/config/brand";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PAGE_SIZE = 12;
const STATUS = ["all", "pending", "accepted", "rejected"];

export default function PageContent() {
    const [rows, setRows] = useState<any[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({ col: "created_at", dir: "desc" });
    const [statusFilter, setStatusFilter] = useState("pending");
    const [q, setQ] = useState("");
    const [qDebounced, setQDebounced] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingPage, setLoadingPage] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    // Modals & Drawer
    const [open, setOpen] = useState<any | null>(null);
    const [confirm, setConfirm] = useState<any>({ open: false });
    const [rejectModal, setRejectModal] = useState<any>({
        open: false,
        id: null,
        name: "",
        reason: "",
        submitting: false,
    });
    const [approvingId, setApprovingId] = useState<string | null>(null);

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
                .from("umrah_req")
                .select("*", { count: "exact" })
                .order(sort.col, { ascending: sort.dir === "asc" })
                .range(from, to);

            if (qDebounced) {
                const term = qDebounced.replaceAll(",", " ");
                query = query.or(
                    `full_name.ilike.%${term}%,phone_num.ilike.%${term}%,group_name.ilike.%${term}%,city.ilike.%${term}%`
                );
            }

            if (statusFilter !== "all") {
                query = query.eq("status", statusFilter);
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
    }, [page, sort, qDebounced, statusFilter]);

    const totalPages = useMemo(
        () => Math.max(1, Math.ceil(count / PAGE_SIZE)),
        [count]
    );

    const headerA = brand.colors.primary;
    const headerB = brand.colors.accent;

    // ─────────────────────────── Actions ───────────────────────────
    async function approveRequest(row: any) {
        if (approvingId) return;
        setApprovingId(row.id);
        setErr(null);

        try {
            const res = await fetch("/api/umrah/approve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: row.id }),
            });
            if (!res.ok) throw new Error((await res.json())?.error || "Approve failed");

            const { pilgrim_id, passport_doc } = await res.json();
            const now = new Date().toISOString();

            setRows((rs) =>
                rs.map((r) =>
                    r.id === row.id
                        ? {
                            ...r,
                            status: "accepted",
                            processed_at: now,
                            pilgrim_id,
                            ...(passport_doc ? { passport_doc } : {}),
                        }
                        : r
                )
            );

            if (open?.id === row.id) {
                setOpen((o:any) => (o ? { ...o, status: "accepted", processed_at: now } : o));
            }
        } catch (e: any) {
            setErr(e.message);
        } finally {
            setApprovingId(null);
        }
    }

    async function rejectRequest(id: string, reason?: string) {
        setRejectModal((m:any) => ({ ...m, submitting: true }));
        try {
            const res = await fetch("/api/umrah/reject", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, reason }),
            });
            if (!res.ok) throw new Error((await res.json())?.error || "Reject failed");

            const now = new Date().toISOString();
            setRows((rs) =>
                rs.map((r) =>
                    r.id === id ? { ...r, status: "rejected", processed_at: now } : r
                )
            );
            if (open?.id === id) {
                setOpen((o:any) => (o ? { ...o, status: "rejected", processed_at: now } : o));
            }
            setRejectModal({ open: false, id: null, name: "", reason: "", submitting: false });
        } catch (e: any) {
            setErr(e.message);
            setRejectModal((m:any) => ({ ...m, submitting: false }));
        }
    }

    function handleConfirm(c: any) {
        const row = rows.find((r) => r.id === c.id);
        if (!row) return setConfirm({ open: false });

        if (c.type === "approve") {
            setConfirm({ open: false });
            approveRequest(row);
        } else if (c.type === "reject") {
            setConfirm({ open: false });
            setRejectModal({
                open: true,
                id: row.id,
                name: row.full_name,
                reason: "",
                submitting: false,
            });
        }
    }

    return (
        <>
            {/* Header */}
            <div
                className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b1020] to-[#141b3a] text-white shadow-xl"
                style={{ backgroundImage: `linear-gradient(135deg, ${headerA}, ${headerB})` }}
            >
                <div className="px-5 py-6 md:px-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                                Umrah Requests
                            </h1>
                            <p className="mt-1 text-sm text-white/80">
                                Review incoming Umrah requests. Approve → creates a Pilgrim.
                            </p>
                        </div>

                        {/* Status Filter */}
                        <div className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-1 py-1">
                            <span className="inline-flex items-center gap-1 px-2 text-xs text-white/80">
                                <Filter className="h-3.5 w-3.5" /> Status
                            </span>
                            <select
                                className="rounded-md bg-transparent px-2 py-1 text-xs text-white outline-none"
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setPage(1);
                                }}
                            >
                                {STATUS.map((s) => (
                                    <option key={s} className="text-slate-900" value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="mt-3 flex flex-wrap items-center">
                        <input
                            placeholder="Search name, phone, city, group…"
                            className="w-72 rounded-lg border border-white/20 bg-white/10 pl-3 pr-3 py-2 text-sm text-white placeholder:text-white/60 outline-none focus:bg-white/15"
                            value={q}
                            onChange={(e) => {
                                setQ(e.target.value);
                                setPage(1);
                            }}
                        />
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
                <UmrahRequestTable
                    rows={rows}
                    loading={loading}
                    onView={(r) => setOpen(r)}
                    onApprove={(r) =>
                        setConfirm({
                            open: true,
                            type: "approve",
                            id: r.id,
                            name: r.full_name,
                        })
                    }
                    onReject={(r) =>
                        setConfirm({
                            open: true,
                            type: "reject",
                            id: r.id,
                            name: r.full_name,
                        })
                    }
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

            {/* Drawer */}
            {open && (
                <RequestDetailsDrawer
                    row={open}
                    onClose={() => setOpen(null)}
                    onApprove={(r) =>
                        setConfirm({
                            open: true,
                            type: "approve",
                            id: r.id,
                            name: r.full_name,
                        })
                    }
                    onReject={(r) =>
                        setConfirm({
                            open: true,
                            type: "reject",
                            id: r.id,
                            name: r.full_name,
                        })
                    }
                    approvingId={approvingId}
                />
            )}

            {/* Confirm Modal */}
            {confirm.open && (
                <ConfirmModal
                    open={confirm.open}
                    title={
                        confirm.type === "approve" ? "Approve Request" : "Reject Request"
                    }
                    body={
                        confirm.type === "approve"
                            ? `Approve ${confirm.name} and create a pilgrim record?`
                            : `Reject ${confirm.name}?`
                    }
                    onCancel={() => setConfirm({ open: false })}
                    onConfirm={() => handleConfirm(confirm)}
                />
            )}

            {/* Reject Modal */}
            {rejectModal.open && (
                <ReasonModal
                    open={rejectModal.open}
                    name={rejectModal.name}
                    reason={rejectModal.reason}
                    submitting={rejectModal.submitting}
                    onChange={(val) => setRejectModal((m:any) => ({ ...m, reason: val }))}
                    onCancel={() =>
                        setRejectModal({
                            open: false,
                            id: null,
                            name: "",
                            reason: "",
                            submitting: false,
                        })
                    }
                    onSubmit={() => rejectRequest(rejectModal.id, rejectModal.reason)}
                />
            )}
        </>
    );
}