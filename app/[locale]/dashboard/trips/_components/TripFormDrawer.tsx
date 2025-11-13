"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const TRIP_STATUSES = ["draft", "active", "archived"];

type Props = {
  open: boolean;
  row?: any | null;
  onClose: () => void;
  onSaved: () => void;
};

export default function TripFormDrawer({ open, row, onClose, onSaved }: Props) {
  const isEdit = !!row;
  const [form, setForm] = useState({
    title: "",
    season: "",
    start_date: "",
    end_date: "",
    status: "draft",
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (row) {
      setForm({
        title: row.title || "",
        season: row.season || "",
        start_date: row.start_date || "",
        end_date: row.end_date || "",
        status: row.status || "draft",
      });
    } else {
      setForm({
        title: "",
        season: "",
        start_date: "",
        end_date: "",
        status: "draft",
      });
    }
    setErr(null);
  }, [row]);

  async function handleSave(e: any) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setErr(null);

    const payload = {
      title: form.title.trim(),
      season: form.season.trim() || null,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      status: form.status,
    };

    if (!payload.title) {
      setErr("Title is required.");
      setSaving(false);
      return;
    }
    if (
      payload.start_date &&
      payload.end_date &&
      payload.end_date < payload.start_date
    ) {
      setErr("End date must be on or after start date.");
      setSaving(false);
      return;
    }

    const table = supabase.from("trips");
    const res = isEdit
      ? await table.update(payload).eq("id", row.id)
      : await table.insert([payload]);

    if (res.error) {
      setErr(res.error.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    onClose();
    onSaved();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l border-slate-200 bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 shadow-2xl">
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 dark:bg-neutral-900/80 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {isEdit ? "Edit Trip" : "Add Trip"}
            </h3>
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-neutral-800"
            >
              Close
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="px-6 py-5 space-y-5">
          {err && (
            <div className="rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-2 text-sm text-red-700 dark:text-red-400">
              {err}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Title" required>
              <input
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </Field>

            <Field label="Season">
              <input
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g., 1447H"
                value={form.season}
                onChange={(e) => setForm({ ...form, season: e.target.value })}
              />
            </Field>

            <Field label="Start date">
              <input
                type="date"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
                value={form.start_date}
                onChange={(e) =>
                  setForm({ ...form, start_date: e.target.value })
                }
              />
            </Field>

            <Field label="End date">
              <input
                type="date"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
              />
            </Field>

            <Field label="Status" required>
              <select
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 capitalize outline-none focus:ring-2 focus:ring-indigo-200"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                {TRIP_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-5 py-2 text-sm hover:bg-slate-50 dark:hover:bg-neutral-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------- Field ---------------------------------- */
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
      <div className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-200">
        {label} {required && <span className="text-red-600">*</span>}
      </div>
      {children}
    </label>
  );
}
