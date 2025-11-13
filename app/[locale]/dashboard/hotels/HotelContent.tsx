"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
    Plus,
    Pencil,
    Trash2,
    Loader2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import HotelHeader from "./_components/HotelHeader";
import HotelTable from "./_components/HotelTable";
import HotelForm from "./_components/HotelForm";
import ConfirmDialog from "../hajj/_components/ConfirmDialog";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PageContent() {

    const PAGE_SIZE = 12;
    const [rows, setRows] = useState<any[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [confirm, setConfirm] = useState<{ open: boolean; id: string | null; name: string }>({
        open: false,
        id: null,
        name: "",
    });
    const [editing, setEditing] = useState<any>(null);
    const [saving, setSaving] = useState(false);
    const [sort, setSort] = useState({ col: "created_at", dir: "desc" });
    const [q, setQ] = useState("");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [form, setForm] = useState({
        name: "",
        city: "",
        address: "",
        capacity: "",
        stars: "",
    });

    const empty = { name: "", city: "", address: "", capacity: "", stars: "" };

    /* ---------------------------- Fetch list ---------------------------- */
    useEffect(() => {
        let active = true;
        (async () => {
            setLoading(true);
            setErrorMsg(null);

            const from = (page - 1) * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;

            let query = supabase
                .from("hotels")
                .select("*", { count: "exact" })
                .order(sort.col, { ascending: sort.dir === "asc" })
                .range(from, to);

            if (q.trim()) {
                const term = q.trim();
                query = query.or(
                    `name.ilike.%${term}%,city.ilike.%${term}%,address.ilike.%${term}%`
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

    const totalPages = useMemo(() => Math.max(1, Math.ceil(count / PAGE_SIZE)), [count]);

    /* ----------------------------- Actions ----------------------------- */
    function openNew() {
        setEditing(null);
        setForm(empty);
        setOpen(true);
        setErrorMsg(null);
    }

    function openEdit(row: any) {
        setEditing(row);
        setForm({
            name: row.name ?? "",
            city: row.city ?? "",
            address: row.address ?? "",
            capacity: row.capacity ?? "",
            stars: row.stars ?? "",
        });
        setOpen(true);
        setErrorMsg(null);
    }

    async function save(e: any) {
        e.preventDefault();
        setSaving(true);
        setErrorMsg(null);

        const payload = {
            name: form.name.trim(),
            city: titleCase(form.city.trim()),
            address: form.address.trim() || null,
            capacity: form.capacity === "" ? null : Number(form.capacity),
            stars: form.stars === "" ? null : Number(form.stars),
        };

        let res;
        if (editing) {
            res = await supabase.from("hotels").update(payload).eq("id", editing.id).select().single();
        } else {
            res = await supabase.from("hotels").insert([payload]).select().single();
        }

        setSaving(false);
        if (res.error) {
            const msg =
                res.error.code === "23505"
                    ? "A hotel with the same name in this city already exists."
                    : res.error.message;
            setErrorMsg(msg);
            return;
        }

        setOpen(false);
        setPage(1);
    }

    async function confirmDelete(id: string) {
        const { error } = await supabase.from("hotels").delete().eq("id", id);
        if (error) return setErrorMsg(error.message);
        setRows((r) => r.filter((x) => x.id !== id));
        setConfirm({ open: false, id: null, name: "" });
    }

    const toggleSort = (col: string) => {
        setSort((s) =>
            s.col === col ? { col, dir: s.dir === "asc" ? "desc" : "asc" } : { col, dir: "desc" }
        );
        setPage(1);
    };

    /* ----------------------------- Render ----------------------------- */
    return (
        <div>
            <HotelHeader q={q} setQ={setQ} onAdd={openNew} />

            {errorMsg && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                    {errorMsg}
                </div>
            )}

            <HotelTable
                rows={rows}
                loading={loading}
                sort={sort}
                toggleSort={toggleSort}
                onEdit={openEdit}
                onDelete={(r) => setConfirm({ open: true, id: r.id, name: r.name })}
            />

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-3 flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="text-xs text-slate-500">
                        Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, count)} of {count}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
                        >
                            <ChevronLeft className="h-4 w-4" /> Prev
                        </button>
                        <div className="text-sm text-slate-600">
                            Page {page} / {totalPages}
                        </div>
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
                        >
                            Next <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            <HotelForm
                open={open}
                editing={editing}
                saving={saving}
                form={form}
                setForm={setForm}
                onClose={() => setOpen(false)}
                onSave={save}
            />

            {confirm.open && (
                <ConfirmDialog
                    title="Delete Hotel"
                    message={`Are you sure you want to delete "${confirm.name}"?`}
                    confirmText="Delete"
                    onCancel={() => setConfirm({ open: false, id: null, name: "" })}
                    onConfirm={() => confirm.id && confirmDelete(confirm.id)}
                />
            )}
        </div>
    );
}

function titleCase(str?: string | null): string {
    if (!str) return "";
    return str
        .toLowerCase()
        .split(" ")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
