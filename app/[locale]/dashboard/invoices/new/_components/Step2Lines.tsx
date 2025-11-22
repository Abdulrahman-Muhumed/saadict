"use client";

import { ArrowLeft, Plus, Loader2, Check } from "lucide-react";

export default function Step2Lines({
    lines,
    addLine,
    updateLine,
    removeLine,
    totals,
    form,
    onBack,
    onCreate,
    saving,
}: any) {
    function fmt(v: number | string) {
        const num = Number(v || 0);
        return num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    return (
        <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <SummaryPill label="Status" value={form.status.toUpperCase()} />
                <SummaryPill label="Currency" value={form.currency} />
                <SummaryPill label="Issue date" value={form.issue_date || "—"} />
                <SummaryPill label="Bill to" value={form.bill_to_name || "—"} />
            </div>

            {/* Line items */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                        Line items ({lines.length})
                    </div>

                    <button
                        type="button"
                        onClick={addLine}
                        className="
                            inline-flex items-center gap-2 rounded-lg 
                            bg-slate-900 text-white dark:bg-slate-700 
                            px-3 py-1.5 text-xs font-medium shadow 
                            hover:bg-slate-800 dark:hover:bg-slate-600
                        "
                    >
                        <Plus className="h-4 w-4" />
                        Add line
                    </button>
                </div>

                {lines.length === 0 ? (
                    <div className="
                        flex items-center justify-center rounded-xl 
                        border border-dashed border-slate-300 
                        bg-slate-50/60 dark:bg-neutral-900/40 
                        p-8 text-xs text-slate-500 dark:text-slate-400
                    ">
                        No line items yet. Click <span className="mx-1 font-medium">Add line</span>.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {lines.map((l: any, idx: number) => {
                            const qty = Number(l.qty || 0);
                            const unit = Number(l.unit_price || 0);
                            const discount = Number(l.discount || 0);
                            const taxRate = Number(l.tax_rate || 0);

                            const gross = qty * unit;
                            const net = Math.max(0, gross - discount);
                            const tax = net * (taxRate / 100);
                            const lineTotal = net + tax;

                            return (
                                <div
                                    key={l.id}
                                    className="
                                        rounded-xl border border-slate-200 dark:border-slate-700 
                                        bg-white dark:bg-neutral-900 
                                        shadow-sm hover:shadow-md transition p-4 space-y-3
                                    "
                                >
                                    {/* Row 1 */}
                                    <div className="flex items-start gap-3">
                                        {/* Position */}
                                        <div className="w-14">
                                            <label className="text-[11px] text-slate-500 dark:text-slate-400">
                                                Pos.
                                            </label>
                                            <input
                                                type="number"
                                                className="
                                                    mt-1 w-full rounded-lg 
                                                    border border-slate-300 dark:border-slate-700 
                                                    bg-white dark:bg-neutral-800 
                                                    text-right text-xs 
                                                    text-slate-800 dark:text-slate-200 
                                                    px-2 py-1
                                                "
                                                value={l.position}
                                                onChange={(e) =>
                                                    updateLine(idx, {
                                                        position: Number(e.target.value || 0),
                                                    })
                                                }
                                            />
                                        </div>

                                        {/* Item + description */}
                                        <div className="flex-1 space-y-2">
                                            <input
                                                placeholder="Item name"
                                                className="
                                                    w-full rounded-lg 
                                                    border border-slate-300 dark:border-slate-700 
                                                    bg-white dark:bg-neutral-800 
                                                    text-sm text-slate-800 dark:text-slate-200 
                                                    px-3 py-2 font-medium
                                                "
                                                value={l.item_name}
                                                onChange={(e) =>
                                                    updateLine(idx, { item_name: e.target.value })
                                                }
                                            />

                                            <textarea
                                                rows={2}
                                                placeholder="Description"
                                                className="
                                                    w-full rounded-lg 
                                                    border border-slate-300 dark:border-slate-700 
                                                    bg-white dark:bg-neutral-800 
                                                    text-xs text-slate-600 dark:text-slate-300 
                                                    px-3 py-2
                                                "
                                                value={l.description}
                                                onChange={(e) =>
                                                    updateLine(idx, {
                                                        description: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        {/* Remove */}
                                        <button
                                            type="button"
                                            onClick={() => removeLine(l.id)}
                                            className="
                                                ml-2 text-xs text-red-500 
                                                hover:text-red-700 dark:hover:text-red-400
                                            "
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    {/* Row 2 */}
                                    <div className="grid grid-cols-2 md:grid-cols-7 gap-3 items-end">
                                        <NumberField
                                            label="Qty"
                                            value={l.qty}
                                            onChange={(v) =>
                                                updateLine(idx, { qty: Number(v || 0) })
                                            }
                                        />
                                        <NumberField
                                            label="Unit"
                                            value={l.unit_price}
                                            onChange={(v) =>
                                                updateLine(idx, { unit_price: Number(v || 0) })
                                            }
                                        />
                                        <NumberField
                                            label="Discount"
                                            value={l.discount}
                                            onChange={(v) =>
                                                updateLine(idx, { discount: Number(v || 0) })
                                            }
                                        />
                                        <NumberField
                                            label="Tax %"
                                            value={l.tax_rate}
                                            onChange={(v) =>
                                                updateLine(idx, { tax_rate: Number(v || 0) })
                                            }
                                        />
                                        <NumberField
                                            label="Paid"
                                            value={l.amount_paid}
                                            onChange={(v) =>
                                                updateLine(idx, { amount_paid: Number(v || 0) })
                                            }
                                        />

                                        {/* Total */}
                                        <div className="md:col-span-2">
                                            <label className="text-[11px] text-slate-500 dark:text-slate-400">
                                                Line total
                                            </label>
                                            <div
                                                className="
                                                    mt-1 rounded-lg 
                                                    border border-slate-200 dark:border-slate-700 
                                                    bg-slate-50 dark:bg-neutral-800 
                                                    px-3 py-2 text-right 
                                                    font-mono text-xs 
                                                    text-slate-800 dark:text-slate-100
                                                "
                                            >
                                                {fmt(lineTotal)}
                                            </div>

                                            <div className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
                                                Gross {fmt(gross)} · Net {fmt(net)} · Tax {fmt(tax)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Totals + Actions */}
            <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-4 items-start">
                {/* Back */}
                <div>
                    <button
                        type="button"
                        onClick={onBack}
                        className="
                            inline-flex items-center gap-2 rounded-xl 
                            border border-slate-200 dark:border-slate-700 
                            bg-white dark:bg-neutral-900 
                            px-4 py-2 text-xs font-medium 
                            text-slate-700 dark:text-slate-300 
                            hover:bg-slate-50 dark:hover:bg-neutral-800
                        "
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to details
                    </button>
                </div>

                {/* Totals */}
                <div className="
                    rounded-xl border border-slate-200 dark:border-slate-700 
                    bg-slate-50/70 dark:bg-neutral-900 
                    p-4 text-xs space-y-2
                ">
                    <TotalRow label="Sub total" value={`${fmt(totals.sub)}`} currency={form.currency} />
                    <TotalRow label="Discount" value={`${fmt(totals.discount)}`} currency={form.currency} />
                    <TotalRow label="Tax" value={`${fmt(totals.tax)}`} currency={form.currency} />

                    <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-2">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                            Grand total
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                            {form.currency} {fmt(totals.grand)}
                        </span>
                    </div>

                    <TotalRow label="Amount paid" value={`${fmt(totals.paid)}`} currency={form.currency} />

                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                            Amount due
                        </span>
                        <span className="font-semibold text-[var(--hg-indigo,#241c72)]">
                            {form.currency} {fmt(totals.due)}
                        </span>
                    </div>

                    <div className="pt-2">
                        <button
                            type="button"
                            onClick={onCreate}
                            disabled={saving}
                            className="
                                inline-flex w-full items-center justify-center gap-2 
                                rounded-xl bg-[var(--hg-indigo,#241c72)] 
                                px-4 py-2.5 text-xs font-semibold text-white shadow 
                                hover:bg-indigo-800 disabled:opacity-60
                            "
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Creating invoice…
                                </>
                            ) : (
                                <>
                                    <Check className="h-4 w-4" />
                                    Create invoice
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* SMALL COMPONENTS */
function SummaryPill({ label, value }: { label: string; value: string }) {
    return (
        <div className="
            flex items-center justify-between rounded-xl 
            border border-slate-200 dark:border-slate-700 
            bg-white dark:bg-neutral-900 
            px-3 py-2 shadow-sm
        ">
            <span className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {label}
            </span>
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[70%] text-right">
                {value}
            </span>
        </div>
    );
}

function NumberField({
    label,
    value,
    onChange,
}: {
    label: string;
    value: number;
    onChange: (v: string) => void;
}) {
    return (
        <div>
            <label className="text-[11px] text-slate-500 dark:text-slate-400">
                {label}
            </label>
            <input
                type="number"
                step="0.01"
                min="0"
                className="
                    mt-1 w-full rounded-lg 
                    border border-slate-300 dark:border-slate-700 
                    bg-white dark:bg-neutral-800 
                    text-right text-xs 
                    text-slate-800 dark:text-slate-200 
                    px-2 py-1
                "
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

function TotalRow({
    label,
    value,
    currency,
}: {
    label: string;
    value: string;
    currency: string;
}) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">{label}</span>
            <span className="font-medium text-slate-800 dark:text-slate-100">
                {currency} {value}
            </span>
        </div>
    );
}
