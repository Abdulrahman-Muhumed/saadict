"use client";

import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STAR_OPTIONS = [1, 2, 3, 4, 5];

export default function HotelForm({
  open,
  onClose,
  onSave,
  editing,
  saving,
  form,
  setForm,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  editing?: any | null;
  saving: boolean;
  form: any;
  setForm: (f: any) => void;
}) {
  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 pointer-events-auto"
            onClick={onClose}
          />

          {/* Slide-over */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="ml-auto h-full w-full max-w-xl pointer-events-auto z-10 bg-white dark:bg-neutral-950 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {editing ? "Edit Hotel" : "Add Hotel"}
                </h3>
                <button
                  onClick={onClose}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-neutral-900 transition"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Body */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSave(form);
              }}
              className="flex-1 overflow-y-auto px-6 py-5 space-y-5"
            >
              <Field label="Name" required>
                <input
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                />
              </Field>

              <Field label="City" required>
                <input
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800"
                  placeholder="e.g., Makkah, Madinah, Jeddah"
                  value={form.city}
                  onChange={(e) =>
                    setForm({ ...form, city: e.target.value })
                  }
                  required
                />
              </Field>

              <Field label="Address">
                <input
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Capacity">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800"
                    value={form.capacity}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        capacity:
                          e.target.value === ""
                            ? ""
                            : Number(e.target.value),
                      })
                    }
                  />
                </Field>

                <Field label="Stars (1–5)">
                  <select
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800"
                    value={form.stars}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        stars:
                          e.target.value === ""
                            ? ""
                            : Number(e.target.value),
                      })
                    }
                  >
                    <option value="">—</option>
                    {STAR_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 px-5 py-2 text-sm hover:bg-slate-50 dark:hover:bg-neutral-900 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 disabled:opacity-60"
                >
                  {saving && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------- Field helper -------------------------- */
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
        {label}{" "}
        {required && <span className="text-red-600">*</span>}
      </div>
      {children}
    </label>
  );
}
