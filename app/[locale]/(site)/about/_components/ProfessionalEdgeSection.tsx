"use client";

import { motion } from "framer-motion";
import { Award, Shield, Layers } from "lucide-react";
import { fadeUp, staggerContainer } from "./animations";

const PROFESSIONAL_EDGE = [
  {
    icon: Award,
    title: "Accredited Expertise",
    desc: "Licensed freight forwarder with regional certifications and deep customs brokerage authority in key East African ports.",
  },
  {
    icon: Shield,
    title: "Risk Mitigation",
    desc: "Proprietary security protocols, comprehensive cargo insurance, and 24/7 geopolitical risk monitoring for every route.",
  },
  {
    icon: Layers,
    title: "Integrated Systems",
    desc: "Our technology connects logistics planning, documentation, tracking, and final mile delivery into one seamless workflow.",
  },
];

export default function ProfessionalEdgeSection() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={fadeUp(0.1)}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Our Professional Edge
            </h2>
            <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-400">
              We operate with the highest levels of certification, security, and
              technological integration.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {PROFESSIONAL_EDGE.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp(0.15 + i * 0.05)}
                  className="group rounded-xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm transition hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <Icon size={32} className="text-yellow-500 mb-3" />
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
