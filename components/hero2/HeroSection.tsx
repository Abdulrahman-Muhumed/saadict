"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, } from "framer-motion";
import {
    ArrowUpRight,
    Fingerprint,
    Cpu,
    Shield,
    Zap,
    Activity,
    PieChart
} from "lucide-react";
import WordFlip from "./WordFlip";
import { brand } from "../config/brand";
import { Link } from "@/lib/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
type SectorKey = "enterprise" | "systems" | "security";

export default function HeroSection() {
    const t = useTranslations("home.hero");

    const SECTORS: Record<
        SectorKey,
        {
            label: string;
            tagline: string;
            stats: { label: string; value: string }[];
            icon: any;
        }
    > = {
        enterprise: {
            label: t("sectors.enterprise.label"),
            tagline: t("sectors.enterprise.tagline"),
            icon: Zap,
            stats: [
                { label: "Deployment", value: t("sectors.enterprise.stats.deployment") },
                { label: "Structure", value: t("sectors.enterprise.stats.structure") },
                { label: "Impact", value: t("sectors.enterprise.stats.impact") },
            ],
        },

        systems: {
            label: t("sectors.systems.label"),
            tagline: t("sectors.systems.tagline"),
            icon: Cpu,
            stats: [
                { label: "Architecture", value: t("sectors.systems.stats.architecture") },
                { label: "Experience", value: t("sectors.systems.stats.experience") },
                { label: "Stability", value: t("sectors.systems.stats.stability") },
            ],
        },

        security: {
            label: t("sectors.security.label"),
            tagline: t("sectors.security.tagline"),
            icon: Shield,
            stats: [
                { label: "Access", value: t("sectors.security.stats.access") },
                { label: "Encryption", value: t("sectors.security.stats.encryption") },
                { label: "Monitoring", value: t("sectors.security.stats.monitoring") },
            ],
        },
    };

    const [activeSector, setActiveSector] = useState<SectorKey>("systems");
    const [timestamp, setTimestamp] = useState("");

    useEffect(() => {
        setTimestamp(new Date().toISOString());
        const interval = setInterval(() => setTimestamp(new Date().toISOString()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 pt-24">
            <div className="relative z-10 max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-12 md:py-20">

                {/* --- ABSOLUTE POINTING HAND --- */}
                <div
                    className="hidden -scale-x-100 lg:block absolute z-20 left-[50%] top-24 -translate-x-1/2 pointer-events-none"
                >
                    <Image
                        src="/home/hero.png" 
                        alt="Pointing Hand"
                        width={400}
                        height={400}
                    />
                </div>

                {/* LEFT: CONTENT & WORD FLIP */}
                <div className="lg:col-span-7 order-1 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-[2px] w-8 bg-[#24365C]" />
                            <span className="text-[10px] font-bold tracking-[0.4em] text-[#241c72] dark:text-slate-400 uppercase">
                                {t("badge")}
                            </span>
                        </div>

                        <div className="max-w-4xl">
                            <h1 className="text-5xl sm:text-4xl md:text-7xl lg:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white leading-[1.1] md:leading-[0.95]">
                                <span className="block mb-2">{t("title_row_1")}</span>

                                <div className="flex flex-wrap items-baseline gap-x-4">
                                    <WordFlip
                                        words={t.raw("title_row_2_words")}
                                        interval={2500}
                                    />
                                </div>

                                <span className="text-slate-400 dark:text-white/20">{t("title_row_3")}</span>
                            </h1>
                        </div>

                        <p className="mt-8 font-medium text-justify text-md  text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed border-l-2 border-slate-200 dark:border-white/10 pl-6">
                            {t("description")}
                        </p>

                        <div className="mt-12 flex flex-col sm:flex-row items-center gap-5">
                            <Link
                                href="/service-request"
                                className="group relative w-full sm:w-auto min-w-[240px] px-8 py-5 overflow-hidden rounded-sm transition-all duration-300"
                                style={{ backgroundColor: brand.colors.primary }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative z-10 flex items-center justify-between gap-4">
                                    <div className="flex flex-col items-start">
                                        <span className="text-sm font-bold text-white uppercase tracking-widest">
                                            {t("cta_primary")}
                                        </span>
                                    </div>
                                    <ArrowUpRight
                                        size={20}
                                        className="text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                                    />
                                </div>

                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#4C8FC4] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </Link>

                            <Link
                                href="/projects"
                                className="group relative w-full sm:w-auto min-w-[240px] px-8 py-5 overflow-hidden rounded-sm border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-[#4C8FC4]/40"
                            >
                                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity [background-image:radial-gradient(#24365C_1px,transparent_1px)] dark:[background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:10px_10px]" />

                                <div className="relative z-10 flex items-center justify-between gap-4">
                                    <div className="flex flex-col items-start">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                                            {t("cta_secondary")}
                                        </span>
                                    </div>
                                    <PieChart size={18} className="text-slate-400 group-hover:text-[#4C8FC4] transition-colors" />
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT: DASHBOARD */}
                <div className="lg:col-span-5 z-50 w-full order-2 lg:order-2 max-w-[500px] lg:max-w-none mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-4 md:px-6 py-4 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                </div>
                                <span className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">
                                    {t("dashboard.status")}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-[#24365C] font-mono">
                                <Activity size={12} className="animate-pulse" />
                                {timestamp.slice(11, 19)}
                            </div>
                        </div>

                        <div className="flex border-b border-slate-200 dark:border-white/5 overflow-x-auto no-scrollbar">
                            {(Object.keys(SECTORS) as SectorKey[]).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveSector(key)}
                                    className={`flex-1 min-w-fit px-4 py-4 text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${activeSector === key
                                        ? "text-[#241c72] dark:text-white border-b-2 border-[#24365C]"
                                        : "text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"
                                        }`}
                                >
                                    {t(`sectors.${key}.nav`)}
                                </button>
                            ))}
                        </div>

                        <div className="p-6 md:p-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeSector}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-start justify-between mb-6 gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                                                {SECTORS[activeSector].label}
                                            </h3>
                                            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                                                {SECTORS[activeSector].tagline}
                                            </p>
                                        </div>
                                        {(() => {
                                            const Icon = SECTORS[activeSector].icon;
                                            return <Icon size={24} className="text-[#24365C] shrink-0" />;
                                        })()}
                                    </div>

                                    <div className="space-y-3">
                                        {SECTORS[activeSector].stats.map((stat, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 rounded bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                                <span className="text-[10px] text-slate-400 uppercase">
                                                    {stat.label}
                                                </span>
                                                <span className="text-xs font-bold text-slate-900 dark:text-white">
                                                    {stat.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 flex items-center justify-between text-[9px] text-slate-400 uppercase tracking-tighter border-t border-slate-100 dark:border-white/5 pt-6">
                                        <div className="flex items-center gap-2">
                                            <Fingerprint size={12} />
                                            {t("dashboard.auth")}
                                        </div>
                                        <span className="truncate ml-2">{t("dashboard.region")}</span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}