// /components/service-request/ServiceRequestHero.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { brand } from "@/components/config/brand";
import {
  serviceRequestSteps,
  requestedServices,
} from "@/lib/ServiceRequest/serviceRequestSteps";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function ServiceRequestHero() {
  const t = useTranslations("serviceRequest.hero");
  const primaryColor = brand?.colors?.primary || "#f97316";

  const metrics = [
    {
      label: t("metrics.protocolSteps"),
      value: serviceRequestSteps.length,
    },
    {
      label: t("metrics.serviceModules"),
      value: requestedServices.length,
    },
    {
      label: t("metrics.estimateEngine"),
      value: t("metrics.active"),
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-slate-200 pt-32 pb-16 dark:border-white/[0.05]">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-8 text-center">
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50/50 px-3 py-1 dark:border-white/10 dark:bg-white/[0.02]">
            <div
              className="h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ backgroundColor: primaryColor }}
            />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {t("badge")}
            </span>
          </div>

          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 dark:text-white md:text-6xl">
            {t("title")}{" "}
            <span style={{ color: primaryColor }}>{t("titleAccent")}</span>
            {t("titleEnd")}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg">
            {t("description")}
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-8 border-t border-slate-100 pt-12 dark:border-white/[0.05] md:gap-16">
            {metrics.map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <span className="font-mono text-3xl font-light tracking-tighter text-slate-900 dark:text-white">
                  {typeof item.value === "number"
                    ? String(item.value).padStart(2, "0")
                    : item.value}
                </span>
                <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}