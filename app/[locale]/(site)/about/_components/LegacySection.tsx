"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "./animations";

export default function LegacySection() {
  const stats = [
    { label: "Established", value: "2015" },
    { label: "Core Trade Lanes", value: "Horn ↔ GCC ↔ Asia" },
    { label: "Annual TEU Capacity", value: "4,500+" },
  ];

  const milestones = [
    {
      year: "2015",
      title: "Foundation & Local Focus",
      desc: "Operations begin, specializing in regional imports and exports across Somalia.",
    },
    {
      year: "2020",
      title: "Expansion into GCC Corridors",
      desc: "Expanded lanes across Somalia, Kenya, Ethiopia, Djibouti, linking critical ports to the Middle East.",
    },
    {
      year: "2024",
      title: "Global Carrier Partnership",
      desc: "Secured established capacity with premium global ocean and air carriers for worldwide connectivity.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        custom={0}
        className="grid lg:grid-cols-[1.3fr,1fr] gap-12 items-start"
      >
        <motion.div variants={fadeUp(0.1)}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Legacy and Trajectory
          </h2>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed border-l-4 border-neutral-200 dark:border-neutral-800 pl-4">
            HornBox was founded with a clear objective: to become the most
            trusted logistics bridge between the Horn of Africa and the rest of
            the world. Built on deep regional knowledge and international
            freight experience, we combine local insight with global standards.
          </p>
          <p className="mt-4 text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We have grown into a multi-modal logistics provider working with
            corporates, NGOs, government projects and global distributors. Our
            network spans strategic ports, airports and inland corridors across
            East Africa, the Middle East, Europe and Asia.
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-4 text-sm">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-neutral-200 bg-white/70 px-4 py-3 text-left dark:border-neutral-800 dark:bg-neutral-900/50 backdrop-blur"
              >
                <div className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  {stat.label}
                </div>
                <div className="mt-1 text-base font-bold text-yellow-500 dark:text-yellow-400">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp(0.2)}
          className="rounded-3xl border border-neutral-200 bg-white/70 p-6 dark:border-neutral-800 dark:bg-neutral-900 shadow-xl"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">
            Growth Milestones
          </h3>
          <div className="space-y-6 text-sm">
            {milestones.map((e, idx) => (
              <div key={e.year} className="relative pl-6">
                <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-yellow-400" />
                {idx < milestones.length - 1 && (
                  <div className="absolute left-[3px] top-3 bottom-0 w-px bg-neutral-300 dark:bg-neutral-700" />
                )}
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                  {e.year}
                </div>
                <div className="text-base font-bold mt-0.5 text-yellow-500 dark:text-yellow-400">
                  {e.title}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {e.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
