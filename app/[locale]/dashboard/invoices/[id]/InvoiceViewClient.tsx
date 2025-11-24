"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/lib/i18n/navigation";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import PdfInvoice from "./_components/PdfInvoice";
import LoaderOverlay from "@/components/LoaderOverlay";
import {
    Loader2,
    Printer,
    Pencil,
    Trash2,
    Save,
    X,
    ArrowLeft
} from "lucide-react";
import { brand } from "@/components/config/brand";


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


type EditLine = {
    id: string | number;
    item_name: string;
    description: string;
    qty: number;
    unit_price: number;
    amount_paid: number;
};

export default function InvoiceViewClient() {

    const router = useRouter();
    const { id } = useParams();

    const [invoice, setInvoice] = useState<any>(null);
    const [lines, setLines] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [loading2, setLoading2] = useState(false);

    const [editOpen, setEditOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    const [editTab, setEditTab] = useState<"details" | "lines">("details");
    const [editLines, setEditLines] = useState<EditLine[]>(lines);

    function updateEditLine(idx: number, patch: Partial<EditLine>) {
        setEditLines((prev) => {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], ...patch };
            return copy;
        });
    }

    function removeEditLine(id: string | number) {
        setEditLines((prev) => prev.filter((x) => x.id !== id));
    }

    const [form, setForm] = useState<any>({
        issue_date: "",
        due_date: "",
        currency: "USD",
        status: "issued",
        bill_to_name: "",
        bill_to_passport: "",
        bill_to_phone: "",
        notes: "",
    });


    // fetch data
    useEffect(() => {
        let alive = true;
        (async () => {
            setLoading(true);
            const { data: inv } = await supabase
                .from("invoices")
                .select("*")
                .eq("id", id)
            const { data: lns } = await supabase
                .from("invoice_lines")
                .select("*")
                .eq("invoice_id", id)
                .order("position", { ascending: true });

            if (!alive) return;
            setInvoice(inv?.[0] ?? null);
            setLines(lns || []);
            setLoading(false);
        })();
        return () => {
            alive = false;
        };
    }, [id]);

    if (loading)
        return (
            <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
                <Loader2 className="h-6 w-6 animate-spin text-neutral-400 mb-2" />
                <span className="text-sm tracking-wide">Loading...</span>
            </div>
        );

    // calculations
    const subtotal = lines.reduce(
        (sum, l) => sum + Number(l.qty || 0) * Number(l.unit_price || 0),
        0
    );
    const tax = Number(invoice.tax || 0);
    const discount = Number(invoice.discount || 0);
    const grand = subtotal + tax - discount;

    // Delete invoice + lines
    const handleDelete = async () => {
        await supabase.from("invoice_lines").delete().eq("invoice_id", id);
        await supabase.from("invoices").delete().eq("id", id);
        router.push("/dashboard/invoices");
    };

    // Edit save

    const openEdit = () => {
        setForm({
            issue_date: invoice.issue_date || "",
            due_date: invoice.due_date || "",
            currency: invoice.currency || "USD",
            status: invoice.status || "issued",
            bill_to_name: invoice.bill_to_name || "",
            bill_to_passport: invoice.bill_to_passport || "",
            bill_to_phone: invoice.bill_to_phone || "",
            notes: invoice.notes || "",
        });
        setEditOpen(true);
    };

    async function saveEdit(e: any) {
        e.preventDefault();
        setSaving(true);

        /* -------------------- 1) UPDATE INVOICE HEADER -------------------- */
        const payload = {
            issue_date: form.issue_date || null,
            due_date: form.due_date || null,
            currency: form.currency,
            status: form.status,
            bill_to_name: form.bill_to_name,
            bill_to_passport: form.bill_to_passport,
            bill_to_phone: form.bill_to_phone,
            notes: form.notes,
        };

        const { data: updatedInvoice, error: invErr } = await supabase
            .from("invoices")
            .update(payload)
            .eq("id", id)
            .select()
            .single();

        if (invErr) {
            setSaving(false);
            return alert(invErr.message);
        }

        /* -------------------- 2) UPDATE / UPSERT LINE ITEMS -------------------- */

        // editLines = your modal state containing updated lines
        // originalLines = `lines` from the main page BEFORE modal open

        const originalIds = lines.map((l: any) => l.id);
        const editedIds = editLines.map((l: any) => l.id);

        // Detect removed lines
        const deletedIds = originalIds.filter((id) => !editedIds.includes(id));

        // Delete removed lines
        if (deletedIds.length > 0) {
            await supabase
                .from("invoice_lines")
                .delete()
                .in("id", deletedIds);
        }

        // Upsert edited + existing + new lines
        if (editLines.length > 0) {
            const toUpsert = editLines.map((l: any, idx: number) => ({
                id: typeof l.id === "number" ? l.id : undefined, // allow new lines
                invoice_id: id,
                position: l.position || idx + 1,
                item_name: l.item_name,
                description: l.description,
                qty: Number(l.qty || 0),
                unit_price: Number(l.unit_price || 0),
                discount: Number(l.discount || 0),
                tax_rate: Number(l.tax_rate || 0),
            }));

            const { error: upsertErr } = await supabase
                .from("invoice_lines")
                .upsert(toUpsert, { onConflict: "id" });

            if (upsertErr) {
                setSaving(false);
                return alert(upsertErr.message);
            }
        }

        /* -------------------- 3) REFRESH UI -------------------- */

        // Refresh invoice + lines state in UI
        setInvoice(updatedInvoice);

        const { data: refreshedLines } = await supabase
            .from("invoice_lines")
            .select("*")
            .eq("invoice_id", id)
            .order("position", { ascending: true });

        setLines(refreshedLines || []);

        setSaving(false);
        setEditOpen(false);
    }


    return (
        <div className="space-y-5 transition-colors duration-300">
            {/* Premium Hoggaan Header (Unified with /invoices/new) */}
            <section
                className="
                        relative overflow-hidden rounded-2xl md:rounded-3xl 
                        text-white shadow-xl 
                        
                    "
                style={{
                    backgroundImage: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.accent})`,
                }}
            >
                {/* Top Accent Line */}
                <div className="
                        absolute inset-x-0 top-0 h-[3px] 
                        bg-gradient-to-r 
                        from-[var(--hg-accent,#F99417)] 
                        via-white/40 
                        to-[var(--hg-accent,#F99417)]
                        opacity-80
                    " />

                <div className="relative px-6 py-8 md:px-10 md:py-12">

                    {/* Title + Back Button + Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        {/* LEFT: Back + Invoice Info */}
                        <div className="space-y-1">
                            <button
                                onClick={() => router.back()}
                                className="
                                        inline-flex items-center gap-1 
                                        mb-2
                                        text-sm text-white/80 
                                        hover:text-white transition
                                    "
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </button>

                            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                                Invoice #{invoice.invoice_number || invoice.id}
                            </h1>

                            <p className="text-sm text-white/70 dark:text-white/60">
                                Manage, edit, or print invoice details.
                            </p>
                        </div>

                        {/* RIGHT: ACTION BUTTONS */}
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                onClick={() => setConfirmOpen(true)}
                                className="
                                    inline-flex items-center gap-2 rounded-lg 
                                    bg-red-600 hover:bg-red-700 
                                    dark:bg-red-700 dark:hover:bg-red-800 
                                    px-3 py-2 text-xs font-medium text-white transition
                                "
                            >
                                <Trash2 className="h-4 w-4" /> Delete
                            </button>

                            <button
                                onClick={openEdit}
                                className="
                                        inline-flex items-center gap-2 rounded-lg 
                                        bg-neutral-900 hover:bg-neutral-800 
                                        dark:bg-neutral-800 dark:hover:bg-neutral-700 
                                        px-3 py-2 text-xs font-medium text-white transition
                                    "
                            >
                                <Pencil className="h-4 w-4" /> Edit
                            </button>

                            <button
                                onClick={() => PdfInvoice(invoice, lines)}
                                className="
                                        inline-flex items-center gap-2 rounded-lg 
                                        bg-indigo-600 hover:bg-indigo-700 
                                        dark:bg-indigo-700 dark:hover:bg-indigo-800 
                                        px-3 py-2 text-xs font-medium text-white transition
                                    "
                            >
                                <Printer className="h-4 w-4" /> Print
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            {/* ─────────────────────────────────────────────── */}
            {/* QUICK SUMMARY */}
            {/* ─────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SummaryCard label="Issue Date" value={invoice.issue_date || '—'} />
                <SummaryCard label="Items" value={lines.length} />
                <SummaryCard
                    label="Total"
                    value={`${grand.toFixed(2)} ${invoice.currency}`}
                    highlight
                />
            </div>

            <div className="
                    rounded-xl border 
                    border-slate-200 dark:border-neutral-700 
                    bg-white/80 dark:bg-neutral-900/80 
                    backdrop-blur shadow 
                    p-5 transition-colors
                ">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Invoice Items
                </h3>

                {lines.length === 0 ? (
                    <div className="text-xs text-slate-500 dark:text-slate-400 py-3">
                        No items found.
                    </div>
                ) : (
                    <ul className="divide-y divide-slate-100 dark:divide-neutral-700">
                        {lines.map((l) => (
                            <li
                                key={l.id}
                                className="
                        py-3 flex items-center justify-between 
                        text-sm text-slate-800 dark:text-slate-200
                    "
                            >
                                <div className="space-y-0.5 max-w-[70%]">
                                    <div className="font-medium truncate">{l.item_name}</div>

                                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                        {l.qty} × {l.unit_price.toFixed(2)} {invoice.currency}
                                    </div>
                                </div>

                                <div className="font-mono text-[13px] text-right">
                                    {(l.qty * l.unit_price).toFixed(2)}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* ─────────────────────────────────────────────── */}
            {/* TOTALS */}
            {/* ─────────────────────────────────────────────── */}
            <div className="
                        rounded-xl border 
                        border-slate-200 dark:border-neutral-700 
                        bg-white/80 dark:bg-neutral-900/80 
                        backdrop-blur shadow 
                        p-5 transition-colors
                    ">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <TotalItem label="Subtotal" value={subtotal} currency={invoice.currency} />
                    <TotalItem label="Tax" value={tax} currency={invoice.currency} />
                    <TotalItem label="Discount" value={discount} currency={invoice.currency} />
                    <TotalItem
                        label="Grand Total"
                        value={grand}
                        currency={invoice.currency}
                        highlight
                    />
                </div>
            </div>

            {/* ─────────────── EDIT MODAL ─────────────── */}
            {editOpen && (
                <div className="fixed inset-0 z-50">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setEditOpen(false)}
                    />

                    {/* Panel */}
                    <div className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto bg-white dark:bg-neutral-900 shadow-2xl transition-colors">

                        {/* Header */}
                        <div className="sticky top-0 z-10 border-b border-slate-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 px-6 py-4 backdrop-blur flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                                Edit Invoice
                            </h3>
                            <button
                                onClick={() => setEditOpen(false)}
                                className="rounded-lg border border-slate-200 dark:border-neutral-700 p-2 hover:bg-slate-50 dark:hover:bg-neutral-800 transition"
                            >
                                <X className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-slate-200 dark:border-neutral-700 px-6">
                            <div className="flex gap-4 text-sm">
                                <button
                                    onClick={() => setEditTab("details")}
                                    className={`py-3 ${editTab === "details"
                                        ? "border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
                                        }`}
                                >
                                    Invoice Details
                                </button>

                                <button
                                    onClick={() => setEditTab("lines")}
                                    className={`py-3 ${editTab === "lines"
                                        ? "border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
                                        }`}
                                >
                                    Line Items
                                </button>
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="px-6 pb-6 mt-4 space-y-4">
                            {/* TAB 1: DETAILS */}
                            {editTab === "details" && (
                                <form onSubmit={saveEdit} className="space-y-4">
                                    {/* Dates */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Field label="Issue Date" required>
                                            <input
                                                type="date"
                                                className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-slate-800 dark:text-slate-100"
                                                value={form.issue_date || ""}
                                                onChange={(e) => setForm({ ...form, issue_date: e.target.value })}
                                            />
                                        </Field>

                                        <Field label="Due Date">
                                            <input
                                                type="date"
                                                className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-slate-800 dark:text-slate-100"
                                                value={form.due_date || ""}
                                                onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                                            />
                                        </Field>
                                    </div>

                                    {/* Currency + Status */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Field label="Currency">
                                            <select
                                                className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-slate-800 dark:text-slate-100"
                                                value={form.currency}
                                                onChange={(e) => setForm({ ...form, currency: e.target.value })}
                                            >
                                                {["USD", "SAR", "AED", "EUR"].map((c) => (
                                                    <option key={c}>{c}</option>
                                                ))}
                                            </select>
                                        </Field>

                                        <Field label="Status">
                                            <select
                                                className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-slate-800 dark:text-slate-100"
                                                value={form.status}
                                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                                            >
                                                <option value="issued">Issued</option>
                                                <option value="paid">Paid</option>
                                            </select>
                                        </Field>
                                    </div>

                                    {/* Bill To */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Field label="Bill To" required>
                                            <input
                                                className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-slate-800 dark:text-slate-100"
                                                value={form.bill_to_name}
                                                onChange={(e) => setForm({ ...form, bill_to_name: e.target.value })}
                                            />
                                        </Field>

                                        <Field label="Passport">
                                            <input
                                                className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 font-mono text-slate-800 dark:text-slate-100"
                                                value={form.bill_to_passport}
                                                onChange={(e) => setForm({ ...form, bill_to_passport: e.target.value })}
                                            />
                                        </Field>

                                        <Field label="Phone">
                                            <input
                                                className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-slate-800 dark:text-slate-100"
                                                value={form.bill_to_phone}
                                                onChange={(e) => setForm({ ...form, bill_to_phone: e.target.value })}
                                            />
                                        </Field>
                                    </div>

                                    {/* Notes */}
                                    <Field label="Notes">
                                        <textarea
                                            rows={3}
                                            className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-slate-800 dark:text-slate-100"
                                            value={form.notes}
                                            onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                        />
                                    </Field>

                                    {/* Save Buttons */}
                                    <div className="flex justify-end gap-2 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setEditOpen(false)}
                                            className="px-4 py-2 text-sm border border-slate-200 dark:border-neutral-700 rounded-lg hover:bg-slate-50 dark:hover:bg-neutral-800 transition"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 disabled:opacity-60 transition"
                                        >
                                            {saving ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Save className="h-4 w-4" />
                                            )}
                                            Save
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* TAB 2: LINES */}
                            {editTab === "lines" && (
                                <div className="space-y-4">
                                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        Edit Line Items
                                    </h4>

                                    {lines.map((l, idx) => (
                                        <div key={l.id} className="
                                                rounded-xl border border-slate-200 dark:border-neutral-700 
                                                bg-white dark:bg-neutral-800 
                                                p-4 space-y-3 shadow-sm
                                            ">
                                            <div className="grid grid-cols-3 gap-3">
                                                <Field label="Item Name">
                                                    <input
                                                        className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-slate-800 dark:text-slate-100"
                                                        value={l.item_name}
                                                        onChange={(e) => updateEditLine(idx, { item_name: e.target.value })}
                                                    />
                                                </Field>

                                                <Field label="Qty">
                                                    <input
                                                        type="number"
                                                        className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-slate-800 dark:text-slate-100"
                                                        value={l.qty}
                                                        onChange={(e) => updateEditLine(idx, { qty: Number(e.target.value) })}
                                                    />
                                                </Field>

                                                <Field label="Unit Price">
                                                    <input
                                                        type="number"
                                                        className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-slate-800 dark:text-slate-100"
                                                        value={l.unit_price}
                                                        onChange={(e) => updateEditLine(idx, { unit_price: Number(e.target.value) })}
                                                    />
                                                </Field>

                                                <Field label="Amount Paid">
                                                    <input
                                                        type="number"
                                                        className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-slate-800 dark:text-slate-100"
                                                        value={l.amount_paid || 0}
                                                        onChange={(e) =>
                                                            updateEditLine(idx, { amount_paid: Number(e.target.value || 0) })
                                                        }
                                                    />
                                                </Field>
                                            </div>

                                            <Field label="Description">
                                                <textarea
                                                    rows={2}
                                                    className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-xs text-slate-700 dark:text-slate-300"
                                                    value={l.description}
                                                    onChange={(e) => updateEditLine(idx, { description: e.target.value })}
                                                />
                                            </Field>

                                            <button
                                                type="button"
                                                onClick={() => removeEditLine(l.id)}
                                                className="text-xs text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ─────────────── DELETE CONFIRM ─────────────── */}
            {confirmOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                    {/* Frosted Glass Backdrop */}
                    <div
                        className="
                absolute inset-0 
                backdrop-blur-[6px] 
                bg-black/10 dark:bg-black/20
            "
                        onClick={() => setConfirmOpen(false)}
                    />

                    {/* Modal */}
                    <div
                        className="
                relative w-full max-w-sm 
                rounded-2xl 
                border border-white/20 dark:border-white/10
                bg-white/70 dark:bg-neutral-900/70
                backdrop-blur-xl 
                shadow-2xl 
                animate-popIn
            "
                    >

                        {/* Header */}
                        <div className="px-6 py-4 border-b border-white/20 dark:border-white/10">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                                Delete Invoice
                            </h3>
                        </div>

                        {/* Message */}
                        <div className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold">
                                #{invoice.invoice_number || invoice.id}
                            </span>
                            ? This action <span className="font-semibold text-red-600">cannot be undone.</span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-white/20 dark:border-white/10">
                            <button
                                onClick={() => setConfirmOpen(false)}
                                className="
                        rounded-lg px-4 py-2 text-sm
                        border border-slate-300 dark:border-neutral-700
                        bg-white/60 dark:bg-neutral-800/60
                        backdrop-blur 
                        hover:bg-white/80 dark:hover:bg-neutral-800/80
                        transition
                    "
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                className="
                        inline-flex items-center gap-2 rounded-lg 
                        bg-red-600/90 dark:bg-red-700/90 
                        px-4 py-2 text-sm font-medium text-white 
                        hover:bg-red-700 dark:hover:bg-red-800 
                        backdrop-blur 
                        transition
                    "
                            >
                                <Trash2 className="h-4 w-4" /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <LoaderOverlay show={loading2} />

        </div>


    );
}

/* ──────────────── Sub Components ──────────────── */


function SummaryCard({
    label,
    value,
    highlight,
}: {
    label: string;
    value: string | number;
    highlight?: boolean;
}) {
    return (
        <div
            className={`
                rounded-xl border 
                border-slate-200 dark:border-neutral-700 
                bg-white/80 dark:bg-neutral-900/80 
                backdrop-blur shadow 
                p-4 transition-colors
                ${highlight ? "ring-2 ring-[var(--hg-accent,#F99417)]" : ""}
            `}
        >
            <div className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {label}
            </div>

            <div className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                {value}
            </div>
        </div>
    );
}

function TotalItem({
    label,
    value,
    currency,
    highlight,
}: {
    label: string;
    value: number;
    currency: string;
    highlight?: boolean;
}) {
    return (
        <div
            className={`
                flex flex-col p-3 rounded-lg 
                border border-transparent 
                ${highlight ? "bg-[var(--hg-indigo,#241c72)] text-white" : ""}
            `}
        >
            <span className={`text-xs ${highlight ? "text-white/80" : "text-slate-500 dark:text-slate-400"}`}>
                {label}
            </span>

            <span className={`font-semibold ${highlight ? "text-white" : "text-slate-900 dark:text-slate-100"}`}>
                {currency} {value.toFixed(2)}
            </span>
        </div>
    );
}



function Field({
    label,
    children,
    required,
}: {
    label: string;
    children: React.ReactNode;
    required?: boolean;
}) {
    return (
        <label className="block">
            <div className="mb-1 text-sm font-medium text-slate-700">
                {label} {required && <span className="text-red-600">*</span>}
            </div>
            {children}
        </label>
    );
}
