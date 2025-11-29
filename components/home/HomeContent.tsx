"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import {
  Ship,
  Plane,
  Truck,
  Warehouse,
  ClipboardCheck,
  Boxes,
  Globe2,
  Factory,
  Building2,
  ShoppingBag,
  FlameKindling,
  HeartPulse,
  Landmark,
} from "lucide-react";
import { brand } from "@/components/config/brand";
import { Link } from "@/lib/i18n/navigation";

const PRIMARY = brand.colors.primary || "#1e1a63";
const ACCENT = brand.colors.accent || "#ff9d1b";
const ACCENT_BG = `${ACCENT}1A`;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  },
  viewport: { once: true, amount: 0.3 },
});

function HomePage() {
  return (
    <main className="pt-10 md:pt-12">
      {/* CONTENT WRAPPER */}
      <div className="mx-auto max-w-7xl space-y-20 pb-24 px-6 md:space-y-28 md:px-8 lg:space-y-32">
        {/* SERVICES SECTION */}
        <section>
          <HeaderBlock
            eyebrow="OUR LOGISTICS SOLUTIONS"
            title="End-to-end freight, designed for real-world supply chains."
            desc="HornBox connects ocean, air, road, warehousing, and customs into one integrated logistics engine — built for shippers across the Horn of Africa, GCC, Asia, and Europe."
          />
          <ServicesGrid />
        </section>

        {/* WHY HORNBOX */}
        <section>
          <HeaderBlock
            eyebrow="WHY HORNBOX"
            title="More than a forwarder. A long-term logistics partner."
            desc="We combine deep regional knowledge with a global network across 195+ countries and 9,471 partner offices — delivering reliability, visibility, and operational confidence for every shipment."
          />
          <WhyHornBox />
        </section>

        {/* GLOBAL NETWORK STRIP */}
        <section>
          <GlobalNetworkStrip />
        </section>

        {/* INDUSTRIES WE SERVE */}
        <section>
          <HeaderBlock
            eyebrow="INDUSTRIES WE SERVE"
            title="Logistics tailored to your sector."
            desc="From manufacturing and construction to retail, NGOs, and energy — HornBox designs logistics flows that match the realities of your industry, your cargo, and your markets."
          />
          <IndustriesGrid />
        </section>

        {/* FINAL CTA */}
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

const HeaderBlock = memo(function HeaderBlock({
  eyebrow,
  title,
  desc,
}: HeaderBlockProps) {
  const anim = fadeUp(0.1);
  return (
    <motion.div
      initial={anim.initial}
      whileInView={anim.whileInView}
      transition={anim.transition}
      viewport={anim.viewport}
      className="mx-auto mb-10 max-w-3xl text-center md:mb-12"
    >
      <p
        className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] md:text-sm"
        style={{ color: ACCENT }}
      >
        {eyebrow}
      </p>
      <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
        {desc}
      </p>
    </motion.div>
  );
});

/* ──────────────────────────────────────────────────────────────
   SECTION: Services grid
────────────────────────────────────────────────────────────── */

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

function ServicesGrid() {
  return (
    <div className="grid gap-7 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
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
            className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80 md:p-7"
          >
            <div
              className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                background: ACCENT_BG,
                color: ACCENT,
              }}
            >
              <Icon size={20} />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-50">
              {service.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
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

const whyItems = [
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

function WhyHornBox() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {whyItems.map((item, idx) => {
        const anim = fadeUp(0.1 + idx * 0.06);
        return (
          <motion.div
            key={item.title}
            initial={anim.initial}
            whileInView={anim.whileInView}
            transition={anim.transition}
            viewport={anim.viewport}
            className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 md:p-7"
          >
            <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-50 md:text-lg">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
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

const networkStats = [
  { label: "Countries connected", value: "195+" },
  { label: "Cities & ports", value: "852+" },
  { label: "Partner offices", value: "9,471" },
];

function GlobalNetworkStrip() {
  const anim = fadeUp(0.1);

  return (
    <motion.div
      initial={anim.initial}
      whileInView={anim.whileInView}
      transition={anim.transition}
      viewport={anim.viewport}
      className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 px-6 py-8 text-slate-50 dark:border-slate-800 md:px-10 md:py-10"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 opacity-20">
        <div className="h-full w-full bg-[radial-gradient(circle_at_0_0,rgba(255,157,27,0.8),transparent_60%),radial-gradient(circle_at_80%_100%,rgba(148,163,184,0.7),transparent_60%)]" />
      </div>

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
            <Globe2 size={14} />
            Global Network
          </div>
          <h3 className="text-2xl font-semibold md:text-3xl">
            A logistics footprint that spans the world.
          </h3>
          <p className="text-sm leading-relaxed text-slate-300 md:text-base">
            HornBox operates through a global alliance of freight forwarders and
            logistics partners, giving you access to capacity and expertise in
            almost every major trade lane on the planet.
          </p>
        </div>

        <div className="grid min-w-[260px] grid-cols-3 gap-4">
          {networkStats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur-sm"
            >
              <div className="text-xl font-bold text-white md:text-2xl">
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

function IndustriesGrid() {
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
            className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 md:p-6"
          >
            <div className="flex items-start gap-3">
              <div
                className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: ACCENT_BG, color: ACCENT }}
              >
                <Icon size={18} />
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-50 md:text-base">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 md:text-sm">
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
      className="relative overflow-hidden rounded-3xl border border-slate-200/80 px-8 py-12 md:px-10 md:py-14 dark:border-slate-800"
      style={{
        background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
        color: "#fff",
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="h-full w-full bg-[radial-gradient(circle_at_0_0,rgba(255,255,255,0.7),transparent_60%),radial-gradient(circle_at_100%_100%,rgba(15,23,42,0.8),transparent_60%)]" />
      </div>

      <div className="relative max-w-7xl text-center">
        <h3 className="mb-3 text-2xl font-semibold md:text-3xl">
          Ready to move your cargo with a global logistics partner?
        </h3>
        <p className="mb-7 max-w-4xl mx-auto text-sm leading-relaxed text-white/85 md:text-base">
          Whether you&apos;re shipping containers, air cargo, project equipment
          or time-critical goods, HornBox is ready to plan, execute and optimize
          your logistics flow — from the Horn of Africa to any major market
          worldwide.
        </p>

        <div className="flex flex-wrap gap-4 mx-auto justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            Request a quote
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-xl border border-white/60 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
          >
            Learn more about HornBox
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(HomePage);
