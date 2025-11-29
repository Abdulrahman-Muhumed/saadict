"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Globe2,
  Ship,
  Plane,
  Truck,
  Factory,
  Building2,
  MapPin,
  Users2,
  ArrowRight,
  CircleCheck,
  Award, // New icon for Professionalism/Accreditation
  Shield, // New icon for Reliability/Safety
  Layers, // New icon for Integrated Solutions
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────
    Animation helpers
────────────────────────────────────────────────────────────── */

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

const staggerContainer = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: delay,
    },
  }),
};

/* ──────────────────────────────────────────────────────────────
    Data for the new 'Professional Edge' section
────────────────────────────────────────────────────────────── */
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


export default function AboutPage() {
  return (
    <main className="relative w-full overflow-hidden  text-slate-900 dark:text-slate-100 font-sans selection:bg-yellow-400 selection:text-black">
      
      {/* ========================================================= */}
      {/* HERO SECTION                                               */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden pt-12 md:pt-24 lg:pt-24 pb-20 md:pb-24">   
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT — TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.25, 1, 0.3, 1] as any }}
            className="max-w-xl"
          >
            {/* Badge */}
            <p className="inline-flex items-center gap-2 rounded-full 
             bg-yellow-400/10 dark:bg-yellow-300/10 
             border border-yellow-400/30 dark:border-yellow-300/20 
             px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]
             text-yellow-700 dark:text-yellow-300 backdrop-blur">
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
              HornBox Logistics is a strategic, multi-modal freight partner built on deep regional knowledge and uncompromising global standards. We engineer efficiency and reliability into every major trade lane connecting the Horn of Africa.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <CircleCheck size={18} className="text-yellow-500" />
                Specialists in complex and essential cargo
              </div>
            </div>
          </motion.div>

          {/* RIGHT — ANIMATED IMAGE PANEL (Simplified for design matching) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.3, 1] as any }}
            className="relative"
          >
            {/* Floating Card */}
            <div
              className="rounded-3xl overflow-hidden border 
               border-neutral-200 dark:border-neutral-800 
               bg-white dark:bg-neutral-900 shadow-2xl"
            >
              <div className="relative h-[360px] w-full">

                <Image
                  src="/about/hg_about1.jpg" // ← replace with your image
                  alt="HornBox Global Logistics"
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Bottom Info Strip (Updated to match services page ticker style) */}
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

      {/* ========================================================= */}
      {/* NEW: PROFESSIONAL EDGE (Technical Capabilities Grid)                                      */}
      {/* ========================================================= */}
      <section className="py-16 md:py-24 bg-white dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={fadeUp(0.1)} className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Our Professional Edge
              </h2>
              <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-400">
                We operate with the highest levels of certification, security, and technological integration.
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

      {/* ========================================================= */}
      {/* OUR STORY + TIMELINE (Now focused on legacy and growth)                                      */}
      {/* ========================================================= */}
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
              trusted logistics bridge between the Horn of Africa and the rest
              of the world. Built on deep regional knowledge and international
              freight experience, we combine local insight with global
              standards.
            </p>
            <p className="mt-4 text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We have grown into a multi-modal logistics provider working with
              corporates, NGOs, government projects and global distributors. Our
              network spans strategic ports, airports and inland corridors
              across East Africa, the Middle East, Europe and Asia.
            </p>

            <div className="mt-8 grid sm:grid-cols-3 gap-4 text-sm">
              {[
                { label: "Established", value: "2015" },
                { label: "Core Trade Lanes", value: "Horn ↔ GCC ↔ Asia" },
                { label: "Annual TEU Capacity", value: "4,500+" },
              ].map((stat) => (
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
              {[
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
              ].map((e, idx) => (
                <div key={e.year} className="relative pl-6">
                  <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-yellow-400" />
                  {idx < 2 && (
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

      {/* ========================================================= */}
      {/* WHAT WE DO (Now "Our Integrated Solutions")                                              */}
      {/* ========================================================= */}
      <section className="py-20 md:py-24 bg-white dark:bg-neutral-900 border-y border-neutral-200/60 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-6">
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
                We provide end-to-end logistics coverage – from first mile to last mile – with specialized multi-modal operations.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
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
              ].map((item, i) => {
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

      {/* ========================================================= */}
      {/* MISSION / VISION / VALUES (Updated to be punchier)                                 */}
      {/* ========================================================= */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
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
              Our mission, vision, and core values drive a culture of reliability and client partnership.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
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
            ].map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp(0.15 + i * 0.05)}
                className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 shadow-sm hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold text-yellow-500 mb-2">{v.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* NETWORK STRIP (Used as a footer/closing statement)                                             */}
      {/* ========================================================= */}
      <section className="py-16 bg-black text-white dark:bg-black">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-xl"
          >
            <h2 className="text-3xl font-bold mb-3">
              Strategic Coverage Across Key Global Lanes
            </h2>
            <p className="text-base text-white/80">
              From Mogadishu to Mombasa, Berbera to Djibouti, HornBox connects
              regional corridors with global hubs in the Middle East, Asia,
              Europe and North America, ensuring your cargo reaches its destination efficiently.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/70">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                <MapPin size={14} className="text-yellow-400" />
                Key Ports: Mogadishu, Berbera, Bosaso, Mombasa, Djibouti
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative w-full max-w-md h-52 rounded-3xl border border-yellow-400/30 bg-gradient-to-br from-black/50 to-yellow-400/10 overflow-hidden shadow-2xl shadow-yellow-400/10"
          >
            <Image
              src="/home/home_bg2.jpg"
              alt="HornBox Network"
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-yellow-400/10" />
            <div className="relative z-10 h-full flex flex-col justify-between p-5 text-xs">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-white/80">
                  <Users2 size={16} />
                  Global Carrier Alliances
                </span>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] text-emerald-200 font-bold uppercase">
                  ACTIVE
                </span>
              </div>
              <div className="space-y-2 text-white/85">
                <div className="flex justify-between font-mono">
                  <span>Countries Connected</span>
                  <span className="font-extrabold text-yellow-400">195+</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Service Modes</span>
                  <span className="font-extrabold text-yellow-400">SEA • AIR • ROAD</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CTA                                                       */}
      {/* ========================================================= */}
      <section className="py-20 md:py-24 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Ready to Partner with a Logistical Powerhouse?
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Whether it's a single pallet, a full container or complex
            project cargo, our expert team is ready to deliver assured logistics
            for your business.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-black bg-yellow-400 shadow-md hover:bg-yellow-300 transition uppercase tracking-wider"
            >
              Contact Our Sales Team
              <ArrowRight size={18} />
            </a>
            <a
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold border border-neutral-300 text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-900"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}