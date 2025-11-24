"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Upload } from "lucide-react";

export default function PilgrimForm({
  initial,
  onSave,
  onCancel,
  saveLabel = "Save",
  confirmLabel = "Confirm",
  requireFile = false,
}: {
  initial: any;
  onSave: (payload: any) => void;
  onCancel: () => void;
  saveLabel?: string;
  confirmLabel?: string;
  requireFile?: boolean;
}) {
  const [form, setForm] = useState(initial);
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave({ ...form, passportFile });
    setSaving(false);
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Full Name
        </label>
        <input
          type="text"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          required
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
      </div>

      {/* Passport Number */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Passport Number
        </label>
        <input
          type="text"
          value={form.passport_number || ""}
          onChange={(e) => setForm({ ...form, passport_number: e.target.value })}
          required
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Phone Number
        </label>
        <input
          type="text"
          value={form.phone_number || ""}
          onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
      </div>

      {/* Payment */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Paid
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={form.paid}
            onChange={(e) => setForm({ ...form, paid: Number(e.target.value) })}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Total
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={form.total}
            onChange={(e) => setForm({ ...form, total: Number(e.target.value) })}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>
      </div>

      {/* Passport File */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Passport Scan {requireFile && <span className="text-red-500">*</span>}
        </label>
        <div className="flex items-center gap-3 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-neutral-900 px-3 py-3">
          <Upload className="h-4 w-4 text-slate-500" />
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setPassportFile(e.target.files?.[0] || null)}
            required={requireFile}
            className="text-xs text-slate-600 dark:text-slate-400"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-800 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 transition"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saveLabel}
        </button>
      </div>
    </motion.form>
  );
}
