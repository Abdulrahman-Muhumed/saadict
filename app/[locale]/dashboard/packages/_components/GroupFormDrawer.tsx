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


export default function GroupFormDrawer({ row, onClose, onSaved }: Props) {
  const [form, setForm] = useState({
    start_date: row?.start_date || "",
    end_date: row?.end_date || "",
    city_from: row?.city_from || "",
    price_override: row?.price_override || "",
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
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      city_from: form.city_from.trim(),
      price_override:
        form.price_override === "" ? null : Number(form.price_override),
      status: form.status || "draft",
    };

    if (payload.start_date && payload.end_date && payload.end_date < payload.start_date) {
      setError("End date must be on or after start date.");
      setSaving(false);
      return;
    }

    const query = row
      ? supabase.from("group_packages").update(payload).eq("id", row.id)
      : supabase.from("group_packages").insert([payload]);

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
            {row ? "Edit Group" : "Add Group"}
          </h3>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1 rounded-lg border border-border/40 bg-transparent px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-neutral-800"
          >
            <X className="h-4 w-4" /> Close
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Start Date" required>
              <input
                type="date"
                value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                className="w-full rounded-lg border border-border/40 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </Field>
            <Field label="End Date" required>
              <input
                type="date"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                className="w-full rounded-lg border border-border/40 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </Field>
          </div>

          <Field label="City From" required>
            <input
              value={form.city_from}
              onChange={(e) => setForm({ ...form, city_from: e.target.value })}
              className="w-full rounded-lg border border-border/40 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </Field>

          <Field label="Price Override">
            <input
              type="number"
              value={form.price_override}
              onChange={(e) => setForm({ ...form, price_override: e.target.value })}
              className="w-full rounded-lg border border-border/40 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </Field>

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
              disabled={saving}
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
