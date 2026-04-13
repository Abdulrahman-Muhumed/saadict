"use client";

import SectionShell from "./section-shell";
import SectionHeading from "./section-heading";
import InfoCard from "./info-card";
import StatPill from "./stat-pill";
import { LayoutTemplate, Cpu, MonitorSmartphone, Blocks } from "lucide-react";
import { useTranslations } from "next-intl";

export default function WhoWeAre() {
  const t = useTranslations("home.whoweare");

  return (
    <SectionShell>
      <SectionHeading
        eyebrow={t("heading.eyebrow")}
        title={t("heading.title")}
        desc={t("heading.description")}
      />

      <div className="grid md:grid-cols-4 gap-4 mt-12 px-3">
        <StatPill value={t("stats.founded.value")} label={t("stats.founded.label")} />
        <StatPill value={t("stats.deliveries.value")} label={t("stats.deliveries.label")} />
        <StatPill value={t("stats.products.value")} label={t("stats.products.label")} />
        <StatPill value={t("stats.market.value")} label={t("stats.market.label")} />
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8 px-3">
        <InfoCard
          icon={LayoutTemplate}
          title={t("cards.websites.title")}
          text={t("cards.websites.text")}
        />
        <InfoCard
          icon={Cpu}
          title={t("cards.systems.title")}
          text={t("cards.systems.text")}
        />
        <InfoCard
          icon={Blocks}
          title={t("cards.saas.title")}
          text={t("cards.saas.text")}
        />
        <InfoCard
          icon={MonitorSmartphone}
          title={t("cards.mobile.title")}
          text={t("cards.mobile.text")}
        />
      </div>
    </SectionShell>
  );
}