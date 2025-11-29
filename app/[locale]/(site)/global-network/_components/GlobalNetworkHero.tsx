"use client";

import { motion } from "framer-motion";
import {
    CornerRightUp,
    Zap,
    Globe2,
    TrendingUp,
    Cpu,
    Maximize,
} from "lucide-react";
import React from "react";

/* ------------------------------------------------------- */
/* BRAND SYSTEM                                             */
/* ------------------------------------------------------- */
const TEXT_PRIMARY = "text-slate-900 dark:text-white";
const TEXT_MUTED = "text-slate-600 dark:text-neutral-400";
const TEXT_HIGHLIGHT =
    "bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200 dark:from-yellow-300 dark:to-yellow-100";

/* Background */
const BG_SECTION = "bg-slate-50 dark:bg-neutral-950";

/* Buttons */
const CTA_BUTTON =
    "bg-yellow-500 hover:bg-yellow-400 text-black font-bold shadow-lg shadow-yellow-500/30 transition";

/* Animation */


const fadeIn = (delay = 0) => ({
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

/* ------------------------------------------------------- */
/* RIGHT VISUAL (Metrics Panel)                             */
/* ------------------------------------------------------- */
const StatBox = ({
    title,
    value,
    icon,
}: {
    title: string;
    value: string;
    icon: React.ReactNode;
}) => (
    <div className="p-4 rounded-xl bg-white/5 dark:bg-neutral-800/60 border border-white/10 dark:border-neutral-700 backdrop-blur">
        <div className="flex items-center gap-2 mb-1">
            {icon}
            <p className="text-xs font-semibold text-neutral-300 tracking-widest uppercase">
                {title}
            </p>
        </div>
        <p className="text-2xl md:text-3xl font-extrabold text-white">{value}</p>
    </div>
);

const ClarityVisual = () => {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="w-full h-full border border-neutral-700/60 rounded-2xl bg-neutral-900/60 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden relative"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-neutral-700/60 bg-neutral-800/50 backdrop-blur">
                    <div className="text-xs font-mono text-yellow-300 flex items-center gap-2">
                        <Cpu size={14} /> SYSTEM: ACTIVE
                    </div>
                    <div className="text-xs font-mono text-neutral-400">
                        {new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </div>

                {/* Body */}
                <div className="relative w-full h-full flex items-center justify-center">
                    <Globe2
                        size={260}
                        className="absolute text-neutral-700/30 dark:text-neutral-700/20"
                    />

                    <div className="absolute grid grid-cols-2 gap-6 p-10 z-10">
                        <StatBox
                            title="Active Routes"
                            value="1,402"
                            icon={<TrendingUp size={20} className="text-yellow-400" />}
                        />
                        <StatBox
                            title="Latency Index"
                            value="< 12ms"
                            icon={<Zap size={20} className="text-yellow-400" />}
                        />
                        <StatBox
                            title="Coverage"
                            value="195 Countries"
                            icon={<Globe2 size={20} className="text-yellow-400" />}
                        />
                        <StatBox
                            title="Reliability"
                            value="99.8%"
                            icon={<Maximize size={20} className="text-yellow-400" />}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

/* ------------------------------------------------------- */
/* MAIN HERO SECTION                                        */
/* ------------------------------------------------------- */

export default function MinimalistClarityGridHero() {
    return (
        <section
            className={`relative min-h-screen flex items-center overflow-hidden`}
        >
            {/* Subtle Noise Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] bg-fine-noise" />

            <div className="max-w-7xl mx-auto px-8 py-16 md:py-16 grid lg:grid-cols-2 gap-20 z-10">
                {/* ---------------- LEFT CONTENT ---------------- */}
                <div>
                    {/* Top Badge */}

                    <motion.p
                        variants={fadeIn(0)}
                        initial="hidden"
                        animate="show"
                        className="inline-flex items-center gap-2 rounded-full 
                            bg-yellow-400/10 dark:bg-yellow-300/10 
                            border border-yellow-400/30 dark:border-yellow-300/20 
                            px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]
                            text-yellow-700 dark:text-yellow-300 backdrop-blur">
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
                        HORNBOX LOGISTICS INTELLIGENCE
                    </motion.p>

                    {/* HERO TITLE */}
                    <motion.h1
                        variants={fadeIn(0.1)}
                        initial="hidden"
                        animate="show"
                        className={`mt-6 text-4xl sm:text-4xl  lg:text-6xl font-extrabold leading-[1.1] ${TEXT_PRIMARY}`}
                    >
                        Empowering{" "}
                        <span className={TEXT_HIGHLIGHT}>Global Supply Chains</span>{" "}
                    </motion.h1>

                    {/* DESCRIPTION */}
                    <motion.p
                        variants={fadeIn(0.2)}
                        initial="hidden"
                        animate="show"
                        className={`mt-6 text-lg md:text-xl leading-relaxed ${TEXT_MUTED} max-w-xl`}
                    >
                        HornBox delivers high-accuracy, multi-modal logistics engineered
                        for enterprise, government, humanitarian and commercial operations
                        across the Horn of Africa and 195+ global corridors.
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        variants={fadeIn(0.35)}
                        initial="hidden"
                        animate="show"
                        className="mt-10 flex items-center gap-4"
                    >
                        <a
                            href="/contact"
                            className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base ${CTA_BUTTON}`}
                        >
                            Contact Our Team <CornerRightUp size={18} />
                        </a>
                    </motion.div>
                </div>

                {/* ---------------- RIGHT VISUAL ---------------- */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                >
                    <ClarityVisual />
                </motion.div>
            </div>

            {/* Noise Texture */}
            <style jsx global>{`
                .bg-fine-noise {
                background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.09'/></svg>");
                background-size: 110px;
                }
            `}</style>
        </section>
    );
}
