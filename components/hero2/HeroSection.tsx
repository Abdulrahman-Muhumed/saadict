"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Ship, Plane, Truck, Globe2 } from "lucide-react";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, duration: 0.5 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

type ModeKey = "ocean" | "air" | "road";

const KPI_DEF = [
  { key: "transit" as const, title: "Transit" },
  { key: "onTime" as const, title: "On-time" },
  { key: "projects" as const, title: "Projects" },
];

type KpiKey = (typeof KPI_DEF)[number]["key"];

type ModeConfig = {
  label: string;
  summary: string;
  transit: string;
  onTime: string;
  projects: string;
};

const MODE_CONFIG: Record<ModeKey, ModeConfig> = {
  ocean: {
    label: "Ocean",
    summary: "Core lanes: Jebel Ali, Mombasa, Djibouti, Jeddah.",
    transit: "12–28d",
    onTime: "97%",
    projects: "18",
  },
  air: {
    label: "Air",
    summary: "Express routes via DXB, DOH, IST, ADD.",
    transit: "1–5d",
    onTime: "99%",
    projects: "9",
  },
  road: {
    label: "Road",
    summary: "Regional moves: Somalia, Kenya, Ethiopia, GCC.",
    transit: "2–10d",
    onTime: "95%",
    projects: "36",
  },
};

export default function HeroSection() {
  const [activeMode, setActiveMode] = useState<ModeKey>("ocean");
  const [lastUpdated, setLastUpdated] = useState(0);

  const [isMobile, setIsMobile] = useState(false);


  // Simulated "live" ticker
  useEffect(() => {
    const id = setInterval(() => {
      setLastUpdated((sec) => (sec >= 55 ? 0 : sec + 5));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Define matchMedia query
    const mq = window.matchMedia("(max-width: 768px)");

    // Set initial value
    setIsMobile(mq.matches);

    // Update when viewport changes
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);

    return () => mq.removeEventListener("change", handler);
  }, []);

  const src = isMobile ? "/home/vid2.mp4" : "/home/vid1.mp4";

  const mode = MODE_CONFIG[activeMode];

  return (
    <section className="relative min-h-[100vh] -mt-[80px] pt-[80px] overflow-hidden">
      {/* ========================================================= */}
      {/*  FULL BACKGROUND WITH DARK/LIGHT AWARE OVERLAYS           */}
      {/* ========================================================= */}
      <div className=" inset-0 -z-10">
        <div className=" w-full h-full">
          {/* Base Background vid */}
          <video
            key={src} // important: forces reload when src changes
            autoPlay
            loop
            muted
            playsInline
            className="object-fill absolute top-0 object-center opacity-95 dark:opacity-[0.8]"
          >
            <source src={src} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>


          {/* Light Mode Overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] dark:hidden" />

          {/* Dark Mode Overlay */}
          <div className="absolute inset-0 hidden dark:block bg-black/50 backdrop-blur-[2px]" />


        </div>
      </div>

      {/* ========================================================= */}
      {/*  HERO CONTENT                                             */}
      {/* ========================================================= */}
      <div className="relative z-10 mx-auto max-w-7xl min-h-[88vh] flex flex-col lg:flex-row items-center justify-between gap-16 px-8 py-20">
        {/* LEFT SIDE */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          {/* Badge */}
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white/70 px-4 py-1.5 text-xs font-semibold text-black/80 backdrop-blur dark:border-white/20 dark:bg-black/40 dark:text-white/90"
          >
            <span className="h-2 w-2 rounded-full bg-yellow-400 dark:bg-yellow-300" />
            HORN OF AFRICA • GLOBAL LOGISTICS
          </motion.div>


          {/* Title */}
          <motion.h1
            variants={item}
            className="mt-5 text-5xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white"
          >
            Logistics that
            <span className="text-transparent ml-4 bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">
              connect the Horn to the world.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={item}
            className="mt-5 text-lg text-neutral-200  leading-relaxed max-w-xl border-l-4 border-yellow-400 pl-6"
          >
            HornBox delivers global freight solutions via sea, air, road,
            warehousing and project cargo — powered by a trusted network in
            195+ countries.
          </motion.p>

          {/* CTA */}
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <a
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-black bg-yellow-400 shadow-md hover:bg-yellow-300 dark:text-black dark:bg-yellow-300 dark:hover:bg-yellow-200"
            >
              Explore Our Services
              <ArrowRight size={18} />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-10 grid grid-cols-3 gap-4 text-center"
          >
            {[
              { label: "Countries", value: "195+" },
              { label: "Cities", value: "852" },
              { label: "Offices", value: "9,471" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-4 border border-black/10 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-black/40"
              >
                <div className="text-xl font-bold text-black dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-black/60 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: LIVE NETWORK PANEL */}
        <motion.div variants={item} className="w-full max-w-md">
          <div className="rounded-3xl p-5 border shadow-xl border-black/10 bg-white/40 backdrop-blur dark:border-white/10 dark:bg-black/40">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/10 pb-3 dark:border-white/10">
              <div className="flex items-center gap-2 text-xs font-semibold text-black/80 dark:text-white/90">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400/20 text-yellow-700 dark:bg-yellow-300/15 dark:text-yellow-300">
                  <Globe2 size={14} />
                </span>
                Live Network
              </div>

              <span className="inline-flex items-center gap-1 text-[11px] px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
            </div>

            {/* Modes */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-medium">
              {(
                [
                  { key: "ocean", label: "Ocean", icon: Ship },
                  { key: "air", label: "Air", icon: Plane },
                  { key: "road", label: "Road", icon: Truck },
                ] as const
              ).map((modeItem) => {
                const Icon = modeItem.icon;
                const active = activeMode === modeItem.key;
                return (
                  <button
                    key={modeItem.key}
                    type="button"
                    onClick={() => setActiveMode(modeItem.key)}
                    className={[
                      "flex flex-col items-center rounded-2xl border px-3 py-3.5 focus:outline-none transition-all",
                      active
                        ? "border-yellow-400/80 bg-yellow-400/10 text-yellow-700 dark:border-yellow-300 dark:bg-yellow-300/10 dark:text-yellow-200"
                        : "border-black/10 bg-white/60 text-black/70 hover:bg-white/80 dark:border-white/10 dark:bg-black/40 dark:text-slate-300 dark:hover:bg-black/60",
                    ].join(" ")}
                  >
                    <Icon size={18} className="mb-1" />
                    {modeItem.label}
                  </button>
                );
              })}
            </div>

            {/* Map */}
            <div className="mt-5 h-40 relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
              <Image
                src="/home/home_bg2.jpg"
                alt="Global Routes"
                fill
                className="object-cover opacity-85 dark:opacity-60"
              />
              <div className="absolute bottom-2 left-2 rounded-full bg-black/70 px-3 py-1 text-[10px] text-white/90 dark:bg-black/80">
                Active mode: {mode.label}
              </div>
            </div>

            {/* KPIs */}
            <div className="mt-4 grid grid-cols-3 gap-3 text-[11px]">
              {KPI_DEF.map((kpi) => (
                <div
                  key={kpi.key}
                  className="rounded-xl p-3 bg-white/70 text-black dark:bg-black/40 dark:text-white/90"
                >
                  <div className="uppercase text-[10px] text-black/50 dark:text-slate-400">
                    {kpi.title}
                  </div>
                  <div className="font-semibold">
                    {mode[kpi.key as KpiKey]}
                  </div>
                </div>
              ))}
            </div>

            {/* Live footer summary */}
            <div className="mt-3 flex items-center justify-between text-[10px] text-black/60 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Updated{" "}
                {lastUpdated === 0 ? "just now" : `${lastUpdated}s ago`}
              </span>
              <span className="truncate text-right max-w-[60%]">
                {mode.summary}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
