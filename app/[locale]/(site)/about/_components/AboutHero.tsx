"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe2, CircleCheck } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-12 md:pt-24 lg:pt-24 pb-20 md:pb-24">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT — TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.25, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          {/* Badge */}
          <p
            className="inline-flex items-center gap-2 rounded-full 
             bg-yellow-400/10 dark:bg-yellow-300/10 
             border border-yellow-400/30 dark:border-yellow-300/20 
             px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]
             text-yellow-700 dark:text-yellow-300 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
            ABOUT HORNBOX LOGISTICS
          </p>

          {/* Title */}
          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
            The Engine of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">
              East African
            </span>{" "}
            Trade.
          </h1>

          {/* Description */}
          <p className="mt-5 text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl border-l-4 border-yellow-400 pl-6">
            HornBox Logistics is a strategic, multi-modal freight partner built
            on deep regional knowledge and uncompromising global standards. We
            engineer efficiency and reliability into every major trade lane
            connecting the Horn of Africa.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <CircleCheck size={18} className="text-yellow-500" />
              Specialists in complex and essential cargo
            </div>
          </div>
        </motion.div>

        {/* RIGHT — ANIMATED IMAGE PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.3, 1] }}
          className="relative"
        >
          <div
            className="rounded-3xl overflow-hidden border 
             border-neutral-200 dark:border-neutral-800 
             bg-white dark:bg-neutral-900 shadow-2xl"
          >
            <div className="relative h-[360px] w-full">
              <Image
                src="/about/hg_about1.jpg"
                alt="HornBox Global Logistics"
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Bottom Info Strip */}
            <div className="p-5 flex items-center justify-between bg-neutral-100 dark:bg-black/60">
              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  Network Footprint
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Ports in 195+ Countries • GCC Trade Focus
                </p>
              </div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="hidden sm:block"
              >
                <Globe2 size={38} className="text-yellow-500" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
