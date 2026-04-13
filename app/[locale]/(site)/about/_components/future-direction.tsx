"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Rocket, Orbit, Boxes, Globe2, ArrowRight } from "lucide-react";
import { brand } from "@/components/config/brand";
import SectionShell from "@/components/landing/section-shell";

const roadmapIcons = [
  { icon: Boxes, key: "p1" },
  { icon: Rocket, key: "p2" },
  { icon: Globe2, key: "p3" },
  { icon: Orbit, key: "p4" },
];

export default function AboutFutureDirection() {
  const t = useTranslations("about.aboutFutureDirection");
  const PrimaryColor = brand.colors.primary;

  return (
    <SectionShell className="bg-slate-950 text-white overflow-hidden">
      <div className="relative">
        {/* Cinematic Background Gradients */}
        <div className="absolute rounded-2xl inset-0 bg-[radial-gradient(circle_at_top_left,rgba(76,143,196,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(36,54,92,0.52),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />

        <div className="relative p-8 z-10 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-slate-500">
              {t("heading.eyebrow")}
            </div>

            <h2 className="mt-5 text-3xl md:text-5xl font-bold tracking-tight leading-[1.03]">
              {t("heading.title")}
              <span className="block text-slate-400 font-light italic">
                {t("heading.subtitle")}
              </span>
            </h2>

            <p className="mt-5 max-w-3xl mx-auto text-sm md:text-base leading-8 text-slate-400 font-light">
              {t("heading.desc")}
            </p>
          </div>

          {/* Roadmap Timeline */}
          <div className="mt-16 relative">
            {/* Desktop Horizontal Rail */}
            <div className="hidden lg:block absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div className="grid lg:grid-cols-4 gap-8">
              {roadmapIcons.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative group cursor-default"
                >
                  <div className="relative z-10">
                    {/* Top Node - Industrial Aesthetic */}
                    <div className="flex lg:justify-center mb-6">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-white/[0.06] backdrop-blur-sm transition-all duration-300 group-hover:border-[#17f9ae]/50 group-hover:bg-[#17f9ae]/10"
                        style={{ boxShadow: `0 0 0 8px rgba(255,255,255,0.02)` }}
                      >
                        <item.icon 
                          size={24} 
                          className="text-white transition-transform duration-500 group-hover:rotate-12" 
                        />
                      </div>
                    </div>

                    {/* Phase Card */}
                    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 transition-colors duration-300 group-hover:bg-white/[0.07] group-hover:border-white/20">
                      <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.22em] bg-white/10 text-[#17f9ae]">
                        Phase {t(`roadmap.${item.key}.phase`)}
                      </div>

                      <h3 className="mt-5 text-lg font-semibold text-white uppercase tracking-tight">
                        {t(`roadmap.${item.key}.title`)}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-400 font-light">
                        {t(`roadmap.${item.key}.text`)}
                      </p>

                      <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-colors group-hover:text-slate-300">
                        <ArrowRight size={14} className={`text-${PrimaryColor}`} />
                        {t("footer")}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}