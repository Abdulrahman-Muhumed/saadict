"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Cpu,
  MousePointer2,
  Layers,
  ShieldCheck,
  Zap,
  Globe,
  Briefcase,
} from "lucide-react";
import { brand } from "@/components/config/brand";
import { useTranslations } from "next-intl";

export default function ServicesHero() {
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations("services.servicesHero");

  return (
    <section
      ref={constraintsRef}
      className="relative md:min-h-screen lg:min-h-screen pt-24 md:pt-0 lg:pt-0 w-full flex items-center justify-center overflow-hidden border-b border-slate-200 dark:border-white/5"
    >
      {/* Background layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] [background-size:48px_48px]" />

        {/* Blueprint rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] border border-slate-900/[0.04] dark:border-white/[0.03] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] border border-slate-900/[0.05] dark:border-white/[0.04] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] border border-slate-900/[0.06] dark:border-white/[0.05] rounded-full" />

        {/* Scanner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-px bg-gradient-to-r from-transparent via-orange-500/25 to-transparent opacity-50"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 pt-16 md:pt-32 pb-20">
        <div className="flex flex-col items-center text-center">
          {/* top pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-8 px-4 py-1.5 bg-slate-900/5 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 backdrop-blur"
          >
            <MousePointer2 size={12} className="text-blue-500" />
            <span className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-[0.22em]">
              {t('pill')}
            </span>
          </motion.div>

          {/* heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="relative"
          >
            <h1 className="text-5xl md:text-7xl xl:text-[7.5rem] font-bold tracking-[-0.08em] text-slate-950 dark:text-white leading-[0.84]">
              {t('titleMain')}
              <br />
              <span className="font-thin italic text-slate-300 dark:text-white/10">
                {t('titleItalic')}
              </span>
            </h1>
          </motion.div>

          {/* copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-10 max-w-2xl text-sm md:text-base text-slate-600 dark:text-white/40 font-medium tracking-tight leading-7"
          >
            {t('description')}
          </motion.p>

          {/* mini bottom labels */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.55 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {t.raw('tags').map((item: string) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-white/35"
              >
                {item}
              </span>
            ))}
          </motion.div>

          {/* nodes */}
          <div className="hidden md:block">
            <DraggableNode
              constraints={constraintsRef}
              icon={Layers}
              label={t('nodes.saas')}
              initialPos={{ top: "12%", left: "10%" }}
              accent="orange"
            />
            <DraggableNode
              constraints={constraintsRef}
              icon={ShieldCheck}
              label={t('nodes.consulting')}
              initialPos={{ top: "12%", right: "14%" }}
              accent="slate"
            />
            <DraggableNode
              constraints={constraintsRef}
              icon={Globe}
              label={t('nodes.websites')}
              initialPos={{ top: "28%", left: "7%" }}
              accent="orange"
            />
            <DraggableNode
              constraints={constraintsRef}
              icon={Cpu}
              label={t('nodes.webApps')}
              initialPos={{ top: "24%", right: "22%" }}
              accent="slate"
            />
            <DraggableNode
              constraints={constraintsRef}
              icon={Zap}
              label={t('nodes.ai')}
              initialPos={{ bottom: "18%", left: "14%" }}
              accent="orange"
            />
            <DraggableNode
              constraints={constraintsRef}
              icon={Briefcase}
              label={t('nodes.mobile')}
              initialPos={{ bottom: "16%", right: "12%" }}
              accent="slate"
            />
          </div>
        </div>
      </div>

      {/* footer labels */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
        <div className="text-[10px] text-slate-900 dark:text-white font-bold tracking-[0.34em] uppercase">
          {brand?.name || "Saad ICT"}
        </div>

        <div className="text-[10px] text-slate-300 dark:text-white/10 uppercase tracking-[0.3em]">
          {t('footerTagline')}
        </div>
      </div>
    </section>
  );
}

type DraggableNodeProps = {
  icon: React.ElementType;
  label: string;
  initialPos: React.CSSProperties;
  constraints: React.RefObject<HTMLDivElement | null>;
  accent?: "orange" | "slate";
};

function DraggableNode({
  icon: Icon,
  label,
  initialPos,
  constraints,
  accent = "orange",
}: DraggableNodeProps) {
  const dotClass = accent === "orange" ? "bg-orange-500" : "bg-slate-400 dark:bg-white/40";
  const t = useTranslations("services.servicesHero");

  return (
    <motion.div
      drag
      dragConstraints={constraints}
      dragElastic={0.08}
      whileDrag={{
        scale: 1.04,
        zIndex: 50,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.14)",
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55 }}
      className="absolute cursor-grab active:cursor-grabbing group"
      style={initialPos}
    >
      <div className="relative flex items-center gap-4 min-w-[220px] bg-white/90 dark:bg-[#0f1115]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-4 rounded-[22px] shadow-xl shadow-slate-200/40 dark:shadow-none">
        <div className={`h-1.5 w-1.5 rounded-full absolute top-4 right-4 ${dotClass} animate-pulse`} />

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 group-hover:bg-slate-950 dark:group-hover:bg-white transition-all duration-500 shadow-inner">
          <Icon
            size={18}
            className="text-slate-900 dark:text-white group-hover:text-white dark:group-hover:text-black"
          />
        </div>

        <div className="text-left">
          <span className="block text-[8px] text-slate-400 dark:text-white/20 uppercase tracking-widest font-bold mb-1">
            {t('nodeLabel')}
          </span>
          <span className="text-[11px] font-bold text-slate-950 dark:text-white uppercase tracking-[0.18em]">
            {label}
          </span>
        </div>

        <Plus
          size={14}
          className="ml-auto text-slate-200 dark:text-white/10 group-hover:rotate-90 transition-transform"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-slate-900/5 dark:bg-white/5 rounded-[22px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}