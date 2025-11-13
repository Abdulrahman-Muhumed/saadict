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
} from "lucide-react";


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


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

        const { data, error } = await supabase
            .from("invoices")
            .update(payload)
            .eq("id", id)
            .select()
            .single();

        setSaving(false);
        if (error) return alert(error.message);
        setInvoice(data);
        setEditOpen(false);
    }

    return (
        <div className="space-y-5 transition-colors duration-300">
            {/* Header */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#241c72] to-[#0b1020] text-white shadow-xl dark:from-[#0b1020] dark:to-[#241c72]">
                <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Invoice #{invoice.invoice_number || invoice.id}
                        </h1>
                        <p className="text-sm text-white/70 dark:text-white/60">
                            Manage, edit, or print invoice details.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setConfirmOpen(true)}
                            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition"
                        >
                            <Trash2 className="h-4 w-4" /> Delete
                        </button>
                        <button
                            onClick={openEdit}
                            className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-3 py-2 text-xs font-medium text-white hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition"
                        >
                            <Pencil className="h-4 w-4" /> Edit
                        </button>
                        <button
                            onClick={() => PdfInvoice(invoice, lines)}
                            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 transition"
                        >
                            <Printer className="h-4 w-4" /> Print
                        </button>

                    </div>
                </div>
            </div>

            {/* Quick summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Card label="Date" value={invoice.issue_date || "—"} />
                <Card label="Items" value={lines.length} />
                <Card label="Total" value={`${grand.toFixed(2)} ${invoice.currency}`} />
            </div>

            {/* Items list */}
            <div className="rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm p-4 transition-colors">
                <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-3">
                    Items
                </h3>
                {lines.length === 0 ? (
                    <div className="text-xs text-slate-500 dark:text-slate-400 py-3">
                        No items found
                    </div>
                ) : (
                    <ul className="divide-y divide-slate-100 dark:divide-neutral-700">
                        {lines.map((l) => (
                            <li
                                key={l.id}
                                className="py-2 flex items-center justify-between text-sm text-slate-700 dark:text-slate-200"
                            >
                                <div>
                                    <div className="font-medium">{l.item_name}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                        {l.qty} × {l.unit_price}
                                    </div>
                                </div>
                                <div className="font-mono">{(l.qty * l.unit_price).toFixed(2)}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Totals */}
            <div className="rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm p-4 transition-colors">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <Total label="Subtotal" value={subtotal} />
                    <Total label="Tax" value={tax} />
                    <Total label="Discount" value={discount} />
                    <Total label="Grand Total" value={grand} highlight />
                </div>
            </div>

            {/* ─────────────── EDIT MODAL ─────────────── */}
            {editOpen && (
                <div className="fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setEditOpen(false)}
                    />
                    <div className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto bg-white dark:bg-neutral-900 shadow-2xl transition-colors">
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

                        <form onSubmit={saveEdit} className="px-6 pb-6 space-y-4 mt-4">
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

                            <Field label="Notes">
                                <textarea
                                    rows={3}
                                    className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-slate-800 dark:text-slate-100"
                                    value={form.notes}
                                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                />
                            </Field>

                            <div className="flex justify-end gap-2">
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
                    </div>
                </div>
            )}

            {/* ─────────────── DELETE CONFIRM ─────────────── */}
            {confirmOpen && (
                <div className="fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setConfirmOpen(false)}
                    />
                    <div className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-2xl transition-colors">
                        <div className="border-b border-slate-200 dark:border-neutral-700 px-5 py-3">
                            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                                Delete Invoice
                            </h3>
                        </div>
                        <div className="px-5 py-4 text-sm text-slate-700 dark:text-slate-300">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold">
                                #{invoice.invoice_number || invoice.id}
                            </span>
                            ? This action cannot be undone.
                        </div>
                        <div className="flex items-center justify-end gap-2 border-t border-slate-200 dark:border-neutral-700 px-5 py-3">
                            <button
                                onClick={() => setConfirmOpen(false)}
                                className="rounded-lg border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-neutral-800 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition"
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

function Card({ label, value }: { label: string; value: any }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-[11px] uppercase tracking-wide text-slate-500">
                {label}
            </div>
            <div className="mt-1 text-sm font-medium text-slate-700">{value}</div>
        </div>
    );
}

function Total({
    label,
    value,
    highlight,
}: {
    label: string;
    value: number;
    highlight?: boolean;
}) {
    return (
        <div
            className={`flex items-center justify-between rounded-lg px-3 py-2 ${highlight
                ? "bg-indigo-50 text-indigo-800 font-semibold"
                : "bg-slate-50 text-slate-700"
                }`}
        >
            <span>{label}</span>
            <span>{value.toFixed(2)}</span>
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
