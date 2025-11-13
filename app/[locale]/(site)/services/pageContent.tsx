"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ClipboardList,
  Users,
  FileText,
  Hotel,
  BusFront,
  CreditCard,
  ShieldCheck,
  BarChart3,
  Headphones,
  ArrowRight,
} from "lucide-react";

const PRIMARY = "#241c72";
const ACCENT = "#F99417";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  viewport: { once: true, amount: 0.4 },
});

// map icon keys from translations → lucide components
const iconMap: Record<string, React.ComponentType<any>> = {
  booking: ClipboardList,
  id: Users,
  documents: FileText,
  hotel: Hotel,
  transport: BusFront,
  finance: CreditCard,
  security: ShieldCheck,
  analytics: BarChart3,
  support: Headphones,
};

export default function PageContent() {
  const t = useTranslations("portalServices");

  const hero = {
    badge: t("hero.badge"),
    title: t("hero.title"),
    desc: t("hero.desc"),
  };

  // groups come as an array from JSON; each item has { heading, desc, items: [{ icon, title, desc }] }
  const serviceGroups = t.raw("groups") as Array<{
    heading: string;
    desc: string;
    items: Array<{ icon: string; title: string; desc: string }>;
  }>;

  const cta = {
    title: t("cta.title"),
    desc: t("cta.desc"),
    button: t("cta.button"),
  };

  return (
    <main className="relative min-h-screen text-slate-900 dark:text-slate-100">
      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden py-24">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <p
              className="text-sm uppercase tracking-[0.3em] font-light mb-4"
              style={{ color: ACCENT }}
            >
              {hero.badge}
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {hero.title}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {hero.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ───────── SERVICE GROUPS ───────── */}
      {serviceGroups.map((group, gi) => (
        <section key={gi} className="max-w-7xl mx-auto px-8 pb-24">
          {/* Group Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{group.heading}</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              {group.desc}
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((s, i) => {
              const Icon = iconMap[s.icon] ?? ClipboardList;
              return (
                <motion.div
                  key={`${s.title}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className="h-12 w-12 flex items-center justify-center rounded-lg mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                      boxShadow: `0 8px 20px -6px ${PRIMARY}55`,
                    }}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {s.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>
      ))}

      {/* ───────── CTA SECTION ───────── */}
      <section
        className="relative max-w-7xl mx-auto mb-20 text-center rounded-3xl p-14 mt-20 shadow-xl border border-white/10 backdrop-blur-md"
        style={{
          background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
          color: "#fff",
        }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              {cta.title}
            </h2>
            <p className="text-white/80 mb-8 text-lg leading-relaxed">
              {cta.desc}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 bg-white text-[#241c72] font-semibold hover:bg-slate-100 transition"
            >
              {cta.button}
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
