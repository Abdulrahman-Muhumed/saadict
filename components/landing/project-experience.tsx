"use client";

import SectionShell from "./section-shell";
import SectionHeading from "./section-heading";
import StatPill from "./stat-pill";
import { projects } from "@/lib/projects";
import { useTranslations } from "next-intl";

export default function ProjectExperience() {
  const t = useTranslations("home.projectExperience");

  const totalProjects = projects.length;

  const liveProjects = projects.filter(
    (p) => p.statKey === "Live" || p.statKey === "Released"
  ).length;

  const ongoingProjects = projects.filter(
    (p) => p.statKey === "In Development"
  ).length;

  const categoriesCount = new Set(projects.map((p) => p.category)).size;

  return (
    <SectionShell className="bg-slate-50/70 dark:bg-white/[0.015]">
      <SectionHeading
        eyebrow={t("heading.eyebrow")}
        title={t("heading.title")}
        desc={t("heading.description")}
      />

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-12 max-w-5xl mx-auto">
        <StatPill 
          value={`${totalProjects}+`} 
          label={t("stats.total")} 
        />
        <StatPill 
          value={`${liveProjects}+`} 
          label={t("stats.live")} 
        />
        <StatPill 
          value={`${ongoingProjects}+`} 
          label={t("stats.active")} 
        />
        <StatPill 
          value={`${categoriesCount}`} 
          label={t("stats.categories")} 
        />
      </div>
    </SectionShell>
  );
}