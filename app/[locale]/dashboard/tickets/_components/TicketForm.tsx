"use client";

import { useState, useEffect } from "react";
import { Loader2, X } from "lucide-react";

/* --------------------------- constants/helpers --------------------------- */
const CURRENCIES = ["USD", "SAR", "EUR"];
const EMPTY = {
  full_name: "",
  passport_number: "",
  from_airport: "",
  to_airport: "",
  price: 0,
  cost: 0,
  currency: "USD",
  reference: "",
  paid: false,
  notes: "",
};

function isIataCode(v: string) {
  return /^[A-Z]{3}$/.test(v.trim().toUpperCase());
}

/* ------------------------------- component ------------------------------- */
export default function TicketForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: any;
  onSave: (data: any) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  // ✅ safely initialize — merge default EMPTY with initial if provided
  const [form, setForm] = useState({ ...EMPTY, ...(initial || {}) });

  // ensure reactivity if `initial` changes (e.g. switching between edit/add)
  useEffect(() => {
    setForm({ ...EMPTY, ...(initial || {}) });
  }, [initial]);

  const formValid =
    form.full_name.trim() &&
    form.passport_number.trim() &&
    isIataCode(form.from_airport) &&
    isIataCode(form.to_airport);

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="absolute right-0 top-0 h-full w-full max-w-3xl overflow-y-auto rounded-l-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-neutral-950 text-slate-900 dark:text-slate-200 shadow-2xl transition-colors duration-300">
        {/* header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-neutral-950/80 px-6 py-4 backdrop-blur">
          <h3 className="text-lg font-semibold">
            {initial?.id ? "Edit Ticket" : "Add Ticket"}
          </h3>
          <button
            onClick={onCancel}
            className="rounded-lg border border-slate-200 dark:border-slate-700 p-1.5 hover:bg-slate-50 dark:hover:bg-neutral-900 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (formValid) onSave(form);
          }}
          className="px-6 py-5 grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {/* left side */}
          <div className="space-y-4">
            <Field label="Full name" required>
              <input
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2"
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              />
            </Field>

            <Field label="Passport number" required>
              <input
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 font-mono text-xs"
                value={form.passport_number}
                onChange={(e) =>
                  setForm({ ...form, passport_number: e.target.value })
                }
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="From (IATA)" required>
                <input
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 font-mono uppercase"
                  maxLength={3}
                  value={form.from_airport}
                  onChange={(e) =>
                    setForm({ ...form, from_airport: e.target.value.toUpperCase() })
                  }
                />
              </Field>
              <Field label="To (IATA)" required>
                <input
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 font-mono uppercase"
                  maxLength={3}
                  value={form.to_airport}
                  onChange={(e) =>
                    setForm({ ...form, to_airport: e.target.value.toUpperCase() })
                  }
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Field label="Sell price">
                <input
                  type="number"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                />
              </Field>
              <Field label="Cost">
                <input
                  type="number"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2"
                  value={form.cost}
                  onChange={(e) => setForm({ ...form, cost: parseFloat(e.target.value) || 0 })}
                />
              </Field>
              <Field label="Currency">
                <select
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2"
                  value={form.currency}
                  onChange={(e) => setForm({ ...form, currency: e.target.value })}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Reference">
              <input
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 font-mono text-xs"
                value={form.reference}
                onChange={(e) => setForm({ ...form, reference: e.target.value })}
              />
            </Field>

            <Field label="Paid">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={form.paid}
                  onChange={(e) => setForm({ ...form, paid: e.target.checked })}
                />
                Mark as paid
              </label>
            </Field>

            <Field label="Notes">
              <textarea
                rows={3}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2"
                value={form.notes ?? ""}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </Field>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-5 py-2 text-sm hover:bg-slate-50 dark:hover:bg-neutral-800 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!formValid || saving}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-sm font-medium text-white disabled:opacity-60 transition"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                Save
              </button>
            </div>
          </div>

          {/* right preview */}
          <div className="lg:sticky lg:top-0 lg:self-start">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-slate-50 dark:from-neutral-900 dark:to-neutral-950 p-4 shadow-sm transition">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                  Flight Ticket
                </div>
                <div
                  className={`text-[11px] font-semibold ${
                    form.paid
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {form.paid ? "Paid" : "Unpaid"}
                </div>
              </div>

              <div className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
                {form.full_name || "Passenger Name"}
              </div>

              <div className="mt-1 inline-flex items-center gap-2 font-mono text-sm text-slate-700 dark:text-slate-300">
                {(form.from_airport || "XXX").toUpperCase()} →{" "}
                {(form.to_airport || "YYY").toUpperCase()}
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="text-slate-600 dark:text-slate-400">
                  Ref: {form.reference || "—"}
                </div>
                <div className="font-mono font-medium text-slate-900 dark:text-white">
                  {Number(form.price || 0).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}{" "}
                  {form.currency}
                </div>
              </div>

              <div
                className={`mt-4 text-xs inline-flex items-center gap-1 rounded-full px-2 py-0.5 ${
                  form.paid
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800"
                    : "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:ring-amber-800"
                }`}
              >
                {form.paid ? "Payment Confirmed" : "Awaiting Payment"}
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Live preview updates as you type.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------ subcomponent ------------------------------ */
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
