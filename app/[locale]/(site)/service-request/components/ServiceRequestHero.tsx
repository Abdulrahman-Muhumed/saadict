// /components/service-request/ServiceRequestHero.tsx
"use client";

import { motion } from "framer-motion";
import { brand } from "@/components/config/brand";
import { serviceRequestSteps, requestedServices } from "@/lib/ServiceRequest/serviceRequestSteps";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function ServiceRequestHero() {
  const primaryColor = brand?.colors?.primary || "#f97316";

  const metrics = [
    { label: "Protocol Steps", value: serviceRequestSteps.length },
    { label: "Service Modules", value: requestedServices.length },
    { label: "Estimate Engine", value: "Active" },
  ];

  return (
    <section className="relative pt-32 pb-16 overflow-hidden  border-b border-slate-200 dark:border-white/[0.05]">
      {/* Background Technical Grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] [background-size:64px_64px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] mb-8">
            <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              System Request
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Initialize your <span style={{ color: primaryColor }}>project brief</span>.
          </h1>

          <p className="mt-6 text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Provide the technical requirements and business goals to generate a 
            structured scope of work and implementation timeline.
          </p>

          {/* Centered Industrial Metrics */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16 border-t border-slate-100 dark:border-white/[0.05] pt-12">
            {metrics.map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <span className="text-3xl font-mono font-light text-slate-900 dark:text-white tracking-tighter">
                  {typeof item.value === 'number' ? String(item.value).padStart(2, '0') : item.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 mt-2">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}