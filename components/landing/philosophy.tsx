"use client";

import { motion } from "framer-motion";
import SectionShell from "./section-shell";
import { Layers3, ShieldCheck, Cpu, Sparkles, Activity, Tag } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Philosophy() {
  const t = useTranslations("home.philosophy");

  const items = [
    {
      icon: Layers3,
      title: t("items.structured.title"),
      text: t("items.structured.text"),
      code: "STR-01"
    },
    {
      icon: ShieldCheck,
      title: t("items.reliable.title"),
      text: t("items.reliable.text"),
      code: "REL-02"
    },
    {
      icon: Cpu,
      title: t("items.efficient.title"),
      text: t("items.efficient.text"),
      code: "EFF-03"
    },
    {
      icon: Sparkles,
      title: t("items.nextGen.title"),
      text: t("items.nextGen.text"),
      code: "NXG-04"
    },
  ];

  return (
    <SectionShell>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[32px] border border-slate-200 dark:border-white/10 px-6 py-16 md:px-12 md:py-24 transition-all duration-500"
      >
        {/* --- GRADIENT BACKGROUND --- */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0f9ff] via-white to-white dark:hidden" />
        <div className="absolute inset-0 hidden dark:block bg-gradient-to-br from-[#111827] via-[#030712] to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_10%,transparent_0%,rgba(0,0,0,0.03)_100%)] dark:bg-[radial-gradient(100%_100%_at_50%_10%,transparent_0%,rgba(0,0,0,0.2)_100%)]" />

        {/* --- HEADER SECTION --- */}
        <div className="relative z-10 max-w-4xl mx-auto text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-[1px] w-8 bg-[#4C8FC4]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-[#4C8FC4]">
              {t("heading.eyebrow")}
            </span>
            <span className="h-[1px] w-8 bg-[#4C8FC4]" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#24365C] dark:text-white leading-[0.95]">
            {t("heading.title")}
            <span className="block opacity-30 italic font-light">{t("heading.titleSecondary")}</span>
          </h2>

          <div className="mt-8 flex items-center justify-center gap-6">
            <div className="h-px flex-1 max-w-[100px] bg-slate-200 dark:bg-white/10" />
            <p className="text-sm md:text-base leading-relaxed text-slate-500 dark:text-slate-400 max-w-lg font-medium">
              {t("heading.description")}
            </p>
            <div className="h-px flex-1 max-w-[100px] bg-slate-200 dark:bg-white/10" />
          </div>
        </div>

        {/* --- GRID OF ITEMS --- */}
        <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-200 dark:border-white/10 max-w-7xl mx-auto">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative border-r border-b border-slate-200 dark:border-white/10 p-8 transition-all duration-500 hover:bg-white dark:hover:bg-white/[0.02]"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="p-3 bg-slate-100 dark:bg-white/5 transition-colors duration-500 group-hover:bg-[#24365C] group-hover:text-white">
                  <item.icon size={20} strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Tag size={10} className="text-[#4C8FC4]" />
                    <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-white/20">
                        {item.code}
                    </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#24365C] dark:text-white tracking-tight uppercase">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                  {item.text}
                </p>
              </div>

              <div className="mt-10 flex items-center gap-3 border-t border-slate-100 dark:border-white/[0.03] pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="relative flex items-center justify-center">
                    <Activity size={12} className="text-[#4C8FC4] relative z-10" />
                    <span className="absolute inset-0 h-full w-full rounded-full bg-[#4C8FC4] opacity-20 animate-ping" />
                </div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-white/30">
                  {t("footer")}
                </span>
              </div>

              <div className="absolute top-0 right-0 w-0 h-0 border-t-[1px] border-r-[1px] border-[#4C8FC4] opacity-0 transition-all duration-500 group-hover:w-4 group-hover:h-4 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionShell>
  );
}