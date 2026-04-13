"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { brand } from "@/components/config/brand";
import { ArrowRight, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProjectsCTA() {
  const t = useTranslations("projects.projectsCTA");

  return (
    <section className="relative bg-[#fcfcfc] dark:bg-[#161618] py-32 overflow-hidden border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Availability Status */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 mb-10 transition-colors duration-500">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: brand?.colors?.accent }}></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: brand?.colors?.accent }}></span>
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.25em]">
              {t('status')}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white mb-8 leading-[1.05] transition-colors duration-500">
            {t('titleMain')} <br />
            <span style={{ color: brand?.colors?.primary }} className="brightness-110 dark:brightness-125">
              {t('titleAccent')}
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400/90 mb-14 max-w-xl mx-auto text-md font-medium leading-relaxed transition-colors duration-500">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              href="/service-request"
              className="group relative flex items-center gap-3.5 px-10 py-5 rounded-2xl text-white text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#241c72]/20 active:scale-[0.98]"
              style={{ backgroundColor: brand?.colors?.primary }}
            >
              <Zap size={18} className="fill-current" />
              {t('buttonText')}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}