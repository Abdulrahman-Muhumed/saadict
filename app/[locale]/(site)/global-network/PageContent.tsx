"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Ship,
  Plane,
  Truck,
  Boxes,
  Globe,
  MapPin,
  Handshake,
  CornerRightUp,
} from "lucide-react";

import GlobalNetworkHero from "./_components/GlobalNetworkHero";
import {Link} from "@/lib/i18n/navigation";
// BRAND SYSTEM
const TEXT_DARK = "text-slate-900 dark:text-white";
const TEXT_MUTED = "text-slate-600 dark:text-neutral-400";
const BG_CARD = "bg-white/70 dark:bg-neutral-900/50 backdrop-blur-md";
const BORDER = "border-slate-200 dark:border-yellow-500/20";

// Smooth fade-up animation (GPU only)
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.25, 1, 0.3, 1] as any,
    },
  },
});

export default function GlobalNetworkPage() {
  return (
    <main className="flex flex-col">

      {/* HERO */}
      <GlobalNetworkHero />

      {/* MAIN CONTENT */}
      <motion.div initial="hidden" animate="show">

        <hr className="border-t border-slate-300 dark:border-neutral-800" />

        {/* ============================================================ */}
        {/* SECTION 1 — WHY OUR NETWORK MATTERS                         */}
        {/* ============================================================ */}
        <section className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 text-center">

            <motion.h2
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="text-4xl md:text-5xl font-extrabold"
            >
              Why the{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200 dark:from-yellow-300 dark:to-yellow-500">
                HornBox Network
              </span>{" "}
              Matters
            </motion.h2>

            <motion.p
              variants={fadeUp(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className={`mt-5 text-lg max-w-3xl mx-auto leading-relaxed ${TEXT_MUTED}`}
            >
              Our global ecosystem connects the Horn of Africa to the world’s
              highest-value markets — enabling real-time routing, smart
              consolidation, and reliable end-to-end trade visibility.
            </motion.p>

            {/* Feature Cards */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Globe,
                  title: "Global Reach",
                  desc: "Ocean, air & road operations across 195+ countries.",
                },
                {
                  icon: MapPin,
                  title: "Regional Priority",
                  desc: "Strong throughput across Somalia, Kenya, Ethiopia & Djibouti.",
                },
                {
                  icon: Handshake,
                  title: "Seamless Integration",
                  desc: "Freight, customs, warehousing & project cargo — unified.",
                },
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp(0.2 + i * 0.08)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className={`
                      p-8 rounded-3xl border ${BORDER} ${BG_CARD}
                      shadow-lg dark:shadow-yellow-500/10
                      transition-all duration-300
                      hover:shadow-xl hover:shadow-yellow-500/20 hover:-translate-y-1
                    `}
                  >
                    <Icon className="text-yellow-500 dark:text-yellow-300 mb-4" size={36} />
                    <h3 className={`text-xl font-bold ${TEXT_DARK} mb-2`}>{card.title}</h3>
                    <p className={`text-sm leading-relaxed ${TEXT_MUTED}`}>{card.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <hr className="border-t border-slate-300 dark:border-neutral-800" />

        {/* ============================================================ */}
        {/* SECTION 2 — GLOBAL CORRIDORS                                */}
        {/* ============================================================ */}
        <section className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">

            <motion.h2
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-center"
            >
              Global Corridors Connecting the Horn to the World
            </motion.h2>

            <motion.p
              variants={fadeUp(0.12)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`mt-5 text-lg text-center max-w-3xl mx-auto leading-relaxed ${TEXT_MUTED}`}
            >
              High-capacity lanes linking Africa, the Middle East, Europe, Asia
              and the Americas with predictable schedules and stable transit.
            </motion.p>

            {/* Corridor Grid */}
            <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  title: "Horn of Africa → Asia",
                  desc: "China • Singapore • India • Vietnam • Malaysia",
                  img: "/global/corridor_asia.jpg",
                },
                {
                  title: "Horn of Africa → Middle East",
                  desc: "UAE • Saudi Arabia • Qatar • Oman • Kuwait",
                  img: "/global/corridor_me.jpg",
                },
                {
                  title: "Horn of Africa → Europe",
                  desc: "Turkey • UK • Italy • Germany • Netherlands",
                  img: "/global/corridor_eu.jpg",
                },
                {
                  title: "Horn of Africa → East Africa",
                  desc: "Kenya • Uganda • Tanzania • Rwanda • South Sudan",
                  img: "/global/corridor_ea.jpg",
                },
                {
                  title: "Horn of Africa → Americas",
                  desc: "USA • Canada • Brazil • Mexico • Chile",
                  img: "/global/corridor_us.jpg",
                },
                {
                  title: "Horn of Africa → Global Projects",
                  desc: "Energy • Humanitarian • Industrial Logistics",
                  img: "/global/corridor_projects.jpg",
                },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp(0.15 + i * 0.1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  className={`
                    rounded-3xl overflow-hidden border ${BORDER}
                    bg-white dark:bg-neutral-900
                    shadow-xl dark:shadow-yellow-500/10
                    hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-500/20
                    transition-all duration-300
                  `}
                >
                  <div className="relative h-48 w-full group overflow-hidden">
                    <Image
                      src={c.img}
                      alt={c.title}
                      fill
                      className="
                        object-cover 
                        transition-transform duration-700 
                        group-hover:scale-105
                      "
                    />

                    {/* Overlay */}
                    <div className="
                      absolute inset-0
                      bg-gradient-to-t from-yellow-500/20 dark:from-yellow-300/15 to-transparent
                      opacity-60 group-hover:opacity-40
                      transition
                    " />
                  </div>

                  <div className="p-6">
                    <h3 className={`text-xl font-semibold ${TEXT_DARK}`}>{c.title}</h3>
                    <p className={`mt-2 text-sm leading-relaxed ${TEXT_MUTED}`}>{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-t border-slate-300 dark:border-neutral-800" />

        {/* ============================================================ */}
        {/* SECTION 3 — MULTI-MODAL FREIGHT                             */}
        {/* ============================================================ */}
        <section className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">

            <motion.h2
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-center"
            >
              Multi-Modal Network Coverage
            </motion.h2>

            <motion.p
              variants={fadeUp(0.12)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`mt-5 text-lg text-center max-w-2xl mx-auto ${TEXT_MUTED}`}
            >
              From sea to air to road — optimized, connected and fully integrated.
            </motion.p>

            {/* Modes */}
            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Ship,
                  title: "Ocean Freight",
                  desc: "FCL, LCL, breakbulk, heavy-lift & Ro-Ro cargo.",
                },
                {
                  icon: Plane,
                  title: "Air Freight",
                  desc: "Time-critical, consolidated & express shipments.",
                },
                {
                  icon: Truck,
                  title: "Road Transport",
                  desc: "Long-haul trucking & regional distribution.",
                },
                {
                  icon: Boxes,
                  title: "Project Cargo",
                  desc: "Industrial, humanitarian & oversized freight.",
                },
              ].map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp(0.15 + i * 0.08)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className={`
                      rounded-3xl border ${BORDER} ${BG_CARD}
                      p-6 shadow-xl dark:shadow-yellow-500/10
                      transition-all duration-300 
                      hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-500/20
                    `}
                  >
                    <Icon size={40} className="text-yellow-500 dark:text-yellow-300 mb-4" />
                    <h3 className={`text-lg font-semibold ${TEXT_DARK}`}>{m.title}</h3>
                    <p className={`text-sm mt-2 ${TEXT_MUTED}`}>{m.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <hr className="border-t border-slate-300 dark:border-neutral-800" />

        {/* ============================================================ */}
        {/* CTA SECTION                                                  */}
        {/* ============================================================ */}
        <section className="py-24">
          <div
            className="
              max-w-6xl mx-auto px-6 p-10 rounded-3xl
              border border-yellow-500/30
              bg-white dark:bg-neutral-900
              shadow-2xl shadow-yellow-900/20
              flex flex-col md:flex-row items-center justify-between gap-10
            "
          >
            <div className="md:max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Have a special route or complex logistics request?
              </h2>
              <p className={`mt-3 text-lg ${TEXT_MUTED}`}>
                Connect with our Tier-1 Strategic Logistics Control Team.
              </p>
            </div>

            <Link
              href="/contact"
              className="
                inline-flex items-center gap-3 px-8 py-4 rounded-xl
                bg-yellow-500 hover:bg-yellow-400
                dark:bg-yellow-300 dark:hover:bg-yellow-200
                text-black font-bold shadow-lg shadow-yellow-500/30
                transition
              "
            >
              Contact HornBox <CornerRightUp size={18} />
            </Link>
          </div>
        </section>
        
      </motion.div>
    </main>
  );
}
