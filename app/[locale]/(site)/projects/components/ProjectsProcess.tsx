"use client";

import { motion } from "framer-motion";
import { brand } from "@/components/config/brand";
import { CheckCircle2, ChevronRight, Search, Layout, Rocket, ShieldCheck, LifeBuoy } from "lucide-react";

const steps = [
  {
    title: "Assessment",
    desc: "Technical evaluation of site conditions, load requirements, and operational constraints.",
    icon: Search,
  },
  {
    title: "System Design",
    desc: "Architecture planning with scalability, redundancy, and security as core principles.",
    icon: Layout,
  },
  {
    title: "Deployment",
    desc: "Structured implementation using controlled rollout and validated configurations.",
    icon: Rocket,
  },
  {
    title: "Testing & Commissioning",
    desc: "Performance validation under real-world conditions to ensure stability and reliability.",
    icon: ShieldCheck,
  },
  {
    title: "Handover",
    desc: "Delivery of documentation, system knowledge transfer, and operational readiness.",
    icon: CheckCircle2,
  },
  {
    title: "Support & Maintenance",
    desc: "Ongoing monitoring, maintenance, and optimization for long-term system performance.",
    icon: LifeBuoy,
  },
];

export default function ProjectsProcess() {
  return (
    <section className="relative  py-32 border-y border-slate-200 dark:border-white/5 overflow-hidden">
      {/* Decorative Brand Element */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at top right, ${brand?.colors?.primary}, transparent 70%)` 
        }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* CENTERED HEADER */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 opacity-30" style={{ backgroundColor: brand?.colors?.accent }} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-slate-400">
              Projects Process
            </span>
            <div className="h-px w-8 opacity-30" style={{ backgroundColor: brand?.colors?.accent }} />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white leading-[1.1] max-w-3xl">
            Structured Delivery. <br />
            <span style={{ color: brand?.colors?.primary }}>Proven System Outcomes.</span>
          </h2>
        </div>

        {/* CONNECTED PROCESS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[32px] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative bg-white dark:bg-[#0f1115] p-10 transition-all duration-500 hover:bg-slate-50 dark:hover:bg-[#161920]"
              >
                {/* Step Indicator */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500"
                      style={{ backgroundColor: `${brand?.colors?.primary}10`, color: brand?.colors?.primary }}
                    >
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 tracking-widest">
                      PHASE_0{i + 1}
                    </span>
                  </div>
                  <ChevronRight size={14} className="text-slate-200 dark:text-white/10 group-hover:text-slate-400 transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {step.desc}
                </p>

                {/* Subtle Progress Bar Decoration */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-transparent overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "0%" }}
                    transition={{ delay: 0.5 + (i * 0.1), duration: 0.8 }}
                    className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: brand?.colors?.accent }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
       
      </div>
    </section>
  );
}