"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionShell from "./section-shell";
import SectionHeading from "./section-heading";
import { Globe2, Building2, BriefcaseBusiness, ArrowUpRight } from "lucide-react";
import { brand } from "../config/brand";
import { useTranslations } from "next-intl";

export default function MarketFocus() {
  const t = useTranslations("home.marketFocus");

  const marketData = [
    {
      icon: Building2,
      title: t("cards.smes.title"),
      text: t("cards.smes.text"),
      id: "01",
    },
    {
      icon: BriefcaseBusiness,
      title: t("cards.startups.title"),
      text: t("cards.startups.text"),
      id: "02",
    },
    {
      icon: Globe2,
      title: t("cards.regional.title"),
      text: t("cards.regional.text"),
      id: "03",
    },
  ];

  return (
    <SectionShell>
      <SectionHeading
        eyebrow={t("heading.eyebrow")}
        title={t("heading.title")}
        desc={t("heading.description")}
      />

      <div className="grid md:grid-cols-3 gap-6 mt-16 px-3">
        {marketData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
            className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#0a0c10] p-8 transition-all duration-500 hover:border-slate-400 dark:hover:border-white/20"
          >
            {/* Background Technical Grid (Visible on Hover) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none"
              style={{ backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`, backgroundSize: '16px 16px' }}
            />

            {/* Top Bar / Metadata */}
            <div className="flex justify-between items-start mb-10">
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                  style={{ backgroundColor: `${brand.colors.primary}10` }}
                >
                  <item.icon size={22} className="text-slate-900 dark:text-white transition-colors duration-500" />
                </div>
                {/* Decorative corner accent */}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-slate-300 dark:border-white/20" />
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-white/20 tracking-widest">
                {item.id}
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                {item.text}
              </p>
            </div>

            {/* Interactive Footer Reveal */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/[0.03] flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-slate-400">
                {t("footer")}
              </span>
              <ArrowUpRight size={14} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>

            {/* Subtle bottom line animate */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-slate-900 dark:bg-white transition-all duration-700 group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}