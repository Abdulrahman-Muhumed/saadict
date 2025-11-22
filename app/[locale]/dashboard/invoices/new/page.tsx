"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Header from "./_components/Header";
import Step1Details from "./_components/Step1Details";
import Step2Lines from "./_components/Step2Lines";

type SourceType = "manual" | "booking_traveler" | "ticket" | "hajj_pilgrim";

type InvoiceFormState = {
    source_type: SourceType;
    booking_traveler_id: number | null;
    ticket_id: number | null;
    issue_date: string;
    due_date: string | null;
    currency: string;
    status: "issued" | "paid";
    bill_to_name: string;
    bill_to_passport: string;
    bill_to_phone: string;
    notes: string | null;
};

type LineDraft = {
    id: string;
    position: number;
    item_name: string;
    description: string;
    qty: number;
    unit_price: number;
    discount: number;
    tax_rate: number;
    amount_paid: number;
};

/* ─────────────────────────────────────────────
   Supabase client (browser)
────────────────────────────────────────────── */
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* Utility */
function todayISO() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
}

export default function NewInvoicePage() {
    const router = useRouter();

    /* Steps */
    const [step, setStep] = useState<1 | 2>(1);

    /* Saving + errors */
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /* Form state */
    const [form, setForm] = useState<InvoiceFormState>({
        source_type: "manual",
        booking_traveler_id: null,
        ticket_id: null,
        issue_date: todayISO(),
        due_date: null,
        currency: "USD",
        status: "issued",
        bill_to_name: "",
        bill_to_passport: "",
        bill_to_phone: "",
        notes: "",
    });

    /* Search state */
    const [loadingPick, setLoadingPick] = useState(false);

    const [travelerQuery, setTravelerQuery] = useState("");
    const [travelerResults, setTravelerResults] = useState<any[]>([]);

    const [ticketQuery, setTicketQuery] = useState("");
    const [ticketResults, setTicketResults] = useState<any[]>([]);

    const [pilgrimQuery, setPilgrimQuery] = useState("");
    const [pilgrimResults, setPilgrimResults] = useState<any[]>([]);

    /* ─────────────────────────────────────────────
       SEARCH FUNCTIONS
    ────────────────────────────────────────────── */
    async function searchTraveler(term: string) {
        const q = term.trim();
        setTravelerQuery(q);
        setTravelerResults([]);
        if (!q) return;

        try {
            setLoadingPick(true);
            const { data, error } = await supabase
                .from("booking_travelers")
                .select(
                    "id, pilgrims(full_name, passport_number, phone), bookings(name)"
                )
                .limit(30);

            if (!error && data) {
                const match = (v: unknown) =>
                    String(v || "")
                        .toLowerCase()
                        .includes(q.toLowerCase());

                const filtered = data.filter((r) => {
                    const pilgrim = r.pilgrims as {
                        full_name?: string;
                        passport_number?: string;
                        phone?: string;
                    };

                    return (
                        match(pilgrim?.full_name) ||
                        match(pilgrim?.passport_number) ||
                        match(pilgrim?.phone) ||
                        match((r.pilgrims as any)?.name)
                    );
                });

                setTravelerResults(filtered);
            }
        } finally {
            setLoadingPick(false);
        }
    }

    async function searchTicket(term: string) {
        const q = term.trim();
        setTicketQuery(q);
        setTicketResults([]);
        if (!q) return;

        try {
            setLoadingPick(true);
            const { data, error } = await supabase
                .from("tickets")
                .select("id, full_name, passport_number, price, currency, paid, reference")
                .or(
                    `full_name.ilike.%${q}%,passport_number.ilike.%${q}%,reference.ilike.%${q}%`
                )
                .limit(30);

            if (!error && data) setTicketResults(data);
        } finally {
            setLoadingPick(false);
        }
    }

    async function searchPilgrim(term: string) {
        const q = term.trim();
        setPilgrimQuery(q);
        setPilgrimResults([]);
        if (!q) return;

        try {
            setLoadingPick(true);
            const { data, error } = await supabase
                .from("hajj_users")
                .select("id, full_name, phone_number, reference")
                .or(`full_name.ilike.%${q}%,reference.ilike.%${q}%`)
                .limit(30);

            if (!error && data) setPilgrimResults(data);
        } finally {
            setLoadingPick(false);
        }
    }

    /* ─────────────────────────────────────────────
       PICK ACTIONS
    ────────────────────────────────────────────── */
    function pickTraveler(r: any) {
        const pil = r.pilgrims as {
            full_name?: string;
            passport_number?: string;
            phone?: string;
        };
        setForm((f) => ({
            ...f,
            source_type: "booking_traveler",
            booking_traveler_id: r.id,
            ticket_id: null,
            bill_to_name: pil?.full_name || "",
            bill_to_passport: pil?.passport_number || "",
            bill_to_phone: pil?.phone || "",
        }));
        setTravelerResults([]);
        setTravelerQuery("");
    }

    function pickTicket(t: any) {
        setForm((f) => ({
            ...f,
            source_type: "ticket",
            booking_traveler_id: null,
            ticket_id: t.id,
            bill_to_name: t.full_name || "",
            bill_to_passport: t.passport_number || "",
            bill_to_phone: "",
            currency: t.currency || f.currency,
        }));
        setTicketResults([]);
        setTicketQuery("");
    }

    function pickPilgrim(p: any) {
        setForm((f) => ({
            ...f,
            source_type: "hajj_pilgrim",
            booking_traveler_id: null,
            ticket_id: null,
            bill_to_name: p.full_name || "",
            bill_to_phone: p.phone_number || "",
        }));
        setPilgrimResults([]);
        setPilgrimQuery("");
    }

    /* ─────────────────────────────────────────────
       LINE ITEMS STATE
    ────────────────────────────────────────────── */
    const [lines, setLines] = useState<LineDraft[]>([]);

    function addLine() {
        setLines((ls) => [
            ...ls,
            {
                id: `tmp-${Date.now()}-${Math.random().toString(16).slice(2)}`,
                position: (ls[ls.length - 1]?.position || 0) + 1,
                item_name: "",
                description: "",
                qty: 1,
                unit_price: 0,
                discount: 0,
                tax_rate: 0,
                amount_paid: 0,
            },
        ]);
    }

    function updateLine(idx: number, patch: Partial<LineDraft>) {
        setLines((ls) => {
            const next = [...ls];
            next[idx] = { ...next[idx], ...patch };
            return next;
        });
    }

    function removeLine(id: string) {
        setLines((ls) => ls.filter((l) => l.id !== id));
    }

    /* ─────────────────────────────────────────────
       TOTALS
    ────────────────────────────────────────────── */
    const totals = useMemo(() => {
        let sub = 0;
        let totalDiscount = 0;
        let totalTax = 0;
        let paid = 0;

        for (const l of lines) {
            const qty = Number(l.qty || 0);
            const unit = Number(l.unit_price || 0);
            const discount = Number(l.discount || 0);
            const taxRate = Number(l.tax_rate || 0);

            const gross = qty * unit;
            const net = Math.max(0, gross - discount);
            const tax = net * (taxRate / 100);
            const lineTotal = net + tax;

            sub += lineTotal;
            totalDiscount += discount;
            totalTax += tax;
            paid += Number(l.amount_paid || 0);
        }

        const grand = sub;
        const due = Math.max(0, grand - paid);

        return {
            sub,
            discount: totalDiscount,
            tax: totalTax,
            grand,
            paid,
            due,
        };
    }, [lines]);

    /* ─────────────────────────────────────────────
       VALIDATION
    ────────────────────────────────────────────── */
    function canGoToStep2() {
        if (!form.bill_to_name.trim()) return false;
        if (!form.issue_date) return false;
        if (!form.currency) return false;
        return true;
    }

    function goToStep2() {
        setError(null);
        if (!canGoToStep2()) {
            setError("Please complete the required invoice details first.");
            return;
        }
        setStep(2);
    }

    /* ─────────────────────────────────────────────
       CREATE INVOICE
    ────────────────────────────────────────────── */
    async function handleCreateInvoice() {
        setError(null);

        if (!canGoToStep2()) {
            setStep(1);
            setError("Invoice details missing.");
            return;
        }

        if (lines.length === 0) {
            setError("Add at least one line item.");
            return;
        }

        setSaving(true);

        try {
            const payload: any = {
                source_type: form.source_type,
                booking_traveler_id:
                    form.source_type === "booking_traveler"
                        ? form.booking_traveler_id
                        : null,
                ticket_id:
                    form.source_type === "ticket" ? form.ticket_id : null,
                issue_date: form.issue_date,
                due_date: form.due_date || null,
                currency: form.currency,
                status: form.status,
                bill_to_name: form.bill_to_name,
                bill_to_passport: form.bill_to_passport || null,
                bill_to_phone: form.bill_to_phone || null,
                notes: form.notes || null,
            };

            const { data: invoice, error: invErr } = await supabase
                .from("invoices")
                .insert([payload])
                .select("*")
                .single();

            if (invErr || !invoice)
                throw new Error(invErr?.message || "Invoice creation failed.");

            const invoiceId = invoice.id;

            const toInsert = lines
                .filter((l) => (l.item_name || l.description).trim().length > 0)
                .map((l, i) => ({
                    invoice_id: invoiceId,
                    position: l.position || i + 1,
                    item_name: l.item_name.trim(),
                    description: l.description.trim(),
                    qty: Number(l.qty || 0),
                    unit_price: Number(l.unit_price || 0),
                    discount: Number(l.discount || 0),
                    tax_rate: Number(l.tax_rate || 0),
                    amount_paid: Number(l.amount_paid || 0),
                }));

            if (toInsert.length) {
                const { error: lineErr } = await supabase
                    .from("invoice_lines")
                    .insert(toInsert);

                if (lineErr) throw new Error(lineErr.message);
            }

            router.push(`/dashboard/invoices/${invoiceId}`);
        } catch (err: any) {
            console.error("Create invoice error:", err);
            setError(err.message || "Failed to create invoice.");
            setSaving(false);
        }
    }

    /* ─────────────────────────────────────────────
       RENDER
    ────────────────────────────────────────────── */
    return (
        <div className="space-y-6 md:space-y-8">
            <Header step={step} />

            {/* Errors */}
            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* Step Content */}
            {step === 1 ? (
                <Step1Details
                    form={form}
                    setForm={setForm}
                    loadingPick={loadingPick}
                    travelerQuery={travelerQuery}
                    travelerResults={travelerResults}
                    ticketQuery={ticketQuery}
                    ticketResults={ticketResults}
                    pilgrimQuery={pilgrimQuery}
                    pilgrimResults={pilgrimResults}
                    searchTraveler={searchTraveler}
                    searchTicket={searchTicket}
                    searchPilgrim={searchPilgrim}
                    pickTraveler={pickTraveler}
                    pickTicket={pickTicket}
                    pickPilgrim={pickPilgrim}
                    onNext={goToStep2}
                />
            ) : (
                <Step2Lines
                    lines={lines}
                    addLine={addLine}
                    updateLine={updateLine}
                    removeLine={removeLine}
                    totals={totals}
                    form={form}
                    onBack={() => setStep(1)}
                    onCreate={handleCreateInvoice}
                    saving={saving}
                />
            )}
        </div>
    );
}
