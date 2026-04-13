"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionShell from "./section-shell";
import SectionHeading from "./section-heading";
import { MapPin, Briefcase, ShieldCheck } from "lucide-react";
import { testimonials } from "@/lib/testimonials";
import { useTranslations } from "next-intl";

export default function ClientTestimonials() {
  const t = useTranslations("home.testimonials");

  return (
    <SectionShell className="bg-white dark:bg-[#020408]">
      <SectionHeading
        eyebrow={t("heading.eyebrow")}
        title={t("heading.title")}
        desc={t("heading.description")}
      />

      <div className="grid md:grid-cols-3 gap-8 mt-20 px-3">
        {testimonials.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.8 }}
            className="group relative flex flex-col h-full p-0 transition-all duration-500"
          >
            {/* 1. The Structural Spine */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-slate-200 dark:bg-white/10 group-hover:bg-[#4C8FC4] transition-colors duration-500" />

            {/* 2. Metadata Header */}
            <div className="pl-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#4C8FC4] animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-white/20">
                  {item.id}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-[#4C8FC4] opacity-50" />
                <span className="text-[9px] font-mono text-slate-300 uppercase">
                  {t("labels.verified")}
                </span>
              </div>
            </div>

            {/* 3. The Quote */}
            <div className="pl-6 flex-grow">
              <div className="relative">
                <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-300 font-medium italic">
                  {`"`}{t(item.quoteKey)}{`"`}
                </p>
              </div>
            </div>

            {/* 4. The Identity Block */}
            <div className="pl-6 mt-10 space-y-6">
              <div>
                <h4 className="text-base font-bold text-[#24365C] dark:text-white tracking-tight uppercase">
                  {item.company}
                </h4>
                <p className="text-[10px] font-bold text-[#4C8FC4] uppercase tracking-widest mt-1">
                  {t(item.nameKey)} , {t(item.roleKey)}
                </p>
              </div>

              {/* 5. Project Specs (System Tags) */}
              <div className="flex flex-col gap-2 pt-4 border-t border-slate-100 dark:border-white/[0.03]">
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                  <MapPin size={12} strokeWidth={2.5} className="text-slate-300" />
                  <span className="uppercase">{item.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                  <Briefcase size={12} strokeWidth={2.5} className="text-slate-300" />
                  <span className="uppercase">{t(item.projectKey)}</span>
                </div>
              </div>
            </div>

            {/* Interactive Progress Line (Bottom) */}
            <div className="ml-6 mt-6 h-[2px] w-8 bg-slate-100 dark:bg-white/5 transition-all duration-500 group-hover:w-full group-hover:bg-[#4C8FC4]" />

            {/* Background Reveal on Hover */}
            <div className="absolute inset-0 -z-10 bg-slate-50/50 dark:bg-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-r-xl" />
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}