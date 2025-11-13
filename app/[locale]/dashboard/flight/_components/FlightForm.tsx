"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function FlightForm({
  open,
  onClose,
  onSave,
  editing,
  form,
  setForm,
  saving,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (form: any) => void;
  editing?: any | null;
  form: any;
  setForm: (f: any) => void;
  saving: boolean;
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
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-black/40 pointer-events-auto"
            onClick={onClose}
          />

          {/* Slide-over Panel */}
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
                  {editing ? "Edit Flight" : "Add Flight"}
                </h3>
                <button
                  onClick={onClose}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-neutral-900 transition"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSave(form);
              }}
              className="flex-1 overflow-y-auto px-6 py-5 space-y-5"
            >
              <Field label="Airline" required>
                <input
                  value={form.airline}
                  onChange={(e) => setForm({ ...form, airline: e.target.value })}
                  placeholder="e.g., Saudia"
                  required
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Flight Number" required>
                  <input
                    className="w-full rounded-lg border px-3 py-2 font-mono uppercase"
                    value={form.flight_number}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        flight_number: e.target.value.toUpperCase(),
                      })
                    }
                    required
                  />
                </Field>

                <Field label="Alt. Flight Number">
                  <input
                    className="w-full rounded-lg border px-3 py-2 font-mono uppercase"
                    value={form.flight_number2}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        flight_number2: e.target.value.toUpperCase(),
                      })
                    }
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Departure Airport" required>
                  <input
                    className="w-full rounded-lg border px-3 py-2 font-mono uppercase"
                    value={form.departure_airport}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        departure_airport: e.target.value.toUpperCase(),
                      })
                    }
                    required
                  />
                </Field>

                <Field label="Arrival Airport" required>
                  <input
                    className="w-full rounded-lg border px-3 py-2 font-mono uppercase"
                    value={form.arrival_airport}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        arrival_airport: e.target.value.toUpperCase(),
                      })
                    }
                    required
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Departure Time" required>
                  <input
                    type="datetime-local"
                    className="w-full rounded-lg border px-3 py-2"
                    value={form.departure_time}
                    onChange={(e) =>
                      setForm({ ...form, departure_time: e.target.value })
                    }
                    required
                  />
                </Field>

                <Field label="Arrival Time" required>
                  <input
                    type="datetime-local"
                    className="w-full rounded-lg border px-3 py-2"
                    value={form.arrival_time}
                    onChange={(e) =>
                      setForm({ ...form, arrival_time: e.target.value })
                    }
                    required
                  />
                </Field>
              </div>

              {/* Footer */}
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
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
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

/* ------------------------------ Helper ------------------------------ */
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
