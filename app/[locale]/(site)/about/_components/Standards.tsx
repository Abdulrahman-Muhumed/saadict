"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  LayoutTemplate,
  Gauge,
  FileCheck2,
  Layers3,
  Workflow,
} from "lucide-react";
import { brand } from "@/components/config/brand";
import SectionShell from "@/components/landing/section-shell";
import SectionHeading from "@/components/landing/section-heading";

const standardItems = [
  { icon: LayoutTemplate, key: "ux" },
  { icon: ShieldCheck, key: "security" },
  { icon: Layers3, key: "architecture" },
  { icon: Workflow, key: "workflow" },
  { icon: Gauge, key: "performance" },
  { icon: FileCheck2, key: "delivery" },
];

export default function AboutStandards() {
  const t = useTranslations("about.aboutStandards");

  return (
    <SectionShell>
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow={t("heading.eyebrow")}
          title={t("heading.title")}
          desc={t("heading.desc")}
        />

        <div className="mt-14 relative">
          {/* Vertical center rail */}
          <div className="absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-300 dark:via-white/10 to-transparent" />

          <div className="space-y-6">
            {standardItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.04 }}
                className="relative pl-16"
              >
                {/* Node / Icon container */}
                <div
                  className="absolute left-0 top-4 w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] shadow-[0_20px_60px_-30px_rgba(15,23,42,0.18)] z-10 backdrop-blur-sm"
                >
                  <item.icon size={22} style={{ color: brand.colors.primary }} />
                </div>

                {/* Content card */}
                <div className="grid md:grid-cols-[220px_1fr] gap-4 items-start rounded-[26px] border border-slate-200 dark:border-white/10 bg-white/85 dark:bg-white/[0.03] p-5 md:p-6 transition-all hover:bg-white/95 dark:hover:bg-white/[0.05]">
                  <div>
                    <div
                      className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.22em] font-mono"
                      style={{
                        backgroundColor: `${brand.colors.accent}16`,
                        color: brand.colors.accent,
                      }}
                    >
                      {t("labelPrefix")} {String(index + 1).padStart(2, "0")}
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white uppercase tracking-tight">
                      {t(`items.${item.key}.title`)}
                    </h3>
                  </div>

                  <p className="text-sm md:text-base leading-8 text-slate-600 dark:text-slate-400 font-light">
                    {t(`items.${item.key}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}