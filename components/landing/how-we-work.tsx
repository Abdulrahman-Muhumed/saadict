"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ScanSearch,
  BotMessageSquare,
  Network,
  Braces,
  ShieldCheck,
  Rocket,
  ChevronRight,
  Activity,
  Fingerprint,
  Globe,
  Lock,
  Layers
} from "lucide-react";
import { useTranslations } from "next-intl";
import SectionShell from "./section-shell";
import SectionHeading from "./section-heading";

export default function HowWeWork() {
  const t = useTranslations("home.howWeWork");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const PROCESS_STEPS = [
    {
      id: "01",
      title: t("phases.01.title"),
      desc: t("phases.01.desc"),
      subPoints: t.raw("phases.01.deliverables"),
      meta: t("phases.01.meta"),
      color: "#2563EB",
      icon: ScanSearch,
      visual: "radar"
    },
    {
      id: "02",
      title: t("phases.02.title"),
      desc: t("phases.02.desc"),
      subPoints: t.raw("phases.02.deliverables"),
      meta: t("phases.02.meta"),
      color: "#7C3AED",
      icon: BotMessageSquare,
      visual: "neural"
    },
    {
      id: "03",
      title: t("phases.03.title"),
      desc: t("phases.03.desc"),
      subPoints: t.raw("phases.03.deliverables"),
      meta: t("phases.03.meta"),
      color: "#059669",
      icon: Network,
      visual: "grid"
    },
    {
      id: "04",
      title: t("phases.04.title"),
      desc: t("phases.04.desc"),
      subPoints: t.raw("phases.04.deliverables"),
      meta: t("phases.04.meta"),
      color: "#EA580C",
      icon: Braces,
      visual: "code"
    },
    {
      id: "05",
      title: t("phases.05.title"),
      desc: t("phases.05.desc"),
      subPoints: t.raw("phases.05.deliverables"),
      meta: t("phases.05.meta"),
      color: "#DC2626",
      icon: ShieldCheck,
      visual: "shield"
    },
    {
      id: "06",
      title: t("phases.06.title"),
      desc: t("phases.06.desc"),
      subPoints: t.raw("phases.06.deliverables"),
      meta: t("phases.06.meta"),
      color: "#0D9488",
      icon: Rocket,
      visual: "orbit"
    },
  ];

  return (
    <SectionShell className="bg-neutral-50 dark:bg-[#050505] py-32 transition-colors duration-500 overflow-hidden">
      <SectionHeading
        eyebrow={t("heading.eyebrow")}
        title={t("heading.title")}
        desc={t("heading.description")}
      />

      <div ref={containerRef} className="relative max-w-6xl mx-auto mt-32 px-6">
        <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-[1px] lg:-translate-x-1/2 bg-neutral-200 dark:bg-neutral-800">
          <motion.div
            style={{ scaleY }}
            className="absolute top-0 left-0 w-full h-full bg-blue-600 dark:bg-blue-500 origin-top shadow-sm"
          />
        </div>

        <div className="space-y-40">
          {PROCESS_STEPS.map((step, idx) => (
            <StepItem key={step.id} step={step} index={idx} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function StepItem({ step, index }: { step: any; index: number }) {
  const isEven = index % 2 === 0;
  const t = useTranslations("home.howWeWork.common");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative flex flex-col lg:flex-row items-center justify-between w-full ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      <div className="w-full lg:w-[45%] ml-16 lg:ml-0">
        <div className="group relative p-8 md:p-10 rounded-[24px] border border-neutral-200 dark:border-white/5 bg-white/70 dark:bg-[#0b0b0b] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none hover:border-neutral-300 dark:hover:border-blue-600/30 transition-all duration-500">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
               <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center border border-neutral-100 dark:border-none"
                  style={{ backgroundColor: `${step.color}10` }}
               >
                  <step.icon size={20} style={{ color: step.color }} strokeWidth={1.5} />
               </div>
               <span className="font-mono text-[10px] font-bold text-blue-600 tracking-[0.2em] uppercase">
                  {t("phasePrefix")}{step.id}
               </span>
            </div>
            <div className="flex items-center gap-2 opacity-40">
               <Activity size={10} className="text-neutral-500 dark:text-blue-400" />
               <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                 {step.meta}
               </span>
            </div>
          </div>

          <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 text-neutral-900 dark:text-white leading-none">
            {step.title}
          </h3>
          
          <p className="text-sm md:text-base font-medium text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
            {step.desc}
          </p>

          <div className="space-y-4 border-t border-neutral-100 dark:border-white/5 pt-8">
            <div className="flex items-center gap-2 mb-2">
              <Fingerprint size={12} className="text-blue-600 opacity-50" />
              <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                {t("keyDeliverables")}
              </span>
            </div>
            {step.subPoints.map((point: string) => (
              <div key={point} className="flex items-center gap-3 group/item">
                <ChevronRight size={12} className="text-blue-600" />
                <span className="text-xs md:text-sm font-semibold text-neutral-700 dark:text-neutral-300 opacity-90">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute left-2 md:left-8 lg:left-1/2 top-12 lg:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div 
          whileInView={{ scale: [0, 1.1, 1], rotate: [0, 45, 0] }}
          viewport={{ once: true }}
          className="w-5 h-5 bg-white dark:bg-[#050505] border-2 rounded-sm transition-all duration-300 shadow-sm"
          style={{ borderColor: step.color }}
        />
      </div>

      <div className={`hidden lg:flex w-[45%] h-full items-center justify-center`}>
         <SystemVisualizer type={step.visual} color={step.color} />
      </div>
    </motion.div>
  );
}

function SystemVisualizer({ type, color }: { type: string, color: string }) {
  const t = useTranslations("home.howWeWork.visuals");

  return (
    <div className="relative w-full h-[300px] flex items-center justify-center">
      <div className="absolute w-40 h-40 border border-neutral-200/50 dark:border-white/5 rounded-full" />
      
      <div className="relative z-10 opacity-60 dark:opacity-40">
        {type === "radar" && (
           <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 rounded-full border border-neutral-300 dark:border-neutral-700 relative"
           >
              <div className="absolute top-0 left-1/2 w-px h-1/2" style={{ backgroundColor: color }} />
           </motion.div>
        )}

        {type === "neural" && (
          <div className="flex gap-4">
            {[1, 2, 3].map(i => (
              <motion.div 
                key={i}
                animate={{ scaleY: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                className="w-1 h-12 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}

        {type === "grid" && (
           <Layers size={48} className="text-neutral-300 dark:text-neutral-700" strokeWidth={1} />
        )}

        {type === "code" && (
          <div className="flex flex-col gap-2 font-mono text-[9px] text-neutral-400 dark:text-neutral-500">
            <span style={{ color }}>{t("codeExe")}</span>
            <span>{t("dataSync")}</span>
            <span>{t("cacheInv")}</span>
          </div>
        )}

        {type === "shield" && (
          <Lock size={48} className="text-neutral-300 dark:text-neutral-700" strokeWidth={1} />
        )}

        {type === "orbit" && (
          <div className="relative">
            <Globe size={48} className="text-neutral-300 dark:text-neutral-700" strokeWidth={1} />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-neutral-200 dark:border-neutral-800 rounded-full scale-[2]"
            />
          </div>
        )}
      </div>
    </div>
  );
}