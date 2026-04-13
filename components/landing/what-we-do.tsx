"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionShell from "./section-shell";
import SectionHeading from "./section-heading";
import InfoCard from "./info-card";
import {
  LayoutTemplate,
  Cpu,
  Zap,
  MonitorSmartphone,
  ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function WhatWeDo() {
  const t = useTranslations("home.whatWeDo");

  return (
    <SectionShell>
      <SectionHeading
        eyebrow={t("heading.eyebrow")}
        title={t("heading.title")}
        desc={t("heading.description")}
      />

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-12 px-3">
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
          icon={Zap}
          title={t("cards.saas.title")}
          text={t("cards.saas.text")}
        />
        <InfoCard
          icon={MonitorSmartphone}
          title={t("cards.mobile.title")}
          text={t("cards.mobile.text")}
        />
      </div>

      {/* 2050 INDUSTRIAL BUTTON SECTION */}
      <div className="mt-10 flex flex-col items-center justify-center gap-6 px-3">
        <div className="h-[1px] w-24 bg-black/10 dark:bg-white/10" />

        <Link href="/services" className="group relative">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative z-10 flex items-center gap-4 bg-black dark:bg-white px-10 py-5 text-white dark:text-black transition-all duration-300"
          >
            <span className="font-mono text-xs tracking-[0.3em] uppercase font-bold">
              {t("cta")}
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />

            {/* Corner Accents (Industrial HUD Style) */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/30 dark:border-black/30" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/30 dark:border-black/30" />
          </motion.div>

          {/* Glitch Shadow Effect */}
          <div className="absolute inset-0 bg-blue-600 translate-x-0 translate-y-0 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300 -z-10 opacity-0 group-hover:opacity-100" />
        </Link>
        
      </div>
    </SectionShell>
  );
}