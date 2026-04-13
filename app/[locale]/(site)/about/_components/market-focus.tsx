"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Globe2,
  Building2,
  BriefcaseBusiness,
  Rocket,
  Landmark,
  Orbit,
} from "lucide-react";
import { brand } from "@/components/config/brand";
import SectionShell from "@/components/landing/section-shell";
import SectionHeading from "@/components/landing/section-heading";

const marketItems = [
  { key: "sme", icon: Building2 },
  { key: "startups", icon: Rocket },
  { key: "custom", icon: BriefcaseBusiness },
  { key: "service", icon: Landmark },
];

export default function AboutMarketFocus() {
  const t = useTranslations("about.aboutMarket");

  const geoStats = [
    [t("geoPanel.stats.primary.label"), t("geoPanel.stats.primary.value")],
    [t("geoPanel.stats.reach.label"), t("geoPanel.stats.reach.value")],
    [t("geoPanel.stats.type.label"), t("geoPanel.stats.type.value")],
    [t("geoPanel.stats.model.label"), t("geoPanel.stats.model.value")],
  ];

  return (
    <SectionShell className="bg-slate-50/70 dark:bg-white/[0.015]">
      <SectionHeading
        eyebrow={t("heading.eyebrow")}
        title={t("heading.title")}
        desc={t("heading.desc")}
      />

      <div className="grid xl:grid-cols-12 gap-6 mt-12 items-start">
        {/* Left map-style panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="xl:col-span-5"
        >
          <div className="relative overflow-hidden rounded-[30px] border border-slate-200 dark:border-white/10 bg-slate-950 text-white p-7 md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(76,143,196,0.16),transparent_35%),radial-gradient(circle_at_top_left,rgba(36,54,92,0.52),transparent_45%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:36px_36px] opacity-25" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10"
                  style={{ backgroundColor: `${brand.colors.accent}18` }}
                >
                  <Globe2 size={28} style={{ color: "#DDEFFD" }} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.24em] text-slate-400">
                    {t("geoPanel.eyebrow")}
                  </div>
                  <div className="mt-1 text-lg font-semibold text-white">
                    {t("geoPanel.title")}
                  </div>
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold leading-[1.08]">
                {t("geoPanel.subtitle")}
                <span className="block text-slate-300 font-light">{t("geoPanel.subtitleAccent")}</span>
              </h3>

              <p className="mt-5 text-sm md:text-base leading-8 text-slate-300 font-light">
                {t("geoPanel.description")}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {geoStats.map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm"
                  >
                    <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                      {label}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white">
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 text-[11px] text-slate-400 font-mono uppercase tracking-wider">
                <Orbit size={14} className="text-[#F99417]" />
                {t("geoPanel.footer")}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right market cards */}
        <div className="xl:col-span-7 grid sm:grid-cols-2 gap-5">
          {marketItems.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.05, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[26px] border border-slate-200 dark:border-white/10 bg-white/85 dark:bg-white/[0.03] p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.22)]"
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(to right, transparent, ${brand.colors.accent}, transparent)`,
                }}
              />
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-white/10 mb-5 group-hover:scale-110 transition-transform"
                style={{
                  background: `linear-gradient(135deg, ${brand.colors.primary}12, ${brand.colors.accent}18)`,
                }}
              >
                <item.icon size={24} style={{ color: brand.colors.primary }} />
              </div>

              <h3 className="text-lg font-semibold text-slate-900 dark:text-white uppercase tracking-tight">
                {t(`markets.${item.key}.title`)}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 font-light">
                {t(`markets.${item.key}.text`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}