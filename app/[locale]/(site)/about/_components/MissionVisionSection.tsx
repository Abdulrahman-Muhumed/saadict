"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "./animations";

const blocks = [
  {
    title: "Mission: Simplify Trade",
    desc: "To simplify and strengthen global trade for businesses across the Horn of Africa by delivering reliable, efficient and integrated logistics solutions.",
  },
  {
    title: "Vision: Leading Gateway",
    desc: "To become the leading logistics gateway for East Africa, enabling seamless connectivity between regional markets and the world.",
  },
  {
    title: "Core Values: Integrity & Excellence",
    desc: "Unwavering reliability, integrity in documentation, client-focused problem-solving, and continuous innovation in operational execution.",
  },
];

export default function MissionVisionSection() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20 md:py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          variants={fadeUp(0.1)}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Strategic Foundation
          </h2>
          <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-400">
            Our mission, vision, and core values drive a culture of reliability
            and client partnership.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {blocks.map((v, i) => (
            <motion.div
              key={v.title}
              variants={fadeUp(0.15 + i * 0.05)}
              className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-yellow-500 mb-2">
                {v.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
