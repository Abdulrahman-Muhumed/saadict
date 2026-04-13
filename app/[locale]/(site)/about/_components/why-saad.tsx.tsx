"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Sparkles,
  ShieldCheck,
  Waypoints,
  Layers3,
  MonitorSmartphone,
  BadgeCheck,
  Cpu,
  ArrowUpRight,
  Database,
  Binary,
  GitBranch,
  ShieldAlert,
  Terminal,
  Server,
  KeyRound,
  Zap,
  Activity,
} from "lucide-react";
import SectionShell from "@/components/landing/section-shell";
import SectionHeading from "@/components/landing/section-heading";

const whyItems = [
  { key: "design", icon: Sparkles, specIcon: Server },
  { key: "security", icon: ShieldCheck, specIcon: KeyRound },
  { key: "systems", icon: Waypoints, specIcon: GitBranch },
  { key: "ux", icon: MonitorSmartphone, specIcon: Zap },
  { key: "scale", icon: Layers3, specIcon: Database },
  { key: "delivery", icon: BadgeCheck, specIcon: ShieldAlert },
  { key: "architecture", icon: Cpu, specIcon: Terminal },
  { key: "data", icon: Database, specIcon: Binary },
];

export default function AboutWhySaad() {
  const t = useTranslations("about.aboutWhy");

  return (
    <SectionShell className="bg-white dark:bg-[#050505] py-24">
      <SectionHeading
        eyebrow={t("heading.eyebrow")}
        title={t("heading.title")}
        desc={t("heading.desc")}
      />

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-slate-100 dark:border-white/5 bg-slate-100 dark:bg-white/5 overflow-hidden">
        
        {/* BRAND STATEMENT CARD */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="md:col-span-2 lg:col-span-1 bg-white dark:bg-[#080808] p-12 lg:p-16 flex flex-col justify-between h-full group"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#241c72]/10 dark:border-[#4C8FC4]/20 bg-[#241c72]/5 dark:bg-[#4C8FC4]/5 mb-10">
              <Cpu size={12} className="text-[#241c72] dark:text-[#4C8FC4]" />
              <span className="text-[9px] font-black tracking-widest text-[#241c72] dark:text-[#4C8FC4] uppercase">
                {t("brandCard.eyebrow")}
              </span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white leading-none mb-8">
              {t("brandCard.title1")} <br />
              <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-500">
                {t("brandCard.title2")}
              </span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-sm font-light">
              {t("brandCard.content")}
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-3">
            <div className="text-[9px] font-mono font-bold text-slate-400 dark:text-white/20 uppercase tracking-[0.4em]">
              {t("brandCard.statusLabel")}
            </div>
            <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
              <Binary size={12} className="text-slate-300 dark:text-[#4C8FC4]" />
              <span className="text-[10px] font-mono font-black text-slate-300">
                {t("brandCard.statusValue")}
              </span>
            </div>
          </div>
        </motion.div>

        {/* TECHNICAL ADVANTAGE NODES */}
        {whyItems.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-white dark:bg-[#050505] p-10 lg:p-12 hover:bg-slate-50 dark:hover:bg-[#0c0c0c] transition-all duration-500 flex flex-col h-full overflow-hidden"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-[9px] font-mono text-slate-300 dark:text-slate-600 tracking-[0.2em]">
                {t(`items.${item.key}.tag`)}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-white/10 group-hover:bg-[#4C8FC4] animate-pulse transition-colors" />
            </div>

            <div className="mb-6 space-y-4">
              <div className="w-10 h-10 flex items-center justify-center text-slate-400 group-hover:text-slate-900 dark:group-hover:text-[#4C8FC4] transition-colors">
                <item.icon size={26} strokeWidth={1.25} />
              </div>
              <h4 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:translate-x-1 transition-transform uppercase">
                {t(`items.${item.key}.title`)}
              </h4>
            </div>

            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 flex-1 min-h-[120px] font-light">
              {t(`items.${item.key}.text`)}
            </p>

            <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/5 space-y-5">
              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 flex items-center justify-center text-slate-300 dark:text-white/10 group-hover:text-[#4C8FC4] transition-colors">
                    <item.specIcon size={18} strokeWidth={1} />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {t(`items.${item.key}.spec`)}
                  </span>
                </div>
                <ArrowUpRight
                  size={12}
                  className="opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all text-[#F99417]"
                />
              </div>

              <div className="flex justify-between items-center bg-slate-50 dark:bg-black/20 p-3 text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] font-mono">
                <span>{t(`items.${item.key}.data`)}</span>
                <Activity size={10} className="text-green-500 animate-pulse opacity-40" />
              </div>
            </div>

            {/* Surgical Underline */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#241c72] dark:bg-[#4C8FC4] group-hover:w-full transition-all duration-700 ease-in-out" />
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}