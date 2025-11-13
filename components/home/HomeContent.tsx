"use client";

import { motion } from "framer-motion";
import {
    ShieldCheck,
    Database,
    IdCard,
    CreditCard,
    Clock,
    Headphones,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "@/lib/i18n/provider";

const primary = "#241c72";
const accent = "#F99417";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
    viewport: { once: true, amount: 0.3 },
});

export default function HomeContent() {
    const t = useTranslations("home");

    const cards = [
        {
            icon: IdCard,
            title: t("features.items.id.title"),
            desc: t("features.items.id.desc"),
        },
        {
            icon: Database,
            title: t("features.items.data.title"),
            desc: t("features.items.data.desc"),
        },
        {
            icon: CreditCard,
            title: t("features.items.payments.title"),
            desc: t("features.items.payments.desc"),
        },
        {
            icon: ShieldCheck,
            title: t("features.items.access.title"),
            desc: t("features.items.access.desc"),
        },
        {
            icon: Clock,
            title: t("features.items.updates.title"),
            desc: t("features.items.updates.desc"),
        },
        {
            icon: Headphones,
            title: t("features.items.support.title"),
            desc: t("features.items.support.desc"),
        },
    ];

    const heroAnim = fadeUp(0.2);

    return (
        <main className="relative min-h-screen text-slate-800 dark:text-slate-100 overflow-hidden">
            <section className="max-w-7xl mx-auto px-8 py-28 space-y-28">
                {/* ───────── FEATURES HEADER ───────── */}
                <motion.div
                    initial={heroAnim.initial}
                    whileInView={heroAnim.whileInView}
                    viewport={heroAnim.viewport}
                    className="text-center max-w-3xl mx-auto"
                >
                    <p
                        className="text-sm uppercase tracking-[0.25em] mb-3 font-light"
                        style={{ color: accent }}
                    >
                        {t("features.badge")}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                        {t("features.title")}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                        {t("features.desc")}
                    </p>
                </motion.div>

                {/* ───────── FEATURES GRID ───────── */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map((item, i) => {
                        const cardAnim = fadeUp(0.15 + i * 0.05);
                        return (
                            <motion.div
                                key={item.title as string}
                                initial={cardAnim.initial}
                                whileInView={cardAnim.whileInView}
                                viewport={cardAnim.viewport}
                                className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm p-6 hover:shadow-lg transition-all duration-300"
                            >
                                <item.icon
                                    className="h-10 w-10 mb-3"
                                    style={{ color: accent }}
                                />
                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                    {item.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ───────── FINAL CTA ───────── */}
                <motion.div
                    initial={heroAnim.initial}
                    whileInView={heroAnim.whileInView}
                    viewport={heroAnim.viewport}
                    className="relative text-center rounded-3xl p-14 mt-20 shadow-xl border border-white/10 backdrop-blur-md"
                    style={{
                        background: `linear-gradient(135deg, ${primary}, ${accent})`,
                        color: "#fff",
                    }}
                >
                    <h3 className="text-3xl font-semibold mb-4">
                        {t("features.ctaTitle")}
                    </h3>
                    <p className="text-white/80 mb-8 text-base max-w-2xl mx-auto">
                        {t("features.ctaDesc")}
                    </p>
                </motion.div>
            </section>
        </main>
    );
}
