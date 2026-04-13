"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Cpu, Activity, Layers } from "lucide-react";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { brand } from "@/components/config/brand";

export default function ProjectsHero() {
  const t = useTranslations("projects.projectsHero");
  const totalProjects = projects.length;

  return (
    <section className="relative pt-32 pb-16 min-h-[90vh]  overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase italic text-[#24365C] dark:text-white">
                {t("titleMain")} <br />
                <span className="text-slate-300 dark:text-neutral-600">{t("titleAccent")}</span>
              </h1>

              <p className="mt-6 max-w-md text-base text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {t.rich("description", {
                  highlight: (chunks) => <span className="text-slate-900 dark:text-white">{chunks}</span>
                })}
              </p>
            </motion.div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-1 max-w-md bg-slate-100 dark:bg-white/5 border border-slate-100 dark:border-white/5 p-1">
              {[
                { label: t("metrics.nodes"), val: totalProjects, icon: Cpu },
                { label: t("metrics.uptime"), val: "99.9%", icon: Activity },
                { label: t("metrics.architecture"), val: "L3", icon: Layers },
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-[#0c0c0c] p-4 text-center group">
                  <stat.icon size={14} className="mx-auto mb-3 opacity-20 group-hover:opacity-100 transition-opacity" style={{ color: brand.colors.accent }} />
                  <div className="text-lg font-bold font-mono tracking-tighter leading-none mb-1">
                    {stat.val}
                  </div>
                  <div className="text-[8px] uppercase tracking-widest font-bold text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Unit */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[3/3]  p-2"
            >
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: brand.colors.accent }} />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: brand.colors.accent }} />

              <div className="relative w-full h-full overflow-hidden ">
                <Image
                  src={"/projects/hero.png"}
                  alt="Featured"
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
                />
                
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}