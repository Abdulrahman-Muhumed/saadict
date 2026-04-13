"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Quote, ArrowRight } from "lucide-react";
import { brand } from "@/components/config/brand";
import SectionShell from "@/components/landing/section-shell";

export default function AboutFounderNote() {
  const t = useTranslations("about.aboutFounderNote");

  return (
    <SectionShell className="bg-slate-50/70 dark:bg-white/[0.015]">
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left rail */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-4"
        >
          <div className="lg:sticky lg:top-28">
            <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-slate-400">
              {t("rail.eyebrow")}
            </div>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.05]">
              {t("rail.title")}
            </h2>

            <div
              className="mt-6 h-[2px] w-24 rounded-full"
              style={{
                background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.accent})`,
              }}
            />
          </div>
        </motion.div>

        {/* Right editorial block */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="lg:col-span-8"
        >
          <div className="grid md:grid-cols-[120px_1fr] gap-6 items-start">
            {/* visual quote block */}
            <div className="hidden md:flex justify-center">
              <div
                className="w-24 h-24 rounded-[28px] flex items-center justify-center border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] shadow-[0_20px_60px_-30px_rgba(15,23,42,0.2)]"
              >
                <Quote size={30} style={{ color: brand.colors.primary }} />
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-white/[0.03] p-7 md:p-9 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.24)]">
              <p className="text-base md:text-xl leading-9 text-slate-800 dark:text-slate-200 font-medium">
                {t("editorial.lead")}
              </p>

              <p className="mt-6 text-sm md:text-base leading-8 text-slate-600 dark:text-slate-400 font-light">
                {t("editorial.paragraph1")}
              </p>

              <p className="mt-6 text-sm md:text-base leading-8 text-slate-600 dark:text-slate-400 font-light italic opacity-90">
                {t("editorial.paragraph2")}
              </p>

              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="text-md font-semibold text-slate-900 dark:text-white uppercase tracking-tight">
                    {t("editorial.signature.title")}
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-500">
                  {t("editorial.signature.tagline")}
                  <ArrowRight size={14} className="text-[#F99417]" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}