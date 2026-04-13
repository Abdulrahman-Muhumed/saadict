"use client";

import { motion } from "framer-motion";
import SectionShell from "./section-shell";
import SectionHeading from "./section-heading";
import { brand } from "../config/brand";
import { Activity, ArrowRight, ArrowUpRight, Cpu, Shield, Zap } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import { useTranslations } from "next-intl";

export default function SystemsShowcase() {
  const t = useTranslations("home.systemsShowcase");

  return (
    <SectionShell className="bg-slate-50/70 dark:bg-white/[0.015]">
      <SectionHeading
        eyebrow={t("heading.eyebrow")}
        title={t("heading.title")}
        desc={t("heading.description")}
      />

      <div className="grid lg:grid-cols-12 gap-6 mt-12 px-3">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 rounded-[28px] border border-slate-200 dark:border-white/10 overflow-hidden bg-white dark:bg-[#0b0d12] shadow-[0_20px_60px_-25px_rgba(15,23,42,0.35)]"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400/60" />
              <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
              <div className="w-2 h-2 rounded-full bg-green-400/60" />
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400">
              <Activity size={12} />
              {t("featured.header_mono")}
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <span
                  className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.24em]"
                  style={{
                    backgroundColor: `${brand.colors.accent}16`,
                    color: brand.colors.primary,
                  }}
                >
                  {t("featured.badge")}
                </span>

                <h3 className="mt-5 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  {t("featured.title")}
                </h3>

                <p className="mt-4 text-sm md:text-base leading-7 text-slate-600 dark:text-slate-400 max-w-xl">
                  {t("featured.description")}
                </p>
              </div>

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${brand.colors.primary}12, ${brand.colors.accent}18)`,
                }}
              >
                <Zap size={24} style={{ color: brand.colors.primary }} />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              {[
                { key: "workflow", label: t("featured.stats.workflow.label"), value: t("featured.stats.workflow.value") },
                { key: "output", label: t("featured.stats.output.label"), value: t("featured.stats.output.value") },
                { key: "useCase", label: t("featured.stats.useCase.label"), value: t("featured.stats.useCase.value") },
              ].map((stat) => (
                <div
                  key={stat.key}
                  className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-4"
                >
                  <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                    {stat.label}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="https://finance.saadict.com"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white"
                style={{ backgroundColor: brand.colors.primary }}
              >
                {t("featured.buttons.access")}
                <ArrowUpRight size={16} />
              </a>

              <Link
                href="/systems"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 px-6 py-3.5 text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/[0.04]"
              >
                {t("featured.buttons.view")}
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-5 grid gap-5">
          <div className="rounded-[26px] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Cpu size={18} style={{ color: brand.colors.primary }} />
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                {t("planned.title")}
              </h4>
            </div>
            <div className="space-y-3">
              {t.raw("planned.items").map((item: string) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] px-4 py-4 text-sm text-slate-700 dark:text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[26px] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={18} style={{ color: brand.colors.primary }} />
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                {t("direction.title")}
              </h4>
            </div>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
              {t("direction.text")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 flex flex-col items-center justify-center gap-6 px-3">
        <div className="h-[1px] w-24 bg-slate-200 dark:bg-white/10" />
        
        <Link href="/projects" className="group relative">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative z-10 flex items-center gap-4 bg-slate-900 dark:bg-white px-10 py-5 text-white dark:text-slate-900 transition-all duration-300 rounded-2xl md:rounded-none"
          >
            <span className="font-mono text-xs tracking-[0.3em] uppercase font-bold">
              {t("cta")}
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            
            <div className="hidden md:block absolute top-0 left-0 w-2 h-2 border-l border-t border-white/30 dark:border-slate-900/30" />
            <div className="hidden md:block absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/30 dark:border-slate-900/30" />
          </motion.div>

          <div 
            className="absolute inset-0 translate-x-0 translate-y-0 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300 -z-10 opacity-0 group-hover:opacity-100 rounded-2xl md:rounded-none"
            style={{ backgroundColor: brand.colors.primary }}
          />
        </Link>
      </div>
    </SectionShell>
  );
}