"use client";

import { motion } from "framer-motion";
import { Ship, Plane, Truck, Warehouse, ClipboardCheck, Boxes, ShieldCheck, Globe2, Factory, Building2, ShoppingBag, FlameKindling, HeartPulse, Landmark } from "lucide-react";
import { brand } from "@/components/config/brand";
import { Link } from "@/lib/i18n/navigation";


const PRIMARY = brand.colors.primary || "#1e1a63";
const ACCENT = brand.colors.accent || "#ff9d1b";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  viewport: { once: true, amount: 0.3 },
});

export default function HomePage() {
  return (
    <main className=" pt-10">

      {/* CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-24 md:space-y-32 pb-24">

        {/* ───────── SERVICES SECTION ───────── */}
        <section className="">
          <HeaderBlock
            eyebrow="OUR LOGISTICS SOLUTIONS"
            title="End-to-end freight, designed for real-world supply chains."
            desc="HornBox connects ocean, air, road, warehousing, and customs into one integrated logistics engine — built for shippers across the Horn of Africa, GCC, Asia, and Europe."
          />

          <ServicesGrid />
        </section>

        {/* ───────── WHY HORNBOX ───────── */}
        <section>
          <HeaderBlock
            eyebrow="WHY HORNBOX"
            title="More than a forwarder. A long-term logistics partner."
            desc="We combine deep regional knowledge with a global network across 195+ countries and 9,471 partner offices — delivering reliability, visibility, and operational confidence for every shipment."
          />
          <WhyHornBox />
        </section>

        {/* ───────── GLOBAL NETWORK STRIP ───────── */}
        <section>
          <GlobalNetworkStrip />
        </section>

        {/* ───────── INDUSTRIES WE SERVE ───────── */}
        <section>
          <HeaderBlock
            eyebrow="INDUSTRIES WE SERVE"
            title="Logistics tailored to your sector."
            desc="From manufacturing and construction to retail, NGOs, and energy — HornBox designs logistics flows that match the realities of your industry, your cargo, and your markets."
          />

          <IndustriesGrid />
        </section>

        {/* ───────── FINAL CTA ───────── */}
        <section>
          <FinalCTA />
        </section>
      </div>
    </main>
  );
}

/* ──────────────────────────────────────────────────────────────
   SECTION: Reusable header block
────────────────────────────────────────────────────────────── */

type HeaderBlockProps = {
  eyebrow: string;
  title: string;
  desc: string;
};

function HeaderBlock({ eyebrow, title, desc }: HeaderBlockProps) {
  const anim = fadeUp(0.1);
  return (
    <motion.div
      initial={anim.initial}
      whileInView={anim.whileInView}
      transition={anim.transition}
      viewport={anim.viewport}
      className="max-w-3xl text-center mx-auto mb-10 md:mb-12"
    >
      <p
        className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-3"
        style={{ color: ACCENT }}
      >
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
        {title}
      </h2>
      <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SECTION: Services grid
────────────────────────────────────────────────────────────── */

function ServicesGrid() {
  const services = [
    {
      icon: Ship,
      title: "Ocean Freight",
      desc: "FCL, LCL, Ro-Ro, breakbulk, and charter services to major ports worldwide, with stable capacity and predictable transit times.",
    },
    {
      icon: Plane,
      title: "Air Freight",
      desc: "Time-critical and high-value cargo handled with priority routing, airport-to-airport and door-to-door service, and charter options.",
    },
    {
      icon: Truck,
      title: "Road Transport",
      desc: "Regional trucking across Somalia, the Horn of Africa, and GCC corridors — including cross-border moves and last-mile delivery.",
    },
    {
      icon: Warehouse,
      title: "Warehousing & WMS",
      desc: "Secure, bonded storage with pick-pack-ship, consolidation, and inventory control integrated with your supply chain.",
    },
    {
      icon: ClipboardCheck,
      title: "Customs & Compliance",
      desc: "Documentation, HS coding, duty & tax management, and port coordination to keep your cargo moving without delays.",
    },
    {
      icon: Boxes,
      title: "3PL, 4PL & Projects",
      desc: "End-to-end orchestration of complex supply chains, including heavy lift, industrial cargo, and multi-country projects.",
    },
  ];

  return (
    <div className="grid gap-7 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, idx) => {
        const anim = fadeUp(0.1 + idx * 0.05);
        const Icon = service.icon;
        return (
          <motion.div
            key={service.title}
            initial={anim.initial}
            whileInView={anim.whileInView}
            transition={anim.transition}
            viewport={anim.viewport}
            className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 md:p-7 hover:shadow-lg hover:-translate-y-[2px] transition-all duration-300"
          >
            <div
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl mb-4"
              style={{
                background: `${ACCENT}1A`, // accent with alpha
                color: ACCENT,
              }}
            >
              <Icon size={20} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-50">
              {service.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {service.desc}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SECTION: Why HornBox
────────────────────────────────────────────────────────────── */

function WhyHornBox() {
  const items = [
    {
      title: "Global reach, regional strength.",
      desc: "A powerful international network combined with deep understanding of the Horn of Africa, GCC, and key trade lanes.",
    },
    {
      title: "Integrated, not fragmented.",
      desc: "Freight, warehousing, customs, and projects are managed as one system — so you deal with one accountable partner.",
    },
    {
      title: "Operational discipline.",
      desc: "Every shipment is planned, monitored, and communicated clearly, with defined milestones and proactive problem-solving.",
    },
    {
      title: "Project & heavy cargo expertise.",
      desc: "From cranes and forklifts to dedicated engineering and route planning, we handle complex moves with confidence.",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item, idx) => {
        const anim = fadeUp(0.1 + idx * 0.06);
        return (
          <motion.div
            key={item.title}
            initial={anim.initial}
            whileInView={anim.whileInView}
            transition={anim.transition}
            viewport={anim.viewport}
            className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 md:p-7"
          >
            <h3 className="text-base md:text-lg font-semibold mb-2 text-slate-900 dark:text-slate-50">
              {item.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SECTION: Global Network strip
────────────────────────────────────────────────────────────── */

function GlobalNetworkStrip() {
  const anim = fadeUp(0.1);

  const stats = [
    { label: "Countries connected", value: "195+" },
    { label: "Cities & ports", value: "852+" },
    { label: "Partner offices", value: "9,471" },
  ];

  return (
    <motion.div
      initial={anim.initial}
      whileInView={anim.whileInView}
      transition={anim.transition}
      viewport={anim.viewport}
      className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-6 py-8 md:px-10 md:py-10 text-slate-50 relative overflow-hidden"
    >
      <div className="absolute inset-y-0 right-0 w-1/3 opacity-20 pointer-events-none">
        <div className="h-full w-full bg-[radial-gradient(circle_at_0_0,rgba(255,157,27,0.8),transparent_60%),radial-gradient(circle_at_80%_100%,rgba(148,163,184,0.7),transparent_60%)]" />
      </div>

      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="max-w-xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
            <Globe2 size={14} />
            Global Network
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold">
            A logistics footprint that spans the world.
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            HornBox operates through a global alliance of freight forwarders and logistics
            partners, giving you access to capacity and expertise in almost every major
            trade lane on the planet.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 min-w-[260px]">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-center backdrop-blur-sm"
            >
              <div className="text-xl md:text-2xl font-bold text-white">
                {s.value}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wide text-slate-300">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SECTION: Industries grid
────────────────────────────────────────────────────────────── */

function IndustriesGrid() {
  const industries = [
    {
      icon: Factory,
      title: "Manufacturing & Industrial",
      desc: "Machinery, components, semi-finished goods and production inputs.",
    },
    {
      icon: Building2,
      title: "Construction & Infrastructure",
      desc: "Cement, steel, heavy equipment, project cargo and site logistics.",
    },
    {
      icon: ShoppingBag,
      title: "Retail & FMCG",
      desc: "Fast-moving consumer goods, distribution and replenishment flows.",
    },
    {
      icon: HeartPulse,
      title: "Healthcare & Relief",
      desc: "Medical supplies, pharmaceuticals and humanitarian aid logistics.",
    },
    {
      icon: FlameKindling,
      title: "Energy, Oil & Gas",
      desc: "Pipes, rigs, engineering equipment and field support cargo.",
    },
    {
      icon: Landmark,
      title: "Government & NGOs",
      desc: "Strategic projects, public-sector shipments and multi-country programs.",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {industries.map((item, idx) => {
        const anim = fadeUp(0.1 + idx * 0.05);
        const Icon = item.icon;
        return (
          <motion.div
            key={item.title}
            initial={anim.initial}
            whileInView={anim.whileInView}
            transition={anim.transition}
            viewport={anim.viewport}
            className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-5 md:p-6"
          >
            <div className="flex items-start gap-3">
              <div
                className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: `${ACCENT}1A`, color: ACCENT }}
              >
                <Icon size={18} />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-semibold mb-1 text-slate-900 dark:text-slate-50">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SECTION: Final CTA
────────────────────────────────────────────────────────────── */

function FinalCTA() {
  const anim = fadeUp(0.1);

  return (
    <motion.div
      initial={anim.initial}
      whileInView={anim.whileInView}
      transition={anim.transition}
      viewport={anim.viewport}
      className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 px-8 py-12 md:px-10 md:py-14"
      style={{
        background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
        color: "#fff",
      }}
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="h-full w-full bg-[radial-gradient(circle_at_0_0,rgba(255,255,255,0.7),transparent_60%),radial-gradient(circle_at_100%_100%,rgba(15,23,42,0.8),transparent_60%)]" />
      </div>

      <div className="relative max-w-3xl">
        <h3 className="text-2xl md:text-3xl font-semibold mb-3">
          Ready to move your cargo with a global logistics partner?
        </h3>
        <p className="text-sm md:text-base text-white/85 max-w-xl mb-7 leading-relaxed">
          Whether you&apos;re shipping containers, air cargo, project equipment or
          time-critical goods, HornBox is ready to plan, execute and optimize your
          logistics flow — from the Horn of Africa to any major market worldwide.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl px-7 py-3 text-sm font-semibold bg-white text-slate-900 hover:bg-slate-200 transition"
          >
            Request a quote
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold border border-white/60 text-white/90 hover:bg-white/10 transition"
          >
            Learn more about HornBox
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
