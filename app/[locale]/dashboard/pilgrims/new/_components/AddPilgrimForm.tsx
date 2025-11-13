"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight, Loader2, UploadCloud } from "lucide-react";
import { brand } from "@/components/config/brand";
import { createClient } from "@supabase/supabase-js";

/* -------------------------------------------------------------------------- */
/* Setup Supabase                                                             */
/* -------------------------------------------------------------------------- */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_DST_BUCKET || "pilgrims";
const YEAR = 2025;

/* -------------------------------------------------------------------------- */
/* Modern Utility Classes                                                     */
/* -------------------------------------------------------------------------- */
const CLASSES = {
  input:
    "w-full border rounded-lg py-2 px-3 text-sm transition-all outline-none focus:ring-2 focus:ring-indigo-500 bg-white/90 border-neutral-300 text-slate-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-slate-200",
  btnBase:
    "flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
  btnPrimary:
    "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed",
  btnSecondary:
    "bg-neutral-100 text-slate-700 border border-neutral-300 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 dark:border-neutral-600 dark:hover:bg-neutral-600",
  btnSuccess:
    "bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed",
};

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */
export default function AddPilgrimForm() {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    full_name: "",
    gender: "male",
    date_of_birth: "",
    phone: "",
    city: "",
    charged_amount: "",
    visa_cost: "",
    currency: "USD",
    visa_issue_status: "not_issued",
    emergency_name: "",
    emergency_phone: "",
    medical_notes: "",
    photo_file: null as File | null,
    passport_file: null as File | null,
  });

  const step1OK =
    form.full_name.trim() !== "" &&
    form.date_of_birth.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.charged_amount.trim() !== "" &&
    form.visa_cost.trim() !== "" &&
    !isNaN(Number(form.charged_amount)) &&
    !isNaN(Number(form.visa_cost));

  /* ---------------------------------------------------------------------- */
  /* Upload helper                                                          */
  /* ---------------------------------------------------------------------- */
  async function uploadForPilgrim(pilgrimId: string, file: File, slug: string) {
    const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
    const key = `pilgrims/umrah-${YEAR}/${pilgrimId}/${slug}.${ext}`;

    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(key, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type || "application/octet-stream",
      });
    if (upErr) throw upErr;

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(key);
    return data?.publicUrl ?? null;
  }

  /* ---------------------------------------------------------------------- */
  /* Form submission                                                        */
  /* ---------------------------------------------------------------------- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!step1OK) return;

    setSaving(true);
    setError(null);

    try {
      const payload = {
        full_name: form.full_name.trim(),
        gender: form.gender,
        date_of_birth: form.date_of_birth || null,
        phone: form.phone.trim(),
        city: form.city.trim() || null,
        charged_amount: Number(form.charged_amount),
        visa_cost: Number(form.visa_cost),
        currency: form.currency || "USD",
        visa_issue_status: form.visa_issue_status || "not_issued",
        emergency_name: form.emergency_name.trim() || null,
        emergency_phone: form.emergency_phone.trim() || null,
        medical_notes: form.medical_notes.trim() || null,
      };

      // Insert base pilgrim
      const { data: inserted, error: insErr } = await supabase
        .from("pilgrims")
        .insert([payload])
        .select()
        .single();
      if (insErr) throw insErr;
      const pilgrimId = inserted.id;

      // Upload optional files
      const updates: Record<string, any> = {};
      if (form.photo_file) {
        updates.photo_url = await uploadForPilgrim(
          pilgrimId,
          form.photo_file,
          "photo"
        );
      }
      if (form.passport_file) {
        updates.passport_doc_url = await uploadForPilgrim(
          pilgrimId,
          form.passport_file,
          "passport"
        );
      }
      if (Object.keys(updates).length > 0) {
        const { error: updErr } = await supabase
          .from("pilgrims")
          .update(updates)
          .eq("id", pilgrimId);
        if (updErr) throw updErr;
      }

      alert("✅ Pilgrim successfully added.");
      setForm({
        full_name: "",
        gender: "male",
        date_of_birth: "",
        phone: "",
        city: "",
        charged_amount: "",
        visa_cost: "",
        currency: "USD",
        visa_issue_status: "not_issued",
        emergency_name: "",
        emergency_phone: "",
        medical_notes: "",
        photo_file: null,
        passport_file: null,
      });
      setStep(1);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  /* ---------------------------------------------------------------------- */
  /* UI                                                                     */
  /* ---------------------------------------------------------------------- */
  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-white/10 bg-gradient-to-br text-white shadow-xl p-6 mb-8"
        style={{
          backgroundImage: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.accent})`,
        }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Add New Pilgrim</h1>
        <p className="mt-2 text-sm text-white/80">
          Register a new pilgrim profile, visa details, and travel information.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-xl border border-neutral-200/50 bg-white dark:bg-neutral-900 shadow-xl p-6 md:p-8 space-y-8"
      >
        <Stepper step={step} />

        {/* Validation message */}
        {error && (
          <div className="p-3 text-sm bg-red-100 border border-red-300 text-red-800 rounded-md">
            {error}
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Field label="Full Name" required>
              <input
                className={CLASSES.input}
                value={form.full_name}
                onChange={(e) =>
                  setForm({ ...form, full_name: e.target.value })
                }
                required
              />
            </Field>

            <Field label="Gender">
              <select
                className={`${CLASSES.input} appearance-none`}
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </Field>

            <Field label="Date of Birth" required>
              <input
                type="date"
                className={CLASSES.input}
                value={form.date_of_birth}
                onChange={(e) =>
                  setForm({ ...form, date_of_birth: e.target.value })
                }
                required
              />
            </Field>

            <Field label="Phone" required>
              <input
                className={CLASSES.input}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </Field>

            <Field label="City (optional)">
              <input
                className={CLASSES.input}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </Field>

            <Field label="Charged Amount" required>
              <input
                type="number"
                min="0"
                className={CLASSES.input}
                value={form.charged_amount}
                onChange={(e) =>
                  setForm({ ...form, charged_amount: e.target.value })
                }
                required
              />
            </Field>

            <Field label="Visa Cost" required>
              <input
                type="number"
                min="0"
                className={CLASSES.input}
                value={form.visa_cost}
                onChange={(e) =>
                  setForm({ ...form, visa_cost: e.target.value })
                }
                required
              />
            </Field>

            <Field label="Currency">
              <select
                className={`${CLASSES.input} appearance-none`}
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value })}
              >
                <option value="USD">USD</option>
                <option value="SAR">SAR</option>
                <option value="AED">AED</option>
                <option value="EUR">EUR</option>
              </select>
            </Field>

            <Field label="Visa Issue Status">
              <select
                className={`${CLASSES.input} capitalize appearance-none`}
                value={form.visa_issue_status}
                onChange={(e) =>
                  setForm({ ...form, visa_issue_status: e.target.value })
                }
              >
                <option value="not_issued">Not Issued</option>
                <option value="issued">Issued</option>
              </select>
            </Field>

            <div className="md:col-span-2 rounded-lg border border-emerald-400/50 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-300 font-medium">
              💰 Profit Preview:{" "}
              <b>
                {Number(form.charged_amount || 0) -
                  Number(form.visa_cost || 0)}{" "}
                {form.currency}
              </b>
            </div>
          </motion.div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <UploadBox
              label="Profile Photo"
              file={form.photo_file}
              onFile={(file) => setForm({ ...form, photo_file: file })}
              hint="JPG / PNG / WEBP"
            />
            <UploadBox
              label="Passport Document"
              file={form.passport_file}
              onFile={(file) => setForm({ ...form, passport_file: file })}
              hint="Image or PDF"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Emergency Contact Name">
                <input
                  className={CLASSES.input}
                  value={form.emergency_name}
                  onChange={(e) =>
                    setForm({ ...form, emergency_name: e.target.value })
                  }
                />
              </Field>
              <Field label="Emergency Contact Phone">
                <input
                  className={CLASSES.input}
                  value={form.emergency_phone}
                  onChange={(e) =>
                    setForm({ ...form, emergency_phone: e.target.value })
                  }
                />
              </Field>
            </div>

            <Field label="Medical Notes">
              <textarea
                rows={4}
                className={CLASSES.input}
                value={form.medical_notes}
                onChange={(e) =>
                  setForm({ ...form, medical_notes: e.target.value })
                }
              />
            </Field>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className={`${CLASSES.btnBase} ${CLASSES.btnSecondary}`}
              >
                Back
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`${CLASSES.btnBase} ${CLASSES.btnSecondary}`}
            >
              Cancel
            </button>

            {step === 1 ? (
              <button
                type="button"
                disabled={!step1OK}
                onClick={() => step1OK && setStep(2)}
                className={`${CLASSES.btnBase} ${CLASSES.btnPrimary}`}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={saving}
                className={`${CLASSES.btnBase} ${CLASSES.btnSuccess}`}
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                Save Pilgrim
              </button>
            )}
          </div>
        </div>
      </motion.form>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Reusable Subcomponents                                                     */
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
      <div className="mb-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label} {required && <span className="text-red-500">*</span>}
      </div>
      {children}
    </label>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      <StepDot active={step === 1} title="Basic Info" />
      <div className="flex-1 h-px max-w-20 bg-neutral-300 dark:bg-neutral-700" />
      <StepDot active={step === 2} title="Uploads & Extras" />
    </div>
  );
}

function StepDot({ active, title }: { active: boolean; title: string }) {
  return (
    <div
      className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide ${
        active
          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
          : "bg-neutral-100 text-slate-700 border border-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 dark:border-neutral-600"
      }`}
    >
      {title}
    </div>
  );
}

function UploadBox({
  label,
  file,
  onFile,
  hint,
}: {
  label: string;
  file: File | null;
  onFile: (f: File | null) => void;
  hint: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return setPreview(null);
    if (file.type.startsWith("image/")) {
      const fr = new FileReader();
      fr.onload = () => setPreview(fr.result as string);
      fr.readAsDataURL(file);
    } else setPreview(null);
  }, [file]);

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 p-5 shadow-sm">
      <div className="mb-3 text-base font-semibold text-slate-800 dark:text-slate-200">
        {label}
      </div>
      <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-neutral-400 dark:border-neutral-600 rounded-lg p-8 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 cursor-pointer transition">
        <UploadCloud className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {file ? file.name : "Click to upload file"}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-500">
          ({hint}) - Max 5MB
        </div>
        <input
          type="file"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0] || null)}
        />
      </label>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-4 h-48 w-full object-cover rounded-lg border border-neutral-300 dark:border-neutral-700"
        />
      )}
    </div>
  );
}
