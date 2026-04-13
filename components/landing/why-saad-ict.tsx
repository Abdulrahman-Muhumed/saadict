"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  ShieldCheck,
  Fingerprint,
  Zap
} from "lucide-react";
import SectionHeading from "./section-heading";
import { useTranslations } from "next-intl";

export default function WhySaadICT() {
  const t = useTranslations("home.whySaadIct");

  const SYSTEM_CORE = [
    {
      id: "01",
      title: t("system_core.01.title"),
      metric: t("system_core.01.metric"),
      desc: t("system_core.01.desc"),
      icon: Monitor
    },
    {
      id: "02",
      title: t("system_core.02.title"),
      metric: t("system_core.02.metric"),
      desc: t("system_core.02.desc"),
      icon: ShieldCheck
    },
    {
      id: "03",
      title: t("system_core.03.title"),
      metric: t("system_core.03.metric"),
      desc: t("system_core.03.desc"),
      icon: Fingerprint
    },
    {
      id: "04",
      title: t("system_core.04.title"),
      metric: t("system_core.04.metric"),
      desc: t("system_core.04.desc"),
      icon: Zap
    },
  ];

  return (
    <section className="bg-white px-3 dark:bg-[#050505] text-black dark:text-white py-24 selection:bg-blue-600/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <SectionHeading
          eyebrow={t("heading.eyebrow")}
          title={t("heading.title")}
          desc={t("heading.description")}
        />

        <div className="grid mt-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-black/10 dark:border-white/10">
          {SYSTEM_CORE.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: idx * 0.1, 
                ease: [0.215, 0.61, 0.355, 1] 
              }}
              className="group relative p-8 border-r border-b border-black/10 dark:border-white/10 flex flex-col justify-between h-[400px] hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-all duration-500"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.07] pointer-events-none transition-opacity duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />
              </div>

              <div className="absolute top-0 left-0 w-full h-[2px] overflow-hidden">
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-16">
                  <span className="text-xs text-neutral-400 group-hover:text-blue-600 transition-colors font-mono">
                   {item.id}
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase border border-blue-600/20 px-2 py-0.5 rounded-sm font-mono">
                    {item.metric}
                  </span>
                </div>

                <div className="h-10 mb-6 overflow-hidden relative">
                  <item.icon className="w-8 h-8 text-blue-600 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-out" strokeWidth={1.5} />
                </div>

                <h3 className="text-2xl font-black tracking-tight uppercase leading-none mb-6 group-hover:translate-x-1 transition-transform">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[220px]">
                  {item.desc}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => (
                      <motion.div
                        key={i}
                        initial={false}
                        animate={{
                          height: i < 4 ? [12, 16, 12] : 12,
                          backgroundColor: i < 4 ? (i === 1 ? "#2563eb" : "currentColor") : ""
                        }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                        className={`w-1 h-3 ${i < 4 ? 'bg-black dark:bg-white' : 'bg-neutral-200 dark:bg-neutral-800'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-blue-600 transition-all font-mono">
                    {t("footer.status")}
                  </span>
                </div>

                <div className="w-4 h-4 border-r border-b border-black/10 dark:border-white/10 group-hover:border-blue-600 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        <footer className="mt-8 flex justify-between text-[10px] uppercase opacity-30 tracking-[0.3em] font-mono">
          <span>{t("footer.brand")}</span>
        </footer>
      </div>
    </section>
  );
}