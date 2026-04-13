"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Layers3,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Gauge,
  Waypoints,
  Activity,
  ChevronRight,
  Code2,
  Database,
  Users,
} from "lucide-react";
import SectionShell from "@/components/landing/section-shell";
import SectionHeading from "@/components/landing/section-heading";
import { brand } from "@/components/config/brand";

const principlesList = [
  { key: "structure", icon: Layers3 },
  { key: "quality", icon: Sparkles },
  { key: "reliability", icon: ShieldCheck },
  { key: "usability", icon: CheckCircle2 },
  { key: "performance", icon: Gauge },
  { key: "growth", icon: Waypoints },
  { key: "data", icon: Database },
  { key: "context", icon: Users },
];

export default function AboutPrinciples() {
  const t = useTranslations("about.aboutPrinciples");
  const overviewItems = t.raw("hero.overviewItems") as string[];

  return (
    <SectionShell className="bg-white dark:bg-[#050505] py-24">
      <SectionHeading
        eyebrow={t("heading.eyebrow")}
        title={t("heading.title")}
        desc={t("heading.desc")}
      />

      <div className="mt-20 grid grid-cols-1 lg:grid-cols-4 gap-4 px-3">
        {/* HERO SECTION CARD */}
        <div className="lg:col-span-4 relative overflow-hidden rounded-[28px] border border-slate-200 dark:border-white/5 bg-slate-50/80 dark:bg-white/[0.02] p-8 lg:p-12">
          <div className="absolute inset-0 opacity-[0.35] pointer-events-none bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />

          <div className="relative z-10 grid lg:grid-cols-[1.3fr_0.9fr] gap-10 items-start">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div
                  className="h-px w-10"
                  style={{ backgroundColor: brand.colors.primary }}
                />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.35em]"
                  style={{ color: brand.colors.primary }}
                >
                  {t("hero.eyebrow")}
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl lg:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white leading-[0.95]">
                  {t("hero.titlePart1")}
                  <br />
                  <span className="text-slate-500 dark:text-slate-400">
                    {t("hero.titlePart2")}
                  </span>
                </h3>

                <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-light">
                  {t("hero.content")}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-white/70 dark:bg-black/20 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  {t("hero.overviewLabel")}
                </p>
                <Activity size={12} className="text-green-500" />
              </div>

              <div className="space-y-3">
                {overviewItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] px-4 py-3 group hover:border-slate-300 dark:hover:border-white/10 transition-colors"
                  >
                    <ChevronRight
                      size={14}
                      style={{ color: brand.colors.primary }}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PRINCIPLE NODES */}
        {principlesList.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.45 }}
            className="group relative rounded-[24px] border border-slate-200 dark:border-white/5 bg-white dark:bg-[#080808] p-8 lg:p-9 hover:bg-slate-50 dark:hover:bg-[#0c0c0c] hover:border-slate-300 dark:hover:border-white/10 transition-all duration-500 flex flex-col justify-between overflow-hidden"
          >
            <div
              className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ backgroundColor: brand.colors.primary }}
            />

            <div>
              <div className="flex justify-between items-start mb-10">
                <div
                  className="text-[9px] font-mono tracking-[0.2em] border-l pl-3"
                  style={{
                    color: brand.colors.primary,
                    borderColor: brand.colors.primary,
                  }}
                >
                  STND_{String(index + 1).padStart(2, "0")}
                </div>

                <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] group-hover:scale-110 transition-transform">
                  <item.icon
                    size={18}
                    strokeWidth={1.75}
                    className="text-slate-400 group-hover:text-[#241c72] dark:group-hover:text-[#4C8FC4] transition-colors"
                  />
                </div>
              </div>

              <h4 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-4 group-hover:translate-x-1 transition-transform uppercase">
                {t(`items.${item.key}.title`)}
              </h4>

              <p className="text-sm leading-7 text-slate-600 dark:text-slate-400 font-light">
                {t(`items.${item.key}.text`)}
              </p>
            </div>

            <div className="mt-12">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-1 h-1 bg-slate-200 dark:bg-white/10"
                    />
                  ))}
                </div>
                <span className="text-[8px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                  System Standard
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-black/40 px-3 py-2 flex items-center justify-between border border-slate-100 dark:border-white/5 rounded-xl group-hover:border-[#241c72]/20 dark:group-hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2">
                  <Code2 size={10} className="text-slate-400" />
                  <span className="text-[9px] font-mono font-black text-slate-500 dark:text-slate-600 tracking-tighter">
                    {t(`items.${item.key}.code`)}
                  </span>
                </div>
                <Activity size={10} className="text-green-500 opacity-30 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}