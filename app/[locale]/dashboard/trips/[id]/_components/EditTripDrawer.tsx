"use client";

import { useState } from "react";
import { brand } from "@/components/config/brand";
import { Loader2, X } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EditTripDrawer({
  trip,
  onClose,
}: {
  trip: any;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    title: trip.title || "",
    season: trip.season || "",
    start_date: trip.start_date || "",
    end_date: trip.end_date || "",
    status: trip.status || "draft",
  });
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);

    const payload = {
      title: form.title.trim(),
      season: form.season.trim(),
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      status: form.status,
    };

    const { error } = await supabase.from("trips").update(payload).eq("id", trip.id);

    setSaving(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }

    onClose();
  }

  const canSave =
    form.title.trim().length > 0 &&
    (!form.start_date ||
      !form.end_date ||
      new Date(form.end_date) >= new Date(form.start_date));

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l border-white/10 bg-white dark:bg-neutral-900 shadow-2xl">
        <div
          className="sticky top-0 z-10 border-b border-white/10 px-6 py-4"
          style={{
            background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.accent})`,
            color: "#fff",
          }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Edit Trip</h2>
            <button
              onClick={onClose}
              className="rounded-full bg-white/20 p-1 hover:bg-white/30"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-6 space-y-5">
          {errorMsg && (
            <div className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-700 dark:text-red-300">
              {errorMsg}
            </div>
          )}

          <Field label="Title" required>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </Field>

          <Field label="Season">
            <input
              type="text"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="e.g., Umrah 2025 / 1447H"
              value={form.season}
              onChange={(e) => setForm({ ...form, season: e.target.value })}
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Start Date">
              <input
                type="date"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                value={form.start_date || ""}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
              />
            </Field>

            <Field label="End Date">
              <input
                type="date"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                value={form.end_date || ""}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
              />
            </Field>
          </div>

          <Field label="Status" required>
            <select
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm capitalize outline-none focus:ring-2 focus:ring-indigo-200"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              required
            >
              <option value="draft">draft</option>
              <option value="active">active</option>
              <option value="archived">archived</option>
            </select>
          </Field>

          {/* Save / Cancel */}
          <div className="pt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-800 px-5 py-2 text-sm hover:bg-slate-50 dark:hover:bg-neutral-800/70"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !canSave}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------ Field Wrapper ------------------------------ */
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
        {label} {required ? <span className="text-red-600">*</span> : null}
      </div>
      {children}
    </label>
  );
}
