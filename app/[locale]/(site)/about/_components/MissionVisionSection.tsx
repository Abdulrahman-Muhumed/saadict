"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Eye, Target, ArrowUpRight } from "lucide-react";
import { brand } from "@/components/config/brand";
import SectionShell from "@/components/landing/section-shell";
import SectionHeading from "@/components/landing/section-heading";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export default function AboutVisionMission() {
  const t = useTranslations("about.aboutVision");

  // Use raw to get the array of tags
  const missionTags = t.raw("mission.tags") as string[];

  return (
    <SectionShell className="bg-slate-50/70 dark:bg-white/[0.015]">
      <SectionHeading
        eyebrow={t("heading.eyebrow")}
        title={t("heading.title")}
        desc={t("heading.desc")}
      />

      <div className="grid lg:grid-cols-2 gap-6 mt-12">
        {/* Vision Card */}
        <motion.div
          {...fade}
          whileHover={{ y: -8 }}
          className="group relative overflow-hidden rounded-[30px] border border-slate-200 dark:border-white/10 bg-white/85 dark:bg-white/[0.03] p-7 md:p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]"
        >
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background: `linear-gradient(to right, transparent, ${brand.colors.accent}, transparent)`,
            }}
          />
          <div
            className="absolute -right-10 -top-10 w-28 h-28 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity"
            style={{ backgroundColor: `${brand.colors.accent}18` }}
          />

          <div className="flex items-start justify-between gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-white/10"
              style={{
                background: `linear-gradient(135deg, ${brand.colors.primary}12, ${brand.colors.accent}18)`,
              }}
            >
              <Eye size={28} style={{ color: brand.colors.primary }} />
            </div>

            <span
              className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{
                backgroundColor: `${brand.colors.accent}16`,
                color: brand.colors.primary,
              }}
            >
              {t("vision.label")}
            </span>
          </div>

          <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white leading-tight">
            {t("vision.title")}
          </h3>

          <p className="mt-5 text-sm md:text-base leading-8 text-slate-600 dark:text-slate-400 font-light">
            {t("vision.content")}
          </p>

          <div className="mt-8 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            <ArrowUpRight size={14} className="text-[#17a2f9]" />
            {t("vision.footer")}
          </div>
        </motion.div>

        {/* Mission Card */}
        <motion.div
          {...fade}
          whileHover={{ y: -8 }}
          className="group relative overflow-hidden rounded-[30px] border border-slate-200 dark:border-white/10 bg-slate-950 text-white p-7 md:p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)]"
        >
          {/* Industrial Background Details */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(76,143,196,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(36,54,92,0.50),transparent_42%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:38px_38px] opacity-25" />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10"
              style={{ backgroundColor: `${brand.colors.accent}18` }}
            >
              <Target size={28} style={{ color: "#DDEFFD" }} />
            </div>

            <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.22em] bg-white/10 text-slate-200">
              {t("mission.label")}
            </span>
          </div>

          <div className="relative z-10">
            <h3 className="mt-6 text-2xl font-bold text-white leading-tight">
              {t("mission.title")}
            </h3>

            <p className="mt-5 text-sm md:text-base leading-8 text-slate-300 font-light">
              {t("mission.content")}
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {missionTags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-xs font-medium text-slate-200 backdrop-blur-md group-hover:border-white/20 transition-colors"
                >
                  <div className="w-1 h-1 rounded-full bg-[#17b9f9]" />
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}