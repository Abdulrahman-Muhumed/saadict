"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  CalendarDays,
  MapPin,
  BriefcaseBusiness,
  Globe2,
  Layers3,
  Rocket,
  ArrowUpRight,
} from "lucide-react";
import SectionShell from "@/components/landing/section-shell";
import SectionHeading from "@/components/landing/section-heading";

const snapshotItems = [
  { icon: CalendarDays, key: "founded" },
  { icon: MapPin, key: "headquarters" },
  { icon: BriefcaseBusiness, key: "focus" },
  { icon: Globe2, key: "market" },
  { icon: Layers3, key: "model" },
  { icon: Rocket, key: "stage" },
];

export default function AboutIntroGrid() {
  const t = useTranslations("about.aboutIntro");

  return (
    <SectionShell className="bg-white dark:bg-[#050505]">
      <SectionHeading
        eyebrow={t("heading.eyebrow")}
        title={t("heading.title")}
        desc={t("heading.desc")}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 mt-16 border-t border-l border-slate-100 dark:border-white/5">
        {snapshotItems.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group relative p-10 border-r border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-all duration-500"
          >
            {/* Status Indicator Dot */}
            <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">
                System_Check
              </span>
              <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
            </div>

            {/* Icon Box */}
            <div className="relative mb-8">
              <div className="w-10 h-10 flex items-center justify-center text-slate-400 group-hover:text-[#241c72] dark:group-hover:text-[#4C8FC4] transition-colors duration-300">
                <item.icon size={28} strokeWidth={1.5} />
              </div>
            </div>

            {/* Translated Content */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                  {t(`items.${item.key}.title`)}
                </span>
              </div>

              <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:tracking-wide transition-all duration-500">
                {t(`items.${item.key}.value`)}
              </div>

              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-[260px] pt-2">
                {t(`items.${item.key}.text`)}
              </p>
            </div>

            {/* Progress Underline Accent */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#241c72] dark:bg-[#4C8FC4] group-hover:w-full transition-all duration-700 ease-in-out" />

            {/* Corner Detail */}
            <ArrowUpRight
              size={14}
              className="absolute bottom-10 right-10 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-20 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-slate-900 dark:text-white"
            />
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}