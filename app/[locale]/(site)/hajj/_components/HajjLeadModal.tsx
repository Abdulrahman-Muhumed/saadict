"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import Field from "./Field";

const PRIMARY = "#241c72";
const ACCENT = "#F99417";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function HajjLeadModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("hajj.form");
  const t2 = useTranslations("hajj.modal");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [countryCode, setCountryCode] = useState("+252");
  const [errors, setErrors] = useState("");
  const [sending, setSending] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);

  function validate() {
    if (!fullName.trim()) return setErrors(t("errors.name")), false;
    if (!passportFile) return setErrors(t("errors.passport_file")), false;
    if (!/^[0-9]{7,15}$/.test(phone)) return setErrors(t("errors.phone")), false;
    setErrors("");
    return true;
  }

  async function doSubmit() {
    setSending(true);
    try {
      const key = `hajj-2026/${Date.now()}-${passportFile!.name}`;
      const { error: upErr } = await supabase.storage
        .from("pilgrims")
        .upload(key, passportFile!);
      if (upErr) throw upErr;
      const { error: dbErr } = await supabase.from("hajj_users").insert({
        full_name: fullName,
        phone_number: `${countryCode}${phone}`,
        passport_file_key: key,
        status: "pending",
      });
      if (dbErr) throw dbErr;
      setSuccessOpen(true);
      onClose();
      setFullName("");
      setPhone("");
      setPassportFile(null);
    } catch (e: any) {
      setErrors(e.message || "Submission failed.");
    } finally {
      setSending(false);
      setConfirmOpen(false);
    }
  }

  return (
    <>
      {/* Form Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="main"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.97, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 10 }}
              className="w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden"
            >
              <div
                className="px-6 py-4 text-white"
                style={{
                  background: `linear-gradient(90deg, ${ACCENT}, ${PRIMARY})`,
                }}
              >
                <h3 className="text-base font-semibold">{t("sheetTitle")}</h3>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (validate()) setConfirmOpen(true);
                }}
                className="px-6 py-6 space-y-3"
              >
                <Field label={t("fullName")}>
                  <input
                    className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 px-3 py-2 bg-transparent"
                    placeholder={t("fullNamePh")}
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    required
                  />
                </Field>

                <Field label={t("upload")}>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) =>
                      setPassportFile(e.target.files?.[0] || null)
                    }
                    className="block w-full text-sm text-gray-700 dark:text-gray-300"
                  />
                </Field>

                <Field label={t("phone")}>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="rounded-xl border border-gray-300 dark:border-neutral-700 px-3 py-2"
                    >
                      <option value="+252">+252 (Somalia)</option>
                      <option value="+254">+254 (Kenya)</option>
                      <option value="+966">+966 (Saudi Arabia)</option>
                    </select>
                    <input
                      type="tel"
                      className="flex-1 rounded-xl border border-gray-300 dark:border-neutral-700 px-3 py-2"
                      placeholder={t("phonePh")}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </Field>

                {errors && (
                  <p className="text-xs text-red-600 dark:text-red-400">
                    {errors}
                  </p>
                )}

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    {t("cancel")}
                  </button>
                  <button
                    type="submit"
                    disabled={sending}
                    className="rounded-xl px-4 py-2 text-sm font-semibold text-white"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    {t("send")}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm + Success overlays */}
      <AnimatePresence>
        {confirmOpen && (
          <ConfirmDialog
            sending={sending}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={doSubmit}
            t2={t2}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {successOpen && (
          <SuccessDialog onClose={() => setSuccessOpen(false)} t2={t2} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Subcomponents ---------- */
function ConfirmDialog({
  sending,
  onCancel,
  onConfirm,
  t2,
}: any) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 p-6 text-center shadow-2xl"
        initial={{ scale: 0.97 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.97 }}
      >
        <div
          className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: `${PRIMARY}15` }}
        >
          <CheckCircle2 className="h-7 w-7" style={{ color: ACCENT }} />
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white">
          {t2("title")}
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {t2("desc")}
        </p>

        <div className="mt-5 flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="rounded-full px-5 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            {t2("cancel")}
          </button>
          <button
            onClick={onConfirm}
            disabled={sending}
            className="rounded-full px-5 py-2 text-sm font-semibold text-white"
            style={{
              background: `linear-gradient(135deg, ${ACCENT}, ${PRIMARY})`,
            }}
          >
            {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />}
            {t2("send")}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SuccessDialog({ onClose, t2 }: any) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 p-6 text-center shadow-2xl"
        initial={{ scale: 0.97 }}
        animate={{ scale: 1 }}
      >
        <CheckCircle2 className="mx-auto mb-3 h-8 w-8" style={{ color: ACCENT }} />
        <h3 className="font-semibold text-slate-900 dark:text-white">
          {t2("sent_title")}
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {t2("sent_msg")}
        </p>
        <button
          onClick={onClose}
          className="mt-5 inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-white"
          style={{
            background: `linear-gradient(135deg, ${ACCENT}, ${PRIMARY})`,
          }}
        >
          {t2("sent_close")}
        </button>
      </motion.div>
    </motion.div>
  );
}
