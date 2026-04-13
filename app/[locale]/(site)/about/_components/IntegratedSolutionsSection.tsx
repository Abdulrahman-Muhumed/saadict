"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  LayoutTemplate,
  Blocks,
  Cpu,
  MonitorSmartphone,
  Terminal,
  Database,
  Code
} from "lucide-react";

import SectionHeading from "@/components/landing/section-heading";

const capabilities = [
  { id: "SRV-01", translationKey: "SCT01", icon: LayoutTemplate },
  { id: "SRV-02", translationKey: "SCT02", icon: Blocks },
  { id: "SRV-03", translationKey: "SCT03", icon: Cpu },
  { id: "SRV-04", translationKey: "SCT04", icon: MonitorSmartphone },
];

export default function CapabilityMatrix() {
  const t = useTranslations("about.aboutMatrix");

  return (
    <section className="bg-[#fcfcfc] dark:bg-[#080808] py-32 border-y border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        <SectionHeading
          eyebrow={t("heading.eyebrow")}
          title={t("heading.title")}
          desc={t("heading.desc")}
        />

        {/* The Matrix: 4-Column Technical Grid */}
        <div className="grid mt-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-200 dark:border-white/10">
          {capabilities.map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ backgroundColor: "rgba(36,28,114,0.02)" }}
              className="group p-8 border-r border-b border-slate-200 dark:border-white/10 transition-colors relative overflow-hidden h-full"
            >
              {/* Technical Telemetry */}
              <div className="flex justify-between items-start mb-16 relative z-10">
                <span className="text-[9px] font-mono text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {item.id}
                </span>
                <item.icon 
                  size={20} 
                  strokeWidth={1.5} 
                  className="text-slate-300 dark:text-slate-700 group-hover:text-[#17ccf9] transition-colors duration-300" 
                />
              </div>

              <div className="space-y-4 relative z-10">
                <div className="inline-block px-2 py-0.5 rounded-sm bg-slate-100 dark:bg-white/5 text-[9px] font-bold uppercase tracking-widest text-slate-500 group-hover:bg-[#17ccf9]/10 group-hover:text-black transition-colors">
                  {t(`matrix.${item.translationKey}.tag`)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                  {t(`matrix.${item.translationKey}.title`)}
                </h3>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-light">
                  {t(`matrix.${item.translationKey}.desc`)}
                </p>
              </div>

              {/* Functional CTA / Tag Display */}
              <div className="mt-12 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300 relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-900 dark:text-white border-b border-[#1753f9]">
                  {t(`matrix.${item.translationKey}.tag`)}
                </span>
              </div>

              {/* Architectural Background Accent */}
              <div className="absolute -bottom-4 -right-4 text-slate-100 dark:text-white/[0.02] font-mono text-6xl font-bold select-none pointer-events-none group-hover:text-[#241c72]/[0.03] dark:group-hover:text-white/[0.04] transition-colors">
                0{idx + 1}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Terminal Footer */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <TerminalItem 
            icon={<Terminal size={16} />} 
            label={t("techStack.environment.label")} 
            value={t("techStack.environment.value")} 
          />
          <TerminalItem 
            icon={<Database size={16} />} 
            label={t("techStack.database.label")} 
            value={t("techStack.database.value")} 
          />
          <TerminalItem 
            icon={<Code size={16} />} 
            label={t("techStack.style.label")} 
            value={t("techStack.style.value")} 
          />
        </div>
      </div>
    </section>
  );
}

function TerminalItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] hover:border-[#F99417]/20 transition-all group">
      <div className="text-slate-400 group-hover:text-[#17b9f9] transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-[9px] font-mono uppercase text-slate-400 tracking-wider">{label}</div>
        <div className="text-xs font-bold dark:text-white group-hover:translate-x-1 transition-transform">{value}</div>
      </div>
    </div>
  );
}