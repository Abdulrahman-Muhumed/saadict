"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Activity,
  ArrowUpRight,
  FileText,
  BarChart3,
  Shield,
  Wallet,
  CheckCircle2,
} from "lucide-react";
import { brand } from "@/components/config/brand";
import SectionShell from "@/components/landing/section-shell";
import { Link } from "@/lib/i18n/navigation";

const spotlightMetrics = [
  { icon: FileText, key: "invoices" },
  { icon: Wallet, key: "workflow" },
  { icon: Shield, key: "control" },
  { icon: BarChart3, key: "direction" },
];

export default function AboutSystemSpotlight() {
  const t = useTranslations("about.aboutSystemSpotlight");

  return (
    <SectionShell className="!pt-8">
      <div className="relative overflow-hidden rounded-[34px] border border-slate-200 dark:border-white/10 bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(76,143,196,0.24),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(36,54,92,0.58),transparent_36%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

        <div className="relative z-10 grid lg:grid-cols-12 gap-8 p-8 md:p-10 lg:p-12 items-center">
          {/* LEFT - Editorial Intro */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 rounded-full bg-white/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-slate-300">
                {t("hero.eyebrow")}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.03] uppercase">
              {t("hero.title")}
            </h2>

            <p className="mt-6 text-sm md:text-base leading-8 text-slate-300 max-w-xl font-light">
              {t("hero.description")}
            </p>

            <div className="mt-8 space-y-3">
              {(t.raw("hero.benefits") as string[]).map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 backdrop-blur-sm"
                >
                  <CheckCircle2 size={16} className="text-[#F99417]" />
                  <span className="text-sm text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="https://finance.saadict.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-200 transition-colors"
              >
                {t("hero.ctaAccess")}
                <ArrowUpRight size={16} />
              </a>

              <Link
                href="/systems"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-6 py-4 text-sm font-semibold text-white hover:bg-white/[0.05] transition-colors"
              >
                {t("hero.ctaView")}
              </Link>
            </div>
          </motion.div>

          {/* RIGHT - Simulated Interface */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="rounded-[28px] border border-white/10 bg-white/[0.06] backdrop-blur-md overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.04]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400/40" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/40" />
                  <div className="w-2 h-2 rounded-full bg-green-400/40" />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400">
                  <Activity size={12} className="text-[#241c72]" />
                  {t("interface.terminalLabel")}
                </div>
              </div>

              <div className="p-6 md:p-7">
                <div className="grid sm:grid-cols-2 gap-4">
                  {spotlightMetrics.map((item) => (
                    <div
                      key={item.key}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 group hover:bg-white/[0.08] transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${brand.colors.accent}18` }}
                        >
                          <item.icon size={18} className="text-white" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                          {t(`interface.metrics.${item.key}.label`)}
                        </span>
                      </div>
                      <div className="text-base font-semibold text-white">
                        {t(`interface.metrics.${item.key}.value`)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  {(t.raw("interface.features") as string[]).map((item, i) => (
                    <div
                      key={item}
                      className={`rounded-2xl border border-white/10 px-4 py-4 text-center text-sm font-mono tracking-tighter ${
                        i === 1 ? "bg-white/[0.12] border-white/20" : "bg-white/[0.03]"
                      }`}
                    >
                      <div className="text-slate-300">{item}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 px-5 py-4">
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-slate-500 mb-2">
                    {t("interface.significance.label")}
                  </div>
                  <p className="text-sm leading-7 text-slate-400 font-light italic">
                    {t("interface.significance.content")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
}