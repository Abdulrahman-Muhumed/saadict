"use client";

import { motion } from "framer-motion";

export default function StatPill({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col gap-1 px-6 py-4 transition-all duration-500"
    >
      {/* 1. The Structural Frame (Top-Left Bracket) */}
      <div className="absolute top-0 left-0 w-3 h-[1px] bg-slate-900/20 dark:bg-white/20 transition-all duration-500 group-hover:w-full group-hover:bg-slate-900 dark:group-hover:bg-white" />
      <div className="absolute top-0 left-0 w-[1px] h-3 bg-slate-900/20 dark:bg-white/20 transition-all duration-500 group-hover:h-full group-hover:bg-slate-900 dark:group-hover:bg-white" />

      {/* 2. Technical Metadata Label (Micro-text) */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-white/20">
          SAAD
        </span>
        <div className="h-[1px] w-4 bg-slate-200 dark:bg-white/10 group-hover:w-8 transition-all duration-500" />
      </div>

      {/* 3. The Value - Professional Scale */}
      <div className="relative">
        <span className="text-3xl md:text-3xl font-bold tracking-tighter text-[#24365C] dark:text-white leading-none">
          {value}
        </span>
        {/* Subtle decimal or unit indicator if needed, or just a terminal cursor */}
        <span className="inline-block w-1 h-4 ml-1 bg-orange-500/0 group-hover:bg-[#24365C] transition-colors duration-300 align-middle" />
      </div>

      {/* 4. The Label - Clean & Spaced */}
      <div className="text-[11px]  uppercase tracking-[0.12em] text-slate-500 dark:text-white/40 group-hover:text-slate-900 dark:group-hover:text-white/70 transition-colors duration-500">
        {label}
      </div>

      {/* 5. Bottom Right Geometric Marker */}
      <div className="absolute bottom-0 right-0 w-1 h-1 bg-slate-200 dark:bg-white/10 group-hover:bg-[#4C8FC4] transition-colors duration-500" />
      
      {/* 6. Subtle Background Glass (Hidden until hover) */}
      <div className="absolute inset-0 -z-10 bg-slate-900/[0.02] dark:bg-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}