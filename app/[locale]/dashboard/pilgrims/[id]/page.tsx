"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Loader2, Image as ImageIcon, Calendar, Globe, Phone, MapPin,
    FileText, User, Shield, IdCard, Contact, Download, X, Edit3, Trash2, Check
} from "lucide-react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { brand } from "@/components/config/brand";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */
type UUID = string;

type Pilgrim = {
    id: UUID;
    created_at: string;
    full_name: string;
    gender: "male" | "female" | null;
    date_of_birth: string | null;
    phone: string | null;
    city: string | null;
    charged_amount: number | null;
    currency: "USD" | "SAR" | "AED" | "EUR" | string | null;
    visa_cost: number | null;
    visa_issue_status: "issued" | "not_issued" | null;
    medical_notes: string | null;
    emergency_name: string | null;
    emergency_phone: string | null;
    // optional extras you referenced in header chips
    passport_number?: string | null;
    nationality?: string | null;
    group_name?: string | null;
    // media
    photo_url?: string | null;
    passport_doc_url?: string | null;
};

type EditForm = Partial<Pilgrim> & {
    photo_file?: File | null;
    passport_file?: File | null;
};

/* -------------------------------------------------------------------------- */
/* Supabase client (same pattern you use elsewhere)                           */
/* -------------------------------------------------------------------------- */
const supabase: SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_DST_BUCKET || "pilgrims";
const YEAR = 2025;

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */
export default function PilgrimDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [p, setP] = useState<Pilgrim | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [docOpen, setDocOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

    const [form, setForm] = useState<EditForm>({});
    const [saving, setSaving] = useState<boolean>(false);

    const PRIMARY = brand.colors.primary;
    const ACCENT = brand.colors.accent;

    async function fetchPilgrim() {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from("pilgrims")
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;
            setP(data);
        } catch (e: any) {
            console.error(e);
            setError(e?.message || "Failed to load pilgrim.");
            setP(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPilgrim();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const age = useMemo(() => {
        if (!p?.date_of_birth) return null;
        const dob = new Date(p.date_of_birth);
        const now = new Date();
        let a = now.getFullYear() - dob.getFullYear();
        const m = now.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) a--;
        return a;
    }, [p?.date_of_birth]);

    function openEdit() {
        if (!p) return;
        setForm({
            ...p,
            charged_amount: p.charged_amount ?? null,
            visa_cost: p.visa_cost ?? null,
            photo_file: null,
            passport_file: null,
        });
        setEditOpen(true);
    }

    async function handleDelete() {
        try {
            await supabase.from("pilgrims").delete().eq("id", id);
            router.push("/protected/pilgrims");
        } catch (e) {
            console.error(e);
            alert("Delete failed.");
        }
    }

    if (error) {
        return (
            <div className="p-10 text-center text-sm text-red-600 dark:text-red-400">
                {error}
            </div>
        );
    }
    if (!p) {
        return (
            <div className="p-10 text-center text-slate-500 dark:text-slate-400">
                Not found.
            </div>
        );
    }

    return (
        <div>
            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-none md:rounded-3xl border border-white/10 text-white shadow-xl"
                style={{
                    backgroundImage: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                }}
            >
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                        backgroundImage:
                            "radial-gradient(transparent 1px, rgba(255,255,255,.08) 1px)",
                        backgroundSize: "16px 16px",
                    }}
                />
                <div className="relative z-10 px-5 py-5 md:px-8 md:py-7">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15"
                        >
                            <ArrowLeft className="h-4 w-4" /> Back
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="text-xs text-white/80">
                                Created {new Date(p.created_at).toLocaleString()}
                            </div>
                            <button
                                onClick={openEdit}
                                className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15"
                            >
                                <Edit3 className="h-4 w-4" /> Edit
                            </button>
                            <button
                                onClick={() => setConfirmOpen(true)}
                                className="inline-flex items-center gap-1 rounded-lg border border-red-300/30 bg-red-500/10 px-3 py-1.5 text-sm text-red-100 hover:bg-red-500/20"
                            >
                                <Trash2 className="h-4 w-4" /> Delete
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="min-w-0">
                            <h1 className="truncate text-2xl md:text-3xl font-bold tracking-tight">
                                {p.full_name}
                            </h1>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/80">
                                {p.passport_number && (
                                    <Chip icon={<IdCard className="h-3.5 w-3.5" />} text={p.passport_number} />
                                )}
                                {p.nationality && (
                                    <Chip icon={<Globe className="h-3.5 w-3.5" />} text={p.nationality} />
                                )}
                                {p.gender && (
                                    <Chip icon={<User className="h-3.5 w-3.5" />} text={p.gender} />
                                )}
                                {p.group_name && (
                                    <Chip icon={<Shield className="h-3.5 w-3.5" />} text={p.group_name} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* BODY */}
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_1.2fr]">
                {/* LEFT */}
                <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-sm shadow-lg">
                    <div className="relative h-48 w-full overflow-hidden rounded-t-2xl bg-black/10">
                        {p.photo_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={p.photo_url} alt="" className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full items-center justify-center text-black dark:text-white/70">
                                <ImageIcon className="h-8 w-8" />
                            </div>
                        )}
                    </div>
                    <div className="p-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                        <Key icon={<IdCard className="h-4 w-4" />} label="Passport">
                            <span className="font-mono text-xs">{p.passport_number || "—"}</span>
                        </Key>
                        <Key icon={<Globe className="h-4 w-4" />} label="Nationality">
                            {p.nationality || "—"}
                        </Key>
                        <Key icon={<User className="h-4 w-4" />} label="Gender">
                            {p.gender || "—"}
                        </Key>
                        <Key icon={<Calendar className="h-4 w-4" />} label="Date of birth">
                            {p.date_of_birth || "—"}{" "}
                            {age ? <span className="text-slate-400">({age})</span> : null}
                        </Key>
                        <Key icon={<Phone className="h-4 w-4" />} label="Phone">
                            {p.phone || "—"}
                        </Key>
                        <Key icon={<MapPin className="h-4 w-4" />} label="City">
                            {p.city || "—"}
                        </Key>
                    </div>
                </section>

                {/* RIGHT */}
                <div className="space-y-6">
                    <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 shadow-lg">
                        <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
                            Documents
                        </h2>
                        {p.passport_doc_url ? (
                            <button
                                onClick={() => setDocOpen(true)}
                                className="inline-flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/10 px-3 py-2 text-sm text-slate-900 dark:text-white hover:bg-black/10 dark:hover:bg-white/15"
                            >
                                <FileText className="h-4 w-4" /> View passport document
                            </button>
                        ) : (
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                No passport document uploaded.
                            </p>
                        )}
                    </section>

                    <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 shadow-lg">
                        <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
                            Emergency Contact
                        </h2>
                        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                            <Key icon={<Contact className="h-4 w-4" />} label="Name">
                                {p.emergency_name || "—"}
                            </Key>
                            <Key icon={<Phone className="h-4 w-4" />} label="Phone">
                                {p.emergency_phone || "—"}
                            </Key>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 shadow-lg">
                        <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
                            Medical Notes
                        </h2>
                        {p.medical_notes ? (
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                                {p.medical_notes}
                            </p>
                        ) : (
                            <p className="text-sm text-slate-600 dark:text-slate-400">No medical notes.</p>
                        )}
                    </section>
                </div>
            </div>

            {/* MODALS */}
            <AnimatePresence>
                {docOpen && (
                    <DocumentModal
                        url={p.passport_doc_url || ""}
                        onClose={() => setDocOpen(false)}
                        title={`${p.full_name} — Passport Document`}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {editOpen && (
                    <EditDrawer
                        form={form}
                        setForm={setForm}
                        onClose={() => setEditOpen(false)}
                        onSaved={async () => {
                            setEditOpen(false);
                            await fetchPilgrim();
                        }}
                        saving={saving}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {confirmOpen && (
                    <DeleteConfirm
                        onCancel={() => setConfirmOpen(false)}
                        onConfirm={handleDelete}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Small UI bits                                                              */
/* -------------------------------------------------------------------------- */
function Chip({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <span className="inline-flex items-center gap-1 rounded-md border border-white/20 bg-white/10 px-2 py-0.5">
            {icon}
            <span className="text-[11px] leading-5">{text}</span>
        </span>
    );
}

function Key({
    icon,
    label,
    children,
}: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 shadow-sm">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                {icon}
                <span className="text-xs">{label}</span>
            </div>
            <div className="mt-1 font-medium text-slate-900 dark:text-white">{children}</div>
        </div>
    );
}

function DeleteConfirm({
    onCancel,
    onConfirm,
}: {
    onCancel: () => void;
    onConfirm: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
            <div className="w-[90%] max-w-sm rounded-2xl border border-red-200 bg-white dark:bg-neutral-900 shadow-2xl">
                <div className="px-6 py-5 text-center">
                    <Trash2 className="mx-auto mb-3 h-8 w-8 text-red-600" />
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                        Delete Pilgrim?
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        This action cannot be undone. The pilgrim record will be permanently removed.
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                        <button
                            onClick={onCancel}
                            className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-5 py-2 text-sm text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-neutral-800 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="rounded-xl bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function DocumentModal({
    url,
    onClose,
    title,
}: {
    url: string;
    onClose: () => void;
    title: string;
}) {
    const [ready, setReady] = useState(false);
    const isPdf = /\.pdf(\?|$)/i.test(url);
    const isImage = /\.(png|jpe?g|webp|gif|bmp|heic)(\?|$)/i.test(url);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60]"
        >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
            <div className="absolute left-1/2 top-1/2 w-[95vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020] shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                    <div className="truncate text-sm font-semibold text-white">{title}</div>
                    <div className="flex items-center gap-2">
                        {url && (
                            <a
                                href={url}
                                download
                                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/15"
                            >
                                <Download className="h-4 w-4" />
                                Download
                            </a>
                        )}
                        <button
                            onClick={onClose}
                            className="rounded-lg border border-white/10 bg-white/10 p-1.5 text-white hover:bg-white/15"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div className="relative max-h-[80vh] min-h-[60vh] overflow-auto bg-black/20">
                    {!ready && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                            <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#0b1020] px-3 py-2 text-sm text-white/80">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Loading document…
                            </div>
                        </div>
                    )}
                    {isImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={url} alt="Document" className="mx-auto block max-w-[1200px]" onLoad={() => setReady(true)} />
                    ) : isPdf ? (
                        <iframe src={url} className="h-[80vh] w-full" onLoad={() => setReady(true)} />
                    ) : (
                        <div className="p-6 text-sm text-white/80">Unable to preview file.</div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

/* -------------------------------------------------------------------------- */
/* Edit Drawer                                                                */
/* -------------------------------------------------------------------------- */
function EditDrawer({
    form,
    setForm,
    onClose,
    onSaved,
    saving,
}: {
    form: EditForm;
    setForm: React.Dispatch<React.SetStateAction<EditForm>>;
    onClose: () => void;
    onSaved: () => Promise<void> | void;
    saving: boolean;
}) {
    const step1OK =
        (form.full_name?.trim()?.length || 0) > 0 &&
        form.charged_amount !== undefined &&
        form.charged_amount !== null &&
        form.visa_cost !== undefined &&
        form.visa_cost !== null &&
        !Number.isNaN(Number(form.charged_amount)) &&
        !Number.isNaN(Number(form.visa_cost));

    async function save(e: React.FormEvent) {
        e.preventDefault();
        if (!step1OK || !form.id) return;

        try {
            const payload = {
                full_name: (form.full_name || "").trim(),
                gender: form.gender || null,
                date_of_birth: form.date_of_birth || null,
                phone: form.phone?.toString().trim() || null,
                city: form.city?.toString().trim() || null,
                charged_amount:
                    form.charged_amount === null || form.charged_amount === undefined
                        ? null
                        : Number(form.charged_amount),
                currency: form.currency || "USD",
                visa_cost:
                    form.visa_cost === null || form.visa_cost === undefined
                        ? null
                        : Number(form.visa_cost),
                visa_issue_status: form.visa_issue_status || "not_issued",
                medical_notes: form.medical_notes?.toString().trim() || null,
                emergency_name: form.emergency_name?.toString().trim() || null,
                emergency_phone: form.emergency_phone?.toString().trim() || null,
            };

            // update core fields
            const { error: upErr } = await supabase
                .from("pilgrims")
                .update(payload)
                .eq("id", form.id as string);
            if (upErr) throw upErr;

            // optional files
            const updates: Record<string, string | null> = {};
            if (form.photo_file) {
                updates.photo_url = await uploadForPilgrim(form.id as string, form.photo_file, "photo");
            }
            if (form.passport_file) {
                updates.passport_doc_url = await uploadForPilgrim(form.id as string, form.passport_file, "passport");
            }
            if (Object.keys(updates).length > 0) {
                const { error: updErr } = await supabase
                    .from("pilgrims")
                    .update(updates)
                    .eq("id", form.id as string);
                if (updErr) throw updErr;
            }

            await onSaved();
        } catch (err: any) {
            console.error(err);
            alert(err?.message || "Save failed.");
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
        >
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto rounded-l-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-neutral-950 text-slate-900 dark:text-white shadow-2xl">
                <div
                    className="sticky top-0 z-10 border-b border-slate-200 dark:border-white/10 text-white px-6 py-4"
                    style={{
                        backgroundImage: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.accent})`,
                    }}
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Edit Pilgrim</h3>
                        <button
                            onClick={onClose}
                            className="rounded-lg border border-white/30 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20"
                        >
                            Close
                        </button>
                    </div>
                </div>

                <form onSubmit={save} className="px-6 py-5">
                    {/* form */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label="Full Name" required>
                            <input
                                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2"
                                value={form.full_name || ""}
                                onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
                                required
                            />
                        </Field>
                        <Field label="Gender">
                            <select
                                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2"
                                value={form.gender || ""}
                                onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value as "male" | "female" }))}
                            >
                                <option value="">—</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </Field>
                        <Field label="Date of Birth">
                            <input
                                type="date"
                                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2"
                                value={form.date_of_birth || ""}
                                onChange={(e) => setForm((f) => ({ ...f, date_of_birth: e.target.value }))}
                            />
                        </Field>
                        <Field label="Phone">
                            <input
                                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2"
                                value={form.phone || ""}
                                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                            />
                        </Field>
                        <Field label="City (optional)">
                            <input
                                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2"
                                value={form.city || ""}
                                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                            />
                        </Field>
                        <Field label="Charged amount" required>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2"
                                value={form.charged_amount ?? ""}
                                onChange={(e) =>
                                    setForm((f) => ({ ...f, charged_amount: e.target.value === "" ? null : Number(e.target.value) }))
                                }
                                required
                            />
                        </Field>
                        <Field label="Visa cost" required>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2"
                                value={form.visa_cost ?? ""}
                                onChange={(e) =>
                                    setForm((f) => ({ ...f, visa_cost: e.target.value === "" ? null : Number(e.target.value) }))
                                }
                                required
                            />
                        </Field>
                        <Field label="Currency">
                            <select
                                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2"
                                value={form.currency || "USD"}
                                onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
                            >
                                <option value="USD">USD</option>
                                <option value="SAR">SAR</option>
                                <option value="AED">AED</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </Field>
                        <Field label="Visa Status">
                            <select
                                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 capitalize"
                                value={form.visa_issue_status || "not_issued"}
                                onChange={(e) =>
                                    setForm((f) => ({ ...f, visa_issue_status: e.target.value as "issued" | "not_issued" }))
                                }
                            >
                                <option value="not_issued">not_issued</option>
                                <option value="issued">issued</option>
                            </select>
                        </Field>

                        {/* Optional uploads */}
                        <Field label="Profile Photo (optional)">
                            <input
                                type="file"
                                accept="image/*"
                                className="block w-full text-sm"
                                onChange={(e) => setForm((f) => ({ ...f, photo_file: e.target.files?.[0] || null }))}
                            />
                        </Field>
                        <Field label="Passport Document (optional)">
                            <input
                                type="file"
                                accept="image/*,application/pdf"
                                className="block w-full text-sm"
                                onChange={(e) => setForm((f) => ({ ...f, passport_file: e.target.files?.[0] || null }))}
                            />
                        </Field>

                        <Field label="Emergency Contact Name">
                            <input
                                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2"
                                value={form.emergency_name || ""}
                                onChange={(e) => setForm((f) => ({ ...f, emergency_name: e.target.value }))}
                            />
                        </Field>
                        <Field label="Emergency Contact Phone">
                            <input
                                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2"
                                value={form.emergency_phone || ""}
                                onChange={(e) => setForm((f) => ({ ...f, emergency_phone: e.target.value }))}
                            />
                        </Field>

                        <div className="md:col-span-2">
                            <Field label="Medical Notes">
                                <textarea
                                    rows={4}
                                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2"
                                    value={form.medical_notes || ""}
                                    onChange={(e) => setForm((f) => ({ ...f, medical_notes: e.target.value }))}
                                />
                            </Field>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-5 py-2 text-sm text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-neutral-800 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving || !step1OK}
                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 transition"
                            onClick={() => void 0}
                        >
                            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

/* -------------------------------------------------------------------------- */
/* Form Field wrapper                                                         */
/* -------------------------------------------------------------------------- */
function Field({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <label className="block">
            <div className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                {label} {required && <span className="text-red-600">*</span>}
            </div>
            {children}
        </label>
    );
}

/* -------------------------------------------------------------------------- */
/* Storage upload helper                                                      */
/* -------------------------------------------------------------------------- */
async function uploadForPilgrim(
    pilgrimId: string,
    file: File,
    slug: "photo" | "passport"
): Promise<string | null> {
    if (!file) return null;
    const ext =
        file.name?.split(".").pop()?.toLowerCase() ||
        (file.type.includes("png")
            ? "png"
            : file.type.includes("jpeg")
                ? "jpg"
                : file.type.includes("webp")
                    ? "webp"
                    : file.type.includes("pdf")
                        ? "pdf"
                        : "bin");

    const key = `pilgrims/umrah-${YEAR}/${pilgrimId}/${slug}.${ext}`;

    const { error } = await supabase.storage.from(BUCKET).upload(key, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type || "application/octet-stream",
    });
    if (error) throw error;

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(key);
    return data?.publicUrl || null;
}
