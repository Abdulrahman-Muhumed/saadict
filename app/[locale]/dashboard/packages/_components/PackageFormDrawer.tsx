"use client";

import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { createClient } from "@supabase/supabase-js";


type Props = {
  row?: any;
  onClose: () => void;
  onSaved?: () => void;
};


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export default function PackageFormDrawer({ row, onClose, onSaved }: Props) {
  const [form, setForm] = useState({
    title: row?.title || "",
    description: row?.description || "",
    base_price: row?.base_price || "",
    currency: row?.currency || "USD",
    days: row?.days || "",
    is_active: !!row?.is_active,
    status: row?.status || "draft",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const statuses = ["draft", "published", "archived"];

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title: form.title.trim(),
      description: form.description?.trim() || null,
      base_price: form.base_price === "" ? null : Number(form.base_price),
      currency: form.currency || "USD",
      days: form.days === "" ? null : Number(form.days),
      is_active: !!form.is_active,
      status: form.status || "draft",
    };

    const query = row
      ? supabase.from("packages").update(payload).eq("id", row.id)
      : supabase.from("packages").insert([payload]);

    const { error } = await query;
    setSaving(false);

    if (error) {
      setError(error.message);
    } else {
      onSaved?.();
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-lg overflow-y-auto rounded-l-2xl border border-border/40 bg-white dark:bg-neutral-900 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/30 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md px-6 py-4">
          <h3 className="text-lg font-semibold">
            {row ? "Edit Package" : "Add Package"}
          </h3>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1 rounded-lg border border-border/40 bg-transparent px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-neutral-800"
          >
            <X className="h-4 w-4" /> Close
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          <Field label="Title" required>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-lg border border-border/40 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </Field>

          <Field label="Description">
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-lg border border-border/40 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Base Price">
              <input
                type="number"
                value={form.base_price}
                onChange={(e) => setForm({ ...form, base_price: e.target.value })}
                className="w-full rounded-lg border border-border/40 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </Field>
            <Field label="Currency" required>
              <input
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value })}
                className="w-full rounded-lg border border-border/40 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </Field>
            <Field label="Days">
              <input
                type="number"
                value={form.days}
                onChange={(e) => setForm({ ...form, days: e.target.value })}
                className="w-full rounded-lg border border-border/40 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Status" required>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-lg border border-border/40 bg-white dark:bg-neutral-800 px-3 py-2 text-sm capitalize outline-none focus:ring-2 focus:ring-indigo-300"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Active">
              <div className="flex items-center gap-2">
                <input
                  id="pkg-active"
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="h-4 w-4 accent-indigo-600"
                />
                <label htmlFor="pkg-active" className="text-sm text-slate-700 dark:text-slate-300">
                  Is active
                </label>
              </div>
            </Field>
          </div>

          {error && (
            <div className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border/40 bg-transparent px-5 py-2 text-sm hover:bg-slate-50 dark:hover:bg-neutral-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || form.title.trim().length === 0}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Field helper                                                               */
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
        {label} {required ? <span className="text-red-500">*</span> : null}
      </div>
      {children}
    </label>
  );
}
