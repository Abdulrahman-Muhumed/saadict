"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/lib/projects";
import { brand } from "@/components/config/brand";
import { Plus, Minus, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FeaturedProjects() {
  const t = useTranslations("projects.projects");
  const featured = projects.filter((p) => p.featured);
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  if (!featured.length) return null;

  return (
    <section className="relative bg-white dark:bg-neutral-900 py-32 border-t border-slate-200 dark:border-white/5 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-[#241c72]/[0.02] -skew-x-12 translate-x-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* SECTION HEADER */}
        <div className="mb-24 flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 opacity-50" style={{ backgroundColor: brand?.colors?.accent }} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-slate-400 whitespace-nowrap">
              {t('featuredLabel') || "Featured Projects"}
            </span>
            <div className="h-px w-8 opacity-50" style={{ backgroundColor: brand?.colors?.accent }} />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white leading-[1.1] max-w-4xl">
            {t('featuredTitleMain')} <br />
            <span style={{ color: brand?.colors?.primary }}>{t('featuredTitleAccent')}</span>
          </h2>
        </div>

        {/* FEATURED PROJECTS LIST */}
        <div className="space-y-40">
          {featured.map((project: Project, index: number) => {
            const isActive = activeId === project.id;
            const isReverse = index % 2 !== 0;

            return (
              <div
                key={project.id}
                className={`grid lg:grid-cols-2 gap-16 xl:gap-24 items-center ${isReverse ? "lg:direction-rtl" : ""}`}
              >
                {/* 01. VISUAL TERMINAL */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className={`relative group ${isReverse ? "lg:order-2" : ""}`}
                >
                  <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl">
                    <Image
                      src={project.featured_img ? project.featured_img : project.coverImage}
                      alt={project.coverImageAlt || t(`list.${project.tKey}.title`)}
                      fill
                      className="object-fill transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#241c72]/40 via-transparent to-transparent opacity-60" />

                    <div className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center gap-2">
                      <ShieldCheck size={12} className="text-green-400" />
                      <span className="text-[9px] font-mono font-bold text-white uppercase tracking-widest">
                        {t('verifiedDeployment') || "Verified_Deployment"}
                      </span>
                    </div>
                  </div>

                  <div className="absolute -inset-4 rounded-[40px] border border-slate-200 dark:border-white/5 -z-10 transition-transform group-hover:scale-105" />
                </motion.div>

                {/* 02. SYSTEM CONTENT */}
                <div className={isReverse ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[11px] font-mono font-bold py-1 px-2 rounded bg-slate-100 dark:bg-white/5 text-slate-500">
                      0{index + 1}
                    </span>
                    <div className="h-px flex-1 bg-slate-100 dark:bg-white/5" />
                  </div>

                  <h3 className="text-3xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                    {t(`list.${project.tKey}.title`)}
                  </h3>

                  <p className="text-md text-slate-600 dark:text-slate-400 leading-relaxed mb-8 font-medium">
                    {t(`list.${project.tKey}.shortDescription`)}
                  </p>

                  {/* Core Services / Capabilities */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {t.raw(`list.${project.tKey}.services`)?.slice(0, 4).map((service: string, i: number) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: brand?.colors?.accent }}
                        />
                        <span className="text-sm text-slate-500 tracking-wide">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Toggle */}
                  <button
                    onClick={() => toggle(project.id)}
                    className="group flex items-center gap-4 py-4 px-8 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-slate-900 dark:hover:border-white transition-all duration-300"
                  >
                    <div className="p-1 rounded bg-slate-100 dark:bg-white/5 group-hover:bg-[#241c72] transition-colors">
                      {isActive ? (
                        <Minus size={14} className="group-hover:text-white" />
                      ) : (
                        <Plus size={14} className="group-hover:text-white" />
                      )}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                      {isActive ? t('collapseManifest') || "Collapse_Manifest" : t('viewManifest') || "View_Technical_Manifest"}
                    </span>
                  </button>

                  {/* EXPANDABLE TECHNICAL AREA */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          transition: { height: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10 space-y-8">
                          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                           
                          </p>

                         

                          {/* TECH STACK */}
                          <div className="flex flex-wrap gap-2">
                            {project.technologies?.map((tech, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-bold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/5 text-slate-500 uppercase tracking-widest"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}