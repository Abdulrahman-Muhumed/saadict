"use client";

import { Calendar, Check } from "lucide-react";
import PickerBlock from "./PickerBlock";

type SourceType = "manual" | "booking_traveler" | "ticket" | "hajj_pilgrim";

export default function Step1Details({
    form,
    setForm,
    loadingPick,
    travelerQuery,
    travelerResults,
    ticketQuery,
    ticketResults,
    pilgrimQuery,
    pilgrimResults,
    searchTraveler,
    searchTicket,
    searchPilgrim,
    pickTraveler,
    pickTicket,
    pickPilgrim,
    onNext,
}: any) {
    return (
        <div className="space-y-6 p-5">
            {/* Source + status + currency */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Source type" required>
                    <select
                        className="
                            w-full rounded-lg border px-3 py-2 text-sm
                            border-slate-200 bg-white text-slate-800
                            dark:border-slate-700 dark:bg-neutral-900 dark:text-slate-200
                        "
                        value={form.source_type}
                        onChange={(e) =>
                            setForm((f: any) => ({
                                ...f,
                                source_type: e.target.value as SourceType,
                                booking_traveler_id: null,
                                ticket_id: null,
                            }))
                        }
                    >
                        <option value="manual">Manual</option>
                        <option value="booking_traveler">Booking traveler</option>
                        <option value="ticket">Ticket</option>
                        <option value="hajj_pilgrim">Hajj pilgrim</option>
                    </select>
                </Field>

                <Field label="Status" required>
                    <select
                        className="
                            w-full rounded-lg border px-3 py-2 text-sm
                            border-slate-200 bg-white text-slate-800
                            dark:border-slate-700 dark:bg-neutral-900 dark:text-slate-200
                        "
                        value={form.status}
                        onChange={(e) =>
                            setForm((f: any) => ({
                                ...f,
                                status: e.target.value,
                            }))
                        }
                    >
                        <option value="issued">Issued</option>
                        <option value="paid">Paid</option>
                    </select>
                </Field>

                <Field label="Currency" required>
                    <select
                        className="
                            w-full rounded-lg border px-3 py-2 text-sm
                            border-slate-200 bg-white text-slate-800
                            dark:border-slate-700 dark:bg-neutral-900 dark:text-slate-200
                        "
                        value={form.currency}
                        onChange={(e) =>
                            setForm((f: any) => ({
                                ...f,
                                currency: e.target.value,
                            }))
                        }
                    >
                        {["USD", "SAR", "AED", "EUR"].map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                </Field>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Issue date" required>
                    <div className="relative">
                        <Calendar className="
                            absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 
                            text-slate-400 dark:text-slate-500
                        " />
                        <input
                            type="date"
                            className="
                                w-full rounded-lg border pl-8 pr-3 py-2 text-sm
                                border-slate-200 bg-white text-slate-800
                                dark:border-slate-700 dark:bg-neutral-900 dark:text-slate-200
                            "
                            value={form.issue_date}
                            onChange={(e) =>
                                setForm((f: any) => ({ ...f, issue_date: e.target.value }))
                            }
                        />
                    </div>
                </Field>

                <Field label="Due date">
                    <input
                        type="date"
                        className="
                            w-full rounded-lg border px-3 py-2 text-sm
                            border-slate-200 bg-white text-slate-800
                            dark:border-slate-700 dark:bg-neutral-900 dark:text-slate-200
                        "
                        value={form.due_date || ""}
                        onChange={(e) =>
                            setForm((f: any) => ({ ...f, due_date: e.target.value }))
                        }
                    />
                </Field>
            </div>

            {/* SEARCH PICKERS */}
            {form.source_type === "booking_traveler" && (
                <PickerBlock
                    label="Link to booking traveler"
                    helper="Search by name, passport, phone, or booking name."
                    query={travelerQuery}
                    setQuery={searchTraveler}
                    loading={loadingPick}
                    results={travelerResults}
                    renderItem={(r) => (
                        <div>
                            <div className="text-sm font-medium dark:text-white">
                                {r.pilgrims?.full_name}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                {r.pilgrims?.passport_number} • {r.pilgrims?.phone} • Booking:{" "}
                                {r.bookings?.name}
                            </div>
                        </div>
                    )}
                    onSelect={pickTraveler}
                />
            )}

            {form.source_type === "ticket" && (
                <PickerBlock
                    label="Link to ticket"
                    helper="Search via passenger, passport, or reference."
                    query={ticketQuery}
                    setQuery={searchTicket}
                    loading={loadingPick}
                    results={ticketResults}
                    renderItem={(t) => (
                        <div>
                            <div className="text-sm font-medium dark:text-white">
                                {t.full_name}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                {t.passport_number} • Ref {t.reference || "—"} • {t.price}{" "}
                                {t.currency}
                            </div>
                        </div>
                    )}
                    onSelect={pickTicket}
                />
            )}

            {form.source_type === "hajj_pilgrim" && (
                <PickerBlock
                    label="Link to Hajj pilgrim"
                    helper="Search via name or reference."
                    query={pilgrimQuery}
                    setQuery={searchPilgrim}
                    loading={loadingPick}
                    results={pilgrimResults}
                    renderItem={(p) => (
                        <div>
                            <div className="text-sm font-medium dark:text-white">
                                {p.full_name}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                Ref {p.reference || "—"} • {p.phone_number}
                            </div>
                        </div>
                    )}
                    onSelect={pickPilgrim}
                />
            )}

            {/* Bill to */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Bill to name" required>
                    <input
                        className="
                            w-full rounded-lg border px-3 py-2 text-sm
                            border-slate-200 bg-white text-slate-800
                            dark:border-slate-700 dark:bg-neutral-900 dark:text-slate-200
                        "
                        value={form.bill_to_name}
                        onChange={(e) =>
                            setForm((f: any) => ({ ...f, bill_to_name: e.target.value }))
                        }
                    />
                </Field>

                <Field label="Passport">
                    <input
                        className="
                            w-full rounded-lg border px-3 py-2 text-sm
                            border-slate-200 bg-white text-slate-800
                            dark:border-slate-700 dark:bg-neutral-900 dark:text-slate-200
                        "
                        value={form.bill_to_passport}
                        onChange={(e) =>
                            setForm((f: any) => ({ ...f, bill_to_passport: e.target.value }))
                        }
                    />
                </Field>

                <Field label="Phone">
                    <input
                        className="
                            w-full rounded-lg border px-3 py-2 text-sm
                            border-slate-200 bg-white text-slate-800
                            dark:border-slate-700 dark:bg-neutral-900 dark:text-slate-200
                        "
                        value={form.bill_to_phone}
                        onChange={(e) =>
                            setForm((f: any) => ({ ...f, bill_to_phone: e.target.value }))
                        }
                    />
                </Field>
            </div>

            <Field label="Notes">
                <textarea
                    rows={3}
                    className="
                        w-full rounded-lg border px-3 py-2 text-sm
                        border-slate-200 bg-white text-slate-800
                        dark:border-slate-700 dark:bg-neutral-900 dark:text-slate-200
                    "
                    value={form.notes}
                    onChange={(e) =>
                        setForm((f: any) => ({ ...f, notes: e.target.value }))
                    }
                    placeholder="Optional remarks"
                />
            </Field>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onNext}
                    className="
                        inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm 
                        font-medium text-white shadow 
                        bg-[var(--hg-indigo,#241c72)] hover:bg-indigo-800
                    "
                >
                    Next: Line items
                    <Check className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

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
            <div
                className="
                    mb-1 text-xs font-medium 
                    text-slate-700 dark:text-slate-300
                "
            >
                {label} {required && <span className="text-red-600">*</span>}
            </div>
            {children}
        </label>
    );
}
