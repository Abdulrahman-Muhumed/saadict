"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Activity,
  Globe2,
  Smartphone,
  FolderKanban,
  ArrowUpRight,
  Layers3,
} from "lucide-react";
import { brand } from "@/components/config/brand";
import SectionShell from "@/components/landing/section-shell";
import SectionHeading from "@/components/landing/section-heading";
import { projects } from "@/lib/projects";

export default function AboutProjectPresence() {
  const t = useTranslations("about.aboutProjectPresence");

  const projectStats = useMemo(() => {
    const totalProjects = projects.length;

    const activeProjects = projects.filter(
      (project) => project.statKey === "In Development" || project.statKey === "Internal"
    ).length;

    const websiteProjects = projects.filter((project) => {
      const category = project.category?.toLowerCase() || "";
      return (
        category.includes("website") ||
        category.includes("portal") ||
        category.includes("platform")
      );
    }).length;

    const mobileProjects = projects.filter((project) => {
      const title = project.website?.toLowerCase() || "";
      return (
        title.includes("#")
      );
    }).length;

    return {
      totalProjects,
      websiteProjects,
      activeProjects,
      mobileProjects,
    };
  }, []);

  const metrics = [
    {
      key: "total",
      icon: FolderKanban,
      value: String(projectStats.totalProjects),
    },
    {
      key: "web",
      icon: Globe2,
      value: String(projectStats.websiteProjects),
    },
    {
      key: "active",
      icon: Layers3,
      value: String(projectStats.activeProjects),
    },
    {
      key: "app",
      icon: Smartphone,
      value: String(projectStats.mobileProjects),
    },
  ];

  return (
    <SectionShell>
      <SectionHeading
        eyebrow={t("heading.eyebrow")}
        title={t("heading.title")}
        desc={t("heading.desc")}
      />

      <div className="grid lg:grid-cols-12 gap-6 mt-12">
        {/* LEFT PANEL - Terminal Aesthetic */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-5 rounded-[30px] border border-slate-200 dark:border-white/10 overflow-hidden bg-white dark:bg-[#0b0d12] shadow-[0_20px_60px_-25px_rgba(15,23,42,0.35)]"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400/60" />
              <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
              <div className="w-2 h-2 rounded-full bg-green-400/60" />
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.24em] text-slate-400">
              <Activity size={12} />
              {t("hero.terminalLabel")}
            </div>
          </div>

          <div className="p-6 md:p-7">
            <span
              className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{
                backgroundColor: `${brand.colors.accent}16`,
                color: brand.colors.primary,
              }}
            >
              {t("hero.tag")}
            </span>

            <h3 className="mt-5 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-[1.08]">
              {t("hero.title")}
              <span className="block text-slate-600 dark:text-slate-300 font-light">
                {t("hero.subtitle")}
              </span>
            </h3>

            <p className="mt-5 text-sm md:text-base leading-8 text-slate-600 dark:text-slate-400 font-light">
              {t("hero.description")}
            </p>
          </div>
        </motion.div>

        {/* RIGHT METRICS GRID */}
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
          {metrics.map((item, index) => (
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

              <div className="flex items-start justify-between gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-white/10"
                  style={{
                    background: `linear-gradient(135deg, ${brand.colors.primary}12, ${brand.colors.accent}18)`,
                  }}
                >
                  <item.icon size={24} style={{ color: brand.colors.primary }} />
                </div>

                <ArrowUpRight
                  size={18}
                  className="text-slate-300 group-hover:text-[#02565c] transition-all"
                />
              </div>

              <div className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {item.value}
              </div>

              <div className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-tight">
                {t(`metrics.${item.key}.label`)}
              </div>

              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 font-light">
                {t(`metrics.${item.key}.text`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}