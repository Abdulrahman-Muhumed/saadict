"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Mail, Phone, MapPin, Send, Terminal, Activity,
  Globe, Clock, ShieldCheck, CheckCircle2, XCircle, RefreshCcw
} from "lucide-react";
import { brand } from "@/components/config/brand";

const ACCENT_ORANGE = "#4C8FC4";
const PrimaryColor = brand.colors.primary || "#24365C";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [timestamp, setTimestamp] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: t("form.typeOptions.systems"), // Default value
    message: ""
  });

  useEffect(() => {
    setTimestamp(new Date().toISOString());
    const interval = setInterval(() => setTimestamp(new Date().toISOString()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  }

  return (
    <main className="bg-white dark:bg-[#050505] transition-colors duration-500 pt-24 overflow-hidden relative">

      {/* SUCCESS/FAILURE MODAL */}
      <AnimatePresence>
        {status !== "idle" && status !== "loading" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 p-8 rounded-3xl max-w-xl w-full shadow-2xl text-center"
            >
              {status === "success" ? (
                <>
                  <CheckCircle2 size={60} className="mx-auto mb-4 text-green-500" />
                  <h3 className="text-2xl font-bold text-[#24365C] dark:text-white mb-2 uppercase">{t("modal.successTitle") || "Transmitted"}</h3>
                  <p className="text-slate-500 text-sm mb-8">{t("modal.successDesc") || "Message received by our central systems."}</p>
                </>
              ) : (
                <>
                  <XCircle size={60} className="mx-auto mb-4 text-red-500" />
                  <h3 className="text-2xl font-bold text-[#24365C] dark:text-white mb-2 uppercase">{t("modal.errorTitle") || "Error"}</h3>
                  <p className="text-slate-500 text-sm mb-8">{t("modal.errorDesc") || "Connection failed. Please verify and retry."}</p>
                </>
              )}

              <button
                onClick={() => window.location.reload()}
                className="w-full flex items-center justify-center gap-3 py-4 bg-[#24365C] text-white rounded-xl font-mono font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                <RefreshCcw size={14} />
                {t("modal.action") || "Return to Terminal"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-white/5">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,#24365C_1px,transparent_1px),linear-gradient(to_bottom,#24365C_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-16">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur px-4 py-2 mb-8">
                <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: ACCENT_ORANGE }} />
                <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-slate-500 dark:text-slate-300 font-mono">
                  {t("hero.badge")}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#24365C] dark:text-white leading-[1.1] uppercase">
                {t("hero.title")} <br />
                <span className="font-thin italic opacity-40 capitalize">{t("hero.titleItalic")}</span>
              </h1>

              <p className="mt-8 max-w-xl text-slate-500 dark:text-slate-400 text-lg font-light leading-relaxed border-l-2 pl-8" style={{ borderColor: `${ACCENT_ORANGE}40` }}>
                {t("hero.description")}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{t("quickActions.label")}</span>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#4C8FC4] font-bold">
                  <Activity size={12} className="animate-pulse" />
                  {timestamp.slice(11, 19)}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <ContactMiniCard icon={Phone} label={t("quickActions.voice")} value={brand?.social?.phoneNumber || "+252 ..."} />
                <ContactMiniCard icon={Mail} label={t("quickActions.email")} value={brand?.social?.email || "office@saadict.com"} />
                <ContactMiniCard icon={MapPin} label={t("quickActions.office")} value={brand?.social?.location || "Hargeisa, SL"} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INTERFACE GRID */}
      <section className="max-w-7xl mx-auto my-20 grid lg:grid-cols-12 gap-0 overflow-hidden rounded-3xl border border-slate-200 dark:border-white/5">

        {/* TRANSMISSION FORM */}
        <div className="lg:col-span-7 p-10 md:p-14 bg-[#f8fafc] dark:bg-[#0a0a0a] border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-white/5">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-sm font-bold text-[#24365C] dark:text-white flex items-center gap-3 uppercase tracking-widest font-mono">
              <Terminal size={18} style={{ color: ACCENT_ORANGE }} />
              {t("form.terminal")}
            </h2>
          </div>

          <form onSubmit={submitForm} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <InputGroup label={t("form.name")} name="name" value={formData.name} onChange={handleChange} placeholder={t("form.namePlaceholder")} required />
              <InputGroup label={t("form.email")} name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t("form.emailPlaceholder")} required />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <InputGroup label={t("form.company")} name="company" value={formData.company} onChange={handleChange} placeholder={t("form.companyPlaceholder")} />
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">{t("form.type")}</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 text-[11px] font-bold uppercase tracking-wider outline-none focus:border-[#4C8FC4] transition-colors text-slate-600 dark:text-slate-300 appearance-none"
                >
                  <option value={t("form.typeOptions.systems")}>{t("form.typeOptions.systems")}</option>
                  <option value={t("form.typeOptions.identity")}>{t("form.typeOptions.identity")}</option>
                  <option value={t("form.typeOptions.infrastructure")}>{t("form.typeOptions.infrastructure")}</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">{t("form.message")}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 text-sm outline-none focus:border-[#4C8FC4] transition-colors resize-none text-[#24365C] dark:text-white placeholder:opacity-20"
                placeholder={t("form.messagePlaceholder")}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="group relative flex items-center gap-6 px-10 py-5 bg-[#24365C] dark:bg-white text-white dark:text-black font-mono font-black text-xs uppercase tracking-[0.3em] transition-all overflow-hidden disabled:opacity-50"
            >
              <div className="absolute top-0 left-0 h-full w-[4px]" style={{ backgroundColor: ACCENT_ORANGE }} />
              {status === "loading" ? t("form.loading") : t("form.submit")}
              <Send size={14} className="transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
            </button>
          </form>
        </div>

        {/* METRICS & MAP COLUMN */}
        <div className="lg:col-span-5 flex flex-col bg-slate-50 dark:bg-[#080808]">
          <div className="h-[300px] relative overflow-hidden border-b border-slate-200 dark:border-white/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125740.0!2d44.0!3d9.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1634af60517871f3%3A0x6a19550e5611158!2sHargeisa!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              className="absolute inset-0 w-full h-full grayscale invert dark:invert-0 opacity-80"
              style={{ border: 0 }}
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 bg-[#24365C] p-3 border-l-2 flex items-center gap-3" style={{ borderColor: PrimaryColor }}>
              <Globe size={14} className="text-white animate-spin-slow" />
              <span className="text-[9px] font-mono text-white font-bold uppercase tracking-widest">{t("operational.node")}</span>
            </div>
          </div>

          <div className="p-10 space-y-10">
            <div className="pt-4 border-t border-slate-200 dark:border-white/5">
              <div className="flex items-center gap-2 mb-6">
                <Clock size={14} style={{ color: PrimaryColor }} />
                <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">{t("operational.label")}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                  <p className="text-[9px] font-mono text-slate-400 mb-1 font-bold uppercase">{t("operational.weekdays")}</p>
                  <p className="text-xs font-bold text-[#24365C] dark:text-white">08:00 - 18:00</p>
                </div>
                <div className="p-4 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                  <p className="text-[9px] font-mono text-slate-400 mb-1 font-bold uppercase">{t("operational.friday")}</p>
                  <p className="text-xs font-bold uppercase" style={{ color: PrimaryColor }}>{t("operational.supportOnly")}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 bg-[#24365C]/[0.03] dark:bg-white/[0.01] border border-[#24365C]/10 dark:border-white/5">
              <ShieldCheck size={20} style={{ color: PrimaryColor }} className="shrink-0" />
              <p className="text-[10px] font-mono leading-tight text-slate-400 uppercase tracking-tighter font-bold">
                {t("operational.security")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InputGroup({ label, ...props }: any) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 group-focus-within:text-[#4C8FC4] transition-colors">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 p-4 text-sm outline-none focus:border-[#4C8FC4] focus:ring-1 focus:ring-[#4C8FC4]/20 transition-all text-[#24365C] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium"
      />
    </div>
  );
}

function ContactMiniCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-5 p-4 border border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-white/[0.02] rounded-2xl group hover:border-[#4C8FC4]/30 transition-all">
      <div className="p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover:bg-[#4C8FC4]/10 transition-colors">
        <Icon size={16} style={{ color: "#4C8FC4" }} />
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-bold text-[#24365C] dark:text-white truncate">{value}</p>
      </div>
    </div>
  );
}