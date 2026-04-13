"use client";

import SectionShell from "./section-shell";
import SectionHeading from "./section-heading";
import InfoCard from "./info-card";
import { Sparkles, ShieldCheck, Globe2, Layers3 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ValueProposition() {
  const t = useTranslations("home.valueProposition");

  return (
    <SectionShell className="bg-slate-50/70 dark:bg-white/[0.015]">
      <SectionHeading
        eyebrow={t("heading.eyebrow")}
        title={t("heading.title")}
        desc={t("heading.description")}
      />

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-12 px-3">
        <InfoCard
          icon={Sparkles}
          title={t("cards.modern.title")}
          text={t("cards.modern.text")}
        />
        <InfoCard
          icon={Layers3}
          title={t("cards.scalable.title")}
          text={t("cards.scalable.text")}
        />
        <InfoCard
          icon={ShieldCheck}
          title={t("cards.reliable.title")}
          text={t("cards.reliable.text")}
        />
        <InfoCard
          icon={Globe2}
          title={t("cards.competitive.title")}
          text={t("cards.competitive.text")}
        />
      </div>
    </SectionShell>
  );
}