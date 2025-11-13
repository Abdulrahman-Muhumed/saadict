"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { brand } from "@/components/config/brand";

const PRIMARY = brand.colors.primary;
const ACCENT = brand.colors.accent;

export default function ContactPage() {
  const t = useTranslations("contact");
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
    bot_field: "",
  });
  const [state, setState] = useState({ loading: false, ok: false, error: "" });
  const onChange = (e: any) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const accentGradient = useMemo(
    () => `linear-gradient(135deg, ${ACCENT}, ${PRIMARY})`,
    []
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (values.bot_field) return;
    if (!values.name || !values.email || !values.message) {
      setState({
        loading: false,
        ok: false,
        error: t("errors.required"),
      });
      return;
    }
    try {
      setState({ loading: true, ok: false, error: "" });
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to send message.");
      setValues({ name: "", email: "", message: "", bot_field: "" });
      setState({ loading: false, ok: true, error: "" });
    } catch (err: any) {
      setState({
        loading: false,
        ok: false,
        error: err.message || "Something went wrong.",
      });
    }
  }

  const inputClass =
    "w-full rounded-xl border border-indigo-100/70 bg-white/90 dark:bg-neutral-900/80 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-gray-400 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-200/40 dark:focus:ring-indigo-800/40 transition";

  return (
    <section className="relative mt-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h1
            className="text-4xl font-extrabold tracking-tight"
            style={{
              background: accentGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("title")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            {t("intro")}
          </p>
        </motion.div>

        {/* GRID: IMAGE + FORM */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid overflow-hidden rounded-3xl border border-indigo-100/70 bg-white/5 shadow-xl md:grid-cols-2 mb-20"
        >
          {/* LEFT */}
          <div className="relative min-h-[340px]">
            <Image
              src="/about/hg_about2.png"
              alt="Contact Hoggaan"
              fill
              priority
              className="object-fit opacity-80"
            />
            <div className="absolute inset-0 flex items-end p-8 md:p-10">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-white shadow-2xl backdrop-blur-lg">
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-2xl font-extrabold leading-tight"
                >
                  {t("side.title")}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="mt-2 text-white/90 text-sm md:text-base"
                >
                  {t("side.subtitle")}
                </motion.p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-lg p-6 sm:p-8 md:p-10">
            <form onSubmit={onSubmit} className="grid gap-5">
              <input
                type="text"
                name="bot_field"
                value={values.bot_field}
                onChange={onChange}
                className="hidden"
              />

              <h3
                className="text-2xl font-extrabold tracking-tight"
                style={{ color: PRIMARY }}
              >
                {t("form.title")}
              </h3>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-indigo-950 dark:text-indigo-100">
                    {t("form.name")}
                  </label>
                  <input
                    name="name"
                    value={values.name}
                    onChange={onChange}
                    placeholder={t("form.placeholders.name")}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-indigo-950 dark:text-indigo-100">
                    {t("form.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={onChange}
                    placeholder={t("form.placeholders.email")}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-indigo-950 dark:text-indigo-100">
                  {t("form.message")}
                </label>
                <textarea
                  name="message"
                  value={values.message}
                  onChange={onChange}
                  placeholder={t("form.placeholders.message")}
                  rows={6}
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* STATE */}
              {state.ok && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-900/20 px-4 py-3 text-sm text-green-800 dark:text-green-300"
                >
                  {t("form.success")}
                </motion.div>
              )}
              {state.error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-rose-200 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-800 dark:text-rose-300"
                >
                  {state.error}
                </motion.div>
              )}

              {/* SUBMIT */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                disabled={state.loading}
                type="submit"
                className="relative mt-2 inline-flex w-full items-center justify-center rounded-2xl px-6 py-3 font-semibold text-white shadow-lg transition disabled:opacity-70"
                style={{
                  background: accentGradient,
                  boxShadow:
                    "0 12px 36px -18px rgba(36,28,114,0.45), 0 10px 28px -14px rgba(249,148,23,0.35)",
                }}
              >
                {state.loading ? t("form.sending") : t("form.cta")}
              </motion.button>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t("form.disclaimer")}
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
