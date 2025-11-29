"use client";

import { motion } from "framer-motion";
import { Ship, Plane, Truck, Factory, Building2, Globe2 } from "lucide-react";
import { fadeUp, staggerContainer } from "./animations";

const solutions = [
  {
    icon: Ship,
    title: "Ocean Freight",
    desc: "FCL & LCL services, strategic carrier partnerships, reliable mainline and feeder routes across key global ports.",
  },
  {
    icon: Plane,
    title: "Air Freight",
    desc: "Express and premium air freight via major hubs such as DXB, DOH, IST, ADD, NBO and beyond.",
  },
  {
    icon: Truck,
    title: "Road Transport",
    desc: "Regional trucking linking Somalia, Kenya, Ethiopia, Djibouti and GCC markets with door-to-door delivery.",
  },
  {
    icon: Factory,
    title: "Warehousing",
    desc: "Secure storage, inventory handling, cross-docking, consolidation and regional distribution operations.",
  },
  {
    icon: Building2,
    title: "Customs & Compliance",
    desc: "Documentation, customs clearance, and regulatory alignment across multiple jurisdictions and ports.",
  },
  {
    icon: Globe2,
    title: "Trade & Project Support",
    desc: "Support for NGOs, government contracts, industrial projects and complex supply chain requirements.",
  },
];

export default function IntegratedSolutionsSection() {
  return (
    <section className="py-20 md:py-24 bg-white dark:bg-neutral-900 border-y border-neutral-200/60 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-8">
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
              Our Integrated Logistics Solutions
            </h2>
            <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-400">
              We provide end-to-end logistics coverage – from first mile to last
              mile – with specialized multi-modal operations.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp(0.15 + i * 0.05)}
                  className="group rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950/50 backdrop-blur"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/15 text-yellow-600 dark:bg-yellow-300/15 dark:text-yellow-300">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-bold text-base">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
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
