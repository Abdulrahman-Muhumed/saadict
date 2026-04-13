"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/lib/projects";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { brand } from "@/components/config/brand";
import { ArrowUpRight, Plus, Minus, Cpu, HardDrive, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

const ITEMS_PER_PAGE = 5;

export default function ProjectsLedger() {
  const t = useTranslations("projects.projects");

  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);

  // Use the translation keys for categories to keep state consistent
  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.catKey));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    let data = [...projects];
    if (activeCategory !== "All") data = data.filter((p) => p.catKey === activeCategory);
    data.sort((a, b) => (sort === "newest" ? b.year - a.year : a.year - b.year));
    return data;
  }, [activeCategory, sort]);

  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const prevPageRef = useRef(page);

  useEffect(() => {
    const hasPageChanged = prevPageRef.current !== page;
    if (hasPageChanged && sectionRef.current) {
      const yOffset = -120;
      const element = sectionRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
    prevPageRef.current = page;
  }, [page]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#e1f1f252] dark:bg-neutral-900 py-24 border-t border-slate-200 dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* --- SYSTEM CONSOLE --- */}
        <div className="mb-12 flex items-stretch h-14 w-full max-w-3xl mx-auto rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0c0c0e] shadow-sm overflow-hidden">

          {/* CATEGORY SELECTOR */}
          <div className="relative flex-1 group flex items-center gap-4 px-5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer border-r border-slate-200 dark:border-white/[0.08]">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <Cpu size={14} />
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-[8px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 leading-none mb-1">
                Filter
              </span>
              <div className="relative w-full">
                <select
                  value={activeCategory}
                  onChange={(e) => {
                    setActiveCategory(e.target.value);
                    setPage(1);
                  }}
                  className="w-full bg-transparent text-[11px] font-bold uppercase tracking-widest text-slate-900 dark:text-white border-none p-0 focus:ring-0 cursor-pointer appearance-none outline-none"
                >
                  <option value="All">{t('categories.all') || "All Projects"}</option>
                  {categories.filter(cat => cat !== "All").map((catKey) => (
                    <option key={catKey} value={catKey} className="dark:bg-[#0c0c0e]">
                      {t(`categories.${catKey}`)}
                    </option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* SORT SELECTOR */}
          <div className="relative w-48 group flex items-center gap-4 px-5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer">
            <HardDrive size={14} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
            <div className="flex flex-col flex-1">
              <span className="text-[8px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 leading-none mb-1">
                Sort
              </span>
              <div className="relative w-full">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
                  className="w-full bg-transparent text-[11px] font-bold uppercase tracking-widest text-slate-900 dark:text-white border-none p-0 focus:ring-0 cursor-pointer appearance-none outline-none"
                >
                  <option value="newest" className="dark:bg-[#0c0c0e]">Newest</option>
                  <option value="oldest" className="dark:bg-[#0c0c0e]">Oldest</option>
                </select>
                <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center px-4 bg-slate-50 dark:bg-white/[0.03] border-l border-slate-200 dark:border-white/[0.08]">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          </div>
        </div>

        {/* --- PROJECT LIST --- */}
        <div className="space-y-6">
          {paginated.map((project, idx) => {
            const isExpanded = expandedId === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group border border-slate-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a] rounded-[24px] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(36,28,114,0.15)]"
              >
                <div className="grid lg:grid-cols-[400px_1fr] min-h-[340px]">
                  {/* IMAGE NODE */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.coverImage}
                      alt={project.coverImageAlt}
                      fill
                      className="object-contain p-10 transition-transform duration-500 group-hover:scale-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: brand?.colors?.accent }} />
                        <span className="text-xs font-bold text-white uppercase tracking-tighter">
                          {t(`statuses.${project.statKey}`)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CONTENT NODE */}
                  <div className="p-8 md:p-12 flex flex-col justify-between relative">
                    <div className="absolute left-0 top-12 bottom-12 w-px bg-slate-100 dark:bg-white/5 hidden lg:block" />

                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
                          <span className="font-bold text-slate-900 dark:text-white">[{project.year}]</span>
                          <span className="uppercase tracking-[0.2em]">{t(`list.${project.tKey}.location`)}</span>
                        </div>
                        <span
                          className="text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border"
                          style={{
                            color: brand?.colors?.accent,
                            borderColor: `${brand?.colors?.accent}33`,
                            backgroundColor: `${brand?.colors?.accent}08`,
                          }}
                        >
                          {t(`categories.${project.catKey}`)}
                        </span>
                      </div>

                      <h3 className="text-4xl font-bold tracking-tighter text-slate-900 dark:text-white mb-6">
                        {t(`list.${project.tKey}.title`)}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base max-w-2xl font-medium">
                        {t(`list.${project.tKey}.shortDescription`)}
                      </p>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10">
                              <p className="text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-3xl">
                                {t(`list.${project.tKey}.fullDescription`)}
                              </p>

                              <div className="flex flex-wrap gap-2.5">
                                {project.technologies?.map((tech) => (
                                  <span key={tech} className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-slate-100 dark:bg-white/5 text-slate-500 rounded-lg">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* ACTION FOOTER */}
                    <div className="mt-12 flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-8">
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : project.id)}
                        className="group/btn flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400"
                      >
                        <div className={`w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center transition-all ${isExpanded ? "rotate-180" : ""}`}>
                          {isExpanded ? <Minus size={14} /> : <Plus size={14} />}
                        </div>
                        <span className="group-hover/btn:text-slate-900 dark:group-hover/btn:text-white">
                          {isExpanded ? "Close_Specs" : "View_Specs"}
                        </span>
                      </button>

                      <a
                        href={project?.website || "#"}
                        target="_blank"
                        className="flex items-center gap-4 text-[10px] font-extrabold uppercase tracking-[0.3em]"
                        style={{ color: brand?.colors?.primary }}
                      >
                        Access System
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${brand?.colors?.primary}10` }}>
                          <ArrowUpRight size={16} />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* --- PAGINATION --- */}
        {totalPages > 1 && (
          <div className="mt-24 flex items-center justify-center gap-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="w-14 h-14 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 disabled:opacity-20 hover:border-slate-900 transition-all"
            >
              <ArrowUpRight size={20} className="rotate-[225deg]" />
            </button>

            <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
              <span className="text-xl font-bold tracking-tighter" style={{ color: brand?.colors?.primary }}>
                {String(page).padStart(2, "0")}
              </span>
              <div className="w-px h-4 bg-slate-200 dark:bg-white/10" />
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                Total {String(totalPages).padStart(2, "0")}
              </span>
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="w-14 h-14 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 disabled:opacity-20 hover:border-slate-900 transition-all"
            >
              <ArrowUpRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}