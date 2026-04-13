"use client";

import { motion } from "framer-motion";
import { brand } from "../config/brand";
import { LucideIcon, ArrowUpRight } from "lucide-react";

export default function InfoCard({
  icon: Icon,
  title,
  text,
  badge,
  compact = false,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  badge?: string;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-[26px] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] backdrop-blur-sm  ${
        compact ? "p-5 md:p-6" : "p-6 md:p-7"
      }`}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${brand.colors.accent}, transparent)`,
        }}
      />
      <div
        className="absolute -right-8 -top-8 w-24 h-24 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity"
        style={{ backgroundColor: `${brand.colors.accent}18` }}
      />
      <div className="flex items-start justify-between gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-white/10 shrink-0"
          style={{
            background: `linear-gradient(135deg, ${brand.colors.primary}12, ${brand.colors.accent}18)`,
          }}
        >
          <Icon size={24} style={{ color: brand.colors.primary }} />
        </div>

        {badge ? (
          <span
            className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{
              backgroundColor: `${brand.colors.accent}16`,
              color: brand.colors.primary,
            }}
          >
            {badge}
          </span>
        ) : (
          <ArrowUpRight className="text-slate-300 group-hover:text-slate-500 dark:group-hover:text-white transition-colors" size={18} />
        )}
      </div>

      <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
        {text}
      </p>
    </motion.div>
  );
}