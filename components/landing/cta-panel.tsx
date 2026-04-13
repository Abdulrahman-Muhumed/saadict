"use client";

import { ArrowUpRight, Terminal, Globe } from "lucide-react";
import { motion } from "framer-motion";
import SectionShell from "./section-shell";
import { Link } from "@/lib/i18n/navigation";
import { useTranslations } from "next-intl";

export default function CtaPanel() {
  const t = useTranslations("home.ctaPanel");

  const brand = {
    colors: {
      primary: "#24365C",
      accent: "#4C8FC4",
    },
  };

  return (
    <SectionShell className="!pt-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        className="relative overflow-hidden rounded-sm border border-slate-200 dark:border-white/10 px-6 py-16 md:px-10 md:py-24"
      >
        {/* Structural Corner Accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#4C8FC4]/40" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#4C8FC4]/40" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Metadata Label */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Terminal size={14} className="text-[#4C8FC4]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-[#4C8FC4]">
              {t("metadata")}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#24365C] dark:text-white leading-[0.95]">
            {t("title")} <br className="hidden md:block" />
            <span className="opacity-40 italic font-light">{t("titleItalic")}</span>
          </h2>

          <p className="mt-8 text-sm md:text-base leading-relaxed text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium">
            {t("description")}
          </p>

          {/* High-Precision Button Actions */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-0 border border-slate-200 dark:border-white/10 w-fit mx-auto overflow-hidden rounded-sm">
            <Link
              href="/service-request"
              className="group flex items-center justify-center gap-3 px-10 py-5 text-[11px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:gap-5"
              style={{ backgroundColor: brand.colors.primary }}
            >
              {t("buttons.request")}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>

            <Link
              href="/systems"
              className="group flex items-center justify-center gap-3 bg-slate-50 dark:bg-white/[0.03] px-10 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-900 dark:text-white transition-all duration-300 hover:bg-slate-100 dark:hover:bg-white/10 border-l border-slate-200 dark:border-white/10"
            >
              <Globe size={14} className="text-[#4C8FC4]" />
              {t("buttons.explore")}
            </Link>
          </div>

          {/* Functional Footer Readout */}
          <div className="mt-12 flex items-center justify-center gap-8 opacity-40">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest dark:text-white">
                {t("footer.brand")}
              </span>
            </div>
            <div className="h-px w-8 bg-slate-300 dark:bg-white/20" />
            <div className="text-[9px] font-mono font-bold uppercase tracking-widest dark:text-white">
              {t("footer.service")}
            </div>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}