"use client";

import { motion } from "framer-motion";
import { brand } from "@/components/config/brand";
import { ShieldAlert, Lock, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ConfidentialProjects() {
  const t = useTranslations("projects.confidential");

  return (
    <section className="relative bg-[#030303] py-32 border-y border-white/5 overflow-hidden">
      {/* Dynamic Security Glows */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] opacity-20 blur-[140px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${brand?.colors?.primary} 0%, transparent 70%)` }}
      />
      
      {/* Background Scanning Grid (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          {/* Symmetrical Security Header */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-8 opacity-30" style={{ backgroundColor: brand?.colors?.accent }} />
            <div className="flex items-center gap-2">
              <Lock size={12} style={{ color: brand?.colors?.accent }} />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-slate-500">
                {t('label')}
              </span>
            </div>
            <div className="h-px w-8 opacity-30" style={{ backgroundColor: brand?.colors?.accent }} />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-8 leading-[1.1]">
            {t('titleMain')} <br />
            <span style={{ color: brand?.colors?.primary }}>{t('titleAccent')}</span>
          </h2>

          <div className="flex items-center justify-center gap-2 mb-10 text-[10px] font-mono text-white/40 uppercase tracking-widest bg-white/5 w-fit mx-auto px-4 py-2 rounded-full border border-white/10">
            <ShieldAlert size={12} className="text-red-500/70" />
            {t('ndaPolicy')}
          </div>

          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            {t('description')}
          </p>
        </motion.div>

        {/* CLASSIFIED DATA CELLS */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {t.raw('securityPoints')?.map((item: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500 hover:border-[#241c72]/40"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="text-[10px] font-mono text-slate-600 mb-2">REF_0{i + 1}</div>
                  <div 
                    className="w-1.5 h-6 rounded-full opacity-40 group-hover:opacity-100 transition-opacity" 
                    style={{ backgroundColor: brand?.colors?.primary }}
                  />
                </div>
                <div className="flex-1">
                   <p className="text-slate-300 font-bold uppercase tracking-wider text-[11px] leading-relaxed group-hover:text-white transition-colors">
                    {item}
                  </p>
                </div>
                <EyeOff size={14} className="text-white/10 group-hover:text-white/30 transition-colors" />
              </div>
              
              {/* Subtle Scan Line Effect */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <motion.div 
                   animate={{ y: ["-100%", "200%"] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className="w-full h-[40%] bg-gradient-to-b from-transparent via-[#241c72]/5 to-transparent opacity-0 group-hover:opacity-100"
                />
              </div>
            </motion.div>
          ))}
        </div>
    
      </div>
    </section>
  );
}