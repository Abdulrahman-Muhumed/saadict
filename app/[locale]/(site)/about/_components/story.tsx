"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { brand } from "@/components/config/brand";
import {
  ScanSearch,
  TriangleAlert,
  Sparkles,
  Activity,
  Layers,
  Database,
  Binary,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import SectionShell from "@/components/landing/section-shell";
import SectionHeading from "@/components/landing/section-heading";

const storyPoints = [
  { icon: TriangleAlert, step: "01", key: "step01" },
  { icon: ScanSearch, step: "02", key: "step02" },
  { icon: Sparkles, step: "03", key: "step03" },
];

export default function AboutStory() {
  const t = useTranslations("about.aboutStory");

  return (
    <SectionShell className="relative py-24 lg:py-32 bg-white dark:bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(36,28,114,0.06),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(76,143,196,0.06),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(76,143,196,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.03),transparent_28%)]" />

      {/* Top Narrative */}
      <div className="relative max-w-6xl mx-auto mb-20 lg:mb-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          <SectionHeading
            eyebrow={t("heading.eyebrow")}
            title={t("heading.title")}
            desc={t("heading.desc")}
          />

          <div className="grid lg:grid-cols-[1.3fr_0.9fr] gap-8 lg:gap-12 items-start pt-2">
            <div className="space-y-5">
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                {t("narrative.para1")}
              </p>
              <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                {t("narrative.para2")}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.03] p-6 md:p-7 shadow-[0_10px_30px_rgba(2,6,23,0.04)] dark:shadow-none backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#241c72]/10"
                >
                  <Cpu size={18} className="text-[#241c72] dark:text-[#4C8FC4]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                    {t("sidebar.eyebrow")}
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {t("sidebar.title")}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <InfoRow
                  icon={<Layers size={14} />}
                  label={t("sidebar.platforms.label")}
                  value={t("sidebar.platforms.value")}
                />
                <InfoRow
                  icon={<Database size={14} />}
                  label={t("sidebar.approach.label")}
                  value={t("sidebar.approach.value")}
                />
                <InfoRow
                  icon={<ShieldCheck size={14} />}
                  label={t("sidebar.standard.label")}
                  value={t("sidebar.standard.value")}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Story Cards */}
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {storyPoints.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.12, duration: 0.65, ease: "easeOut" }}
              className="group relative rounded-[28px] border border-slate-200 dark:border-white/5 bg-white dark:bg-[#080808] p-8 lg:p-10 hover:border-[#241c72]/20 dark:hover:border-[#4C8FC4]/20 hover:shadow-[0_20px_50px_-24px_rgba(36,28,114,0.12)] transition-all duration-500 overflow-hidden"
            >
              {/* Header */}
              <div className="relative flex justify-between items-start mb-10">
                <div className="text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-[#241c72]/20 bg-[#241c72]/5 text-[#241c72] dark:text-[#4C8FC4] dark:border-[#4C8FC4]/20">
                  {item.step}
                </div>
                <Binary size={16} className="text-slate-300 dark:text-white/10 group-hover:text-[#4C8FC4]/40 transition-colors" />
              </div>

              {/* Icon + Title */}
              <div className="relative space-y-5 mb-7">
                <div className="w-14 h-14 rounded-2xl border border-[#241c72]/10 bg-[#241c72]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <item.icon size={22} className="text-[#241c72] dark:text-[#4C8FC4]" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {t(`points.${item.key}.label`)}
                </h3>
              </div>

              {/* Description */}
              <p className="relative text-sm leading-7 text-slate-600 dark:text-slate-400 mb-10 min-h-[140px] font-light">
                {t(`points.${item.key}.description`)}
              </p>

              {/* Technical Footer */}
              <div className="relative pt-6 border-t border-slate-100 dark:border-white/5 flex items-center gap-2.5">
                <Activity size={13} className="text-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-[0.18em]">
                  {t(`points.${item.key}.technical`)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 text-[#241c72] dark:text-[#4C8FC4] opacity-70">{icon}</div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 font-light leading-snug">
          {value}
        </p>
      </div>
    </div>
  );
}