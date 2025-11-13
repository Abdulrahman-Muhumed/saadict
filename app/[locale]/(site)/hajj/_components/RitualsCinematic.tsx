"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, TrendingUp, Compass } from "lucide-react";
import { useRef } from "react";

// --- Simple, Professional Color Palette ---
const TEXT_DARK = "#1E293B"; // Charcoal for excellent contrast
const ACCENT_BLUE = "#3B82F6"; // Sapphire Blue for focus and professionalism

// --- Main Component: ZenithFlow (The Container) ---
export default function ZenithFlow() {
    const tb = useTranslations("hajj.ritualsBlock");
    const t = useTranslations("hajj");
    // Ensure we always have an array of steps
    const steps = t.raw("rituals") || [];

    return (
        // Set background to clean white
        <section id="rituals" className="relative py-20 bg-white text-slate-800 overflow-hidden">
            <div className="mx-auto max-w-7xl px-8">

                {/* Header - Minimalist and Impactful */}
                <div className="mb-16 max-w-4xl">
                    <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT_BLUE }}>
                        Pilgrimage Protocol
                    </p>
                    <h2 className="text-4xl md:text-5xl font-extrabold mt-2" style={{ color: TEXT_DARK }}>
                        {tb("title")}
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">{tb("desc")}</p>
                </div>

                {/* Main Flow Grid: Fixed Rail & Scrollable Content */}
                <div className="grid gap-10 ">
                    
                    {/* 2. The Step Content Container */}
                    <div className="relative space-y-32">
                        {steps.map((s: any, i: number) => (
                            <StepProjection key={i} step={s} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- Component 2: StepProjection (The Content Block) ---
function StepProjection({ step, index }: any) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        // Trigger effect when block is mostly in view (from 5% to 95%)
        offset: ["start 95%", "end 5%"]
    });

    // Opacity: Lighter fade-in (0.3 -> 1 -> 0.3)
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

    
    // Scale: Removed the scale effect entirely for a flatter, more stable feel
    // const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

    return (
        <motion.article
            ref={ref}
            style={{ opacity}}
            // Reduced padding for a tighter look (p-8 md:p-10)
            className="p-8 md:p-10 rounded-xl border border-gray-100 shadow-lg bg-white/95 w-full"
        >
            {/* Step Marker */}
            <div className="flex items-center gap-4 ">
                <div 
                    className="w-9 h-9 flex items-center justify-center rounded-full text-white font-bold text-lg"
                    style={{ backgroundColor: ACCENT_BLUE, boxShadow: `0 0 6px ${ACCENT_BLUE}50` }}
                >
                    {index + 1}
                </div>
                {/* Reduced text size (text-3xl md:text-4xl -> text-2xl md:text-3xl) */}
                <h3 className="text-2xl md:text-3xl font-extrabold" style={{ color: TEXT_DARK }}>
                    {step.title}
                </h3>
            </div>
            
            {/* Reduced body text size (text-lg -> text-base) */}
            <p className="mt-3 text-base text-slate-700 leading-relaxed">
                {step.blurb}
            </p>

            {/* Call to action/Micro-interaction */}
            <button
                className="mt-5 text-sm font-semibold flex items-center gap-1 transition-colors hover:text-blue-700"
                style={{ color: ACCENT_BLUE }}
            >
                View Detailed Protocol <ChevronRight className="h-4 w-4" />
            </button>
        </motion.article>
    );
}