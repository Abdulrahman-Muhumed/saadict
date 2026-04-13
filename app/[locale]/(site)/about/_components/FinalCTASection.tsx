"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Mail, Layers3 } from "lucide-react";
import { brand } from "@/components/config/brand";
import SectionShell from "@/components/landing/section-shell";
import { Link } from "@/lib/i18n/navigation";

export default function AboutCta() {
  const t = useTranslations("about.aboutCta");

  return (
    <SectionShell className="!pt-8 !pb-28">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="relative overflow-hidden rounded-[36px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b0d12] shadow-[0_30px_90px_-35px_rgba(15,23,42,0.28)]"
      >
        <div className="relative z-10 grid lg:grid-cols-12 gap-8 p-8 md:p-10 lg:p-12 items-center">

          {/* Left Content Area */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.05]"
                style={{
                  boxShadow: `0 0 0 10px ${brand.colors.accent}08`,
                }}
              >
                <Layers3 size={24} style={{ color: brand.colors.primary }} />
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-slate-400 font-mono">
                  {t("badge.name")}
                </div>
                <div className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {t("badge.tagline")}
                </div>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.03] text-slate-900 dark:text-white uppercase">
              {t("title")}
              <span className="block font-light opacity-70 italic">{t("subtitle")}</span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm md:text-base leading-8 text-slate-600 dark:text-slate-400 font-light">
              {t("desc")}
            </p>

            <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-3xl">
              {t.raw("services").map((item: string) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] px-4 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300 backdrop-blur-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right Action Chamber */}
          <div className="lg:col-span-4">
            <div className="rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.04] p-6 md:p-8 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${brand.colors.primary}12, ${brand.colors.accent}18)`,
                  }}
                >
                  <Mail size={20} style={{ color: brand.colors.primary }} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 font-mono">
                    {t("action.eyebrow")}
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {t("action.title")}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/service-request"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-95"
                  style={{ backgroundColor: brand.colors.primary }}
                >
                  {t("action.primaryBtn")}
                  <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 px-5 py-4 text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all"
                >
                  {t("action.secondaryBtn")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}