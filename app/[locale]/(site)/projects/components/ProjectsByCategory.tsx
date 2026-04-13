"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/lib/projects";

export default function ProjectsByCategory() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  // Group projects by category
  const grouped = projects.reduce<Record<string, Project[]>>((acc, project) => {
    if (project.featured) return acc; // exclude featured (already shown)

    if (!acc[project.category]) acc[project.category] = [];
    acc[project.category].push(project);

    return acc;
  }, {});

  const categories = Object.entries(grouped);

  if (!categories.length) return null;

  return (
    <section className="bg-white dark:bg-[#080809] py-28">
      <div className="max-w-7xl mx-auto px-8 space-y-24">
        {categories.map(([category, items]) => (
          <div key={category}>
            {/* Header */}
            <div className="mb-10 max-w-xl">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                {category}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Specialized deployments and implementations within {category.toLowerCase()} systems.
              </p>
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.slice(0, 6).map((project) => {
                const isActive = activeId === project.id;

                return (
                  <div
                    key={project.id}
                    className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative h-[180px] w-full">
                      <Image
                        src={project.coverImage}
                        alt={project.coverImageAlt}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                        {project.title}
                      </h4>

                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        {project.shortDescription}
                      </p>

                      <button
                        onClick={() => toggle(project.id)}
                        className="text-xs text-orange-500 hover:underline"
                      >
                        {isActive ? "Hide Details" : "View Details"}
                      </button>

                      {/* Expand */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35 }}
                            className="overflow-hidden mt-4 border-t border-slate-200 dark:border-white/10 pt-4"
                          >
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                              {project.fullDescription}
                            </p>

                            {project.technologies && (
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, i) => (
                                  <span
                                    key={i}
                                    className="text-xs px-2 py-1 border border-slate-200 dark:border-white/10 rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}