"use client";

import { motion } from "framer-motion";
import { Activity, Cpu, Box, Fingerprint, MapPin } from "lucide-react";
import { brand } from "@/components/config/brand";
import { useTranslations } from "next-intl";

export default function AboutHero() {
  const t = useTranslations("about.aboutHero");

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white dark:bg-[#080808] pt-24">
      {/* Precision Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {/* TOP SECTION: TYPOGRAPHIC LOCKUP */}
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 backdrop-blur-xl mb-8"
          >
            <Fingerprint size={14} style={{ color: brand.colors.primary }} />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-slate-500">
              {t("badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white leading-[0.85]"
          >
            {t("titleMain")} {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#24365C] to-[#4C8FC4] dark:from-slate-500 dark:to-slate-200">
              {t("titleAccent")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 max-w-2xl text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-light"
          >
            {t("description")}
          </motion.p>
        </div>

        {/* BOTTOM SECTION: ARCHITECTURAL DATA GRID */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Item 1 - Core SaaS */}
          <div className="bg-white dark:bg-[#0b0b0b] p-8 group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
            <div className="flex justify-between items-start mb-12">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5" style={{ color: brand.colors.primary }}>
                <Cpu size={24} />
              </div>
              <span className="text-[10px] font-mono text-slate-400">{t("cards.tech.label")}</span>
            </div>
            <h3 className="text-xl font-bold dark:text-white mb-2">{t("cards.tech.title")}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t("cards.tech.desc")}</p>
          </div>

          {/* Item 2 - Scalable Build */}
          <div className="bg-white dark:bg-[#0b0b0b] p-8 group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
            <div className="flex justify-between items-start mb-12">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5" style={{ color: brand.colors.accent }}>
                <Box size={24} />
              </div>
              <span className="text-[10px] font-mono text-slate-400">{t("cards.structure.label")}</span>
            </div>
            <h3 className="text-xl font-bold dark:text-white mb-2">{t("cards.structure.title")}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t("cards.structure.desc")}</p>
          </div>

          {/* Item 3 - Active Projects */}
          <div className="bg-white dark:bg-[#0b0b0b] p-8 group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
            <div className="flex justify-between items-start mb-12">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full border-4 border-white dark:border-[#0b0b0b] bg-slate-200 dark:bg-white/10 flex items-center justify-center text-xs font-bold dark:text-white">5+</div>
                <div className="w-10 h-10 rounded-full border-4 border-white dark:border-[#0b0b0b] bg-slate-200 dark:bg-white/10 flex items-center justify-center">
                  <Activity size={14} className="text-green-500 animate-pulse" />
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400">{t("cards.momentum.label")}</span>
            </div>
            <h3 className="text-xl font-bold dark:text-white mb-2">{t("cards.momentum.title")}</h3>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <MapPin size={14} style={{ color: brand.colors.primary }} />
              {t("cards.momentum.location")}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}