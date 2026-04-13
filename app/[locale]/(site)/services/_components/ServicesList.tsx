"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/services";
import { Activity, LayoutGrid, Code2 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ServicesIndustrial() {
  const t = useTranslations("services.servicesList");

  return (
    <section className="relative w-full max-w-7xl mx-auto py-24 overflow-hidden transition-colors duration-500">
      <div className="px-3 relative z-10">

        {/* HEADER: INDUSTRIAL TELEMETRY */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8 text-center md:text-left">
          <div className="max-w-3xl flex flex-col items-center md:items-start">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-[2px] w-12 bg-black dark:bg-white hidden md:block" />
              <p className="text-[9px] font-black uppercase tracking-[0.8em] text-[#24365C] dark:text-[#4C8FC4]">
                {t('header.subtitle')}
              </p>
              <span className="h-[2px] w-12 bg-black dark:bg-white hidden md:block" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-[-0.04em] text-[#24365C] dark:text-white leading-none uppercase">
              {t('header.titleMain')} <br />
              <span className="opacity-30 italic dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-white/60 dark:to-white/10">
                {t('header.titleSub')}
              </span>
            </h2>
          </div>

          <div className="hidden md:block border-l border-[#24365C]/10 dark:border-white/10 pl-8 pb-2">
            <div className="flex items-center gap-3 mb-2 text-[#24365C]">
              <Activity size={14} className="animate-pulse" />
            </div>
            <p className="text-[#24365C]/60 dark:text-white/40 text-[11px] font-mono leading-relaxed max-w-[200px]">
              {t('header.status')}
            </p>
          </div>
        </div>

        {/* THE "HARDWARE" LIST */}
        <div className="grid gap-10 grid-cols-1">
          {services.map((service, index) => {
            const Icon = service.icon;
            const key = `items.${service.translationKey}`;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative grid lg:grid-cols-[1.5fr_1.5fr_300px] bg-slate-50 dark:bg-[#080808] hover:bg-white dark:hover:bg-[#0a0a0a] transition-all duration-500 overflow-hidden border border-[#24365C]/5 dark:border-white/5 shadow-sm dark:shadow-none"
              >
                {/* 01. CONTENT PANEL */}
                <div className="p-8 lg:p-12 border-r border-[#24365C]/5 dark:border-white/5 relative">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] dark:opacity-5 group-hover:opacity-10 transition-opacity">
                    <Icon size={140} strokeWidth={1} className="text-[#24365C] dark:text-white" />
                  </div>

                  <span className="text-[10px] font-mono text-[#4C8FC4] font-bold uppercase tracking-widest block mb-6">
                    {t('labels.servicePrefix')} 0{index + 1}
                  </span>

                  <h3 className="text-3xl font-bold text-[#24365C] dark:text-white mb-6 group-hover:translate-x-2 transition-transform duration-500">
                    {t(`${key}.title`)}
                  </h3>

                  <p className="text-slate-600 dark:text-white/50 text-sm leading-relaxed max-w-md">
                    {t(`${key}.description`)}
                  </p>
                </div>

                {/* 02. MICRO-CARD CAPABILITIES */}
                <div className="p-8 lg:p-10 border-r border-[#24365C]/5 dark:border-white/5 bg-slate-100/30 dark:bg-white/[0.01]">
                  <div className="grid grid-cols-2 gap-3">
                    {t.raw(`${key}.capabilities`).map((cap: string, i: number) => (
                      <div key={i} className="flex flex-col gap-2 p-3 border border-[#24365C]/10 dark:border-white/5 bg-white dark:bg-white/[0.03] hover:border-[#4C8FC4]/50 transition-colors group/cap">
                        <LayoutGrid size={10} className="text-[#24365C]/30 dark:text-white/20 group-hover/cap:text-[#4C8FC4]" />
                        <span className="text-[10px] font-black uppercase tracking-tight text-[#24365C] dark:text-white/70">
                          {cap}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 03. ACTION PANEL */}
                <div className="relative h-full min-h-[250px] bg-slate-200 dark:bg-black p-8 flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-90 dark:opacity-40 group-hover:opacity-100 dark:group-hover:opacity-80 transition-opacity">
                    <Image
                      src={service.Image || "/placeholder.jpg"}
                      alt={t(`${key}.title`)}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-200 via-transparent dark:from-[#080808]" />
                  </div>

                  <div className="relative z-10 flex justify-end">
                    <div className="w-10 h-10 border border-[#24365C]/20 dark:border-white/20 flex items-center justify-center text-[#24365C] dark:text-white group-hover:bg-[#24365C]/50 transition-all duration-500">
                      <Code2 size={20} />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] font-mono font-bold text-[#24365C]/60 dark:text-white/60">
                        {t('labels.srvCode')} 0{index + 1}
                      </span>
                    </div>
                    <div className="h-[1px] w-full bg-[#24365C]/10 dark:bg-white/10 overflow-hidden">
                      <div className="h-full bg-[#4C8FC4] w-0 group-hover:w-full transition-all duration-1000 ease-in-out" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}