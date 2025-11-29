"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
    Boxes,
    Building,
    Wrench,
    Truck,
    Ship,
    Plane,
    Anchor,
    CornerRightUp,
    Workflow,
    ShieldCheck,
    Globe,
    Zap,
    Code,
    MapPin,
    Users, // New icon for Consultation CTA
} from "lucide-react";

/* ------------------------------------------- */
/* BRAND + UTILITIES - Elevated for next-gen look */
/* ------------------------------------------- */

// Function for staggered fade-up animation
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

const TEXT_DARK = "text-slate-900 dark:text-white";
const TEXT_MUTED = "text-slate-600 dark:text-neutral-400";
const TEXT_YELLOW = "text-yellow-600 dark:text-yellow-300";

const BORDER_YELLOW = "border-yellow-500/30 dark:border-yellow-500/20";
const PANEL =
    "bg-white/80 dark:bg-neutral-900/70 backdrop-blur-xl border shadow-2xl shadow-black/10 dark:shadow-yellow-500/10 transition-all duration-300 ease-out";

const HOVER_EFFECT = "hover:shadow-yellow-500/20 hover:-translate-y-1";

/* ------------------------------------------- */
/* INTERACTIVE MODE EXPERTISE COMPONENT */
/* ------------------------------------------- */

function InteractiveModalExpertise() {

    const { scrollYProgress } = useScroll();
    const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    const modes = [
        {
            icon: Ship,
            title: "Ocean Freight",
            tagline: "Global reach via strategic maritime routes.",
            details: [
                "**Break Bulk & Ro/Ro:** Specialized vessel charters for oversized projects.",
                "**FCL/LCL:** Optimized scheduling for speed and cost efficiency.",
                "**Port Operations:** Stevedoring, Tally, and Wharfage in key HOA ports.",
            ],
            yStart: -20,
        },
        {
            icon: Plane,
            title: "Air Charter & Cargo",
            tagline: "Time-critical delivery across challenging terrain.",
            details: [
                "**Full/Part Charter:** Emergency logistics and urgent out-of-gauge movements.",
                "**Perishables/Pharma:** End-to-end temperature-controlled supply chains.",
                "**Regulatory:** HAZMAT and complex security clearance management.",
            ],
            yStart: 0,
        },
        {
            icon: Truck,
            title: "Heavy Road Transport",
            tagline: "Last-mile mastery in the Horn of Africa.",
            details: [
                "**Multi-Axle Trailers:** Dedicated fleet for heavy-duty, long-haul capacity.",
                "**Route Surveys:** Detailed pre-planning for all HOA transit corridors.",
                "**Site Delivery:** Secure, tracked delivery to remote construction/energy sites.",
            ],
            yStart: 20,
        },
    ];

    return (
        <section className="relative overflow-hidden pt-24 md:pt-24">

            {/* --------------------------- */}
            {/* SECTION HEADING             */}
            {/* --------------------------- */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
                <motion.h2
                    variants={fadeUp(0)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white"
                >
                    Global Reach, Engineered for the Horn
                </motion.h2>

                <motion.p
                    variants={fadeUp(0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="mt-4 text-xl max-w-4xl mx-auto text-slate-600 dark:text-neutral-400"
                >
                    We don't just ship cargo. We create resilient, multi-modal supply corridors
                    for mission-critical projects, powered by full-spectrum visibility.
                </motion.p>
            </div>

            {/* --------------------------- */}
            {/* CINEMATIC BACKGROUND (fixed) */}
            {/* --------------------------- */}
            <div className="mt-20 relative w-full h-[500px] md:h-[650px] overflow-hidden">

                {/* Parallax Image */}
                <motion.div style={{ y: parallaxY }} className="absolute inset-0 z-0">

                    <Image
                        src="/projects/bg-1.jpg"
                        alt="Ocean vessel logistics"
                        fill
                        className="
                          object-cover object-bottom 
                          transition-opacity duration-700
                          opacity-100 dark:opacity-[0.40]
                        "
                    />

                    {/* === THEME-AWARE OVERLAY (fixed) === */}
                    <div className="
                        absolute inset-0
                        pointer-events-none
                        bg-gradient-to-b
                        from-white/70 via-white/30 to-white/0
                        dark:from-black/70 dark:via-black/40 dark:to-black/0
                        transition-colors duration-500
                    " />
                </motion.div>

                {/* --------------------------- */}
                {/* INTERACTIVE MODE CARDS      */}
                {/* --------------------------- */}
                <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center justify-center">
                    <div className="grid md:grid-cols-3 gap-8 w-full px-6 md:px-8">

                        {modes.map((mode, i) => {
                            const Icon = mode.icon;
                            return (
                                <motion.div
                                    key={i}
                                    variants={fadeUp(0.3 + i * 0.15)}
                                    initial={{ opacity: 0, y: mode.yStart }}
                                    whileInView="show"
                                    viewport={{ once: true, amount: 0.5 }}
                                    className="
                                        p-6 md:p-10 rounded-3xl
                                        backdrop-blur-xl
                                        border border-yellow-500/20
                                        shadow-xl shadow-black/20 
                                        bg-white/10 dark:bg-neutral-900/0
                                        hover:shadow-yellow-500/20 hover:-translate-y-1
                                        transition-all duration-300
                                        cursor-pointer text-left
                                    "
                                >
                                    <Icon
                                        size={40}
                                        className="mb-4 text-yellow-600 dark:text-yellow-300"
                                    />

                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                                        {mode.title}
                                    </h3>

                                    <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-yellow-600 dark:text-yellow-300">
                                        {mode.tagline}
                                    </p>

                                    <div className="mt-4 pt-4 border-t border-yellow-500/20">
                                        <ul className="space-y-3 text-sm text-slate-950 dark:text-neutral-400 list-disc list-inside">
                                            {mode.details.map((detail, index) => (
                                                <li key={index} dangerouslySetInnerHTML={{ __html: detail }} />
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}



/* ------------------------------------------- */
/* MAIN PAGE EXPORT */
/* ------------------------------------------- */

export default function ProjectsPage() {
    return (
        <main className="flex flex-col">

            {/* ================================================== */}
            {/* HERO SECTION - SIMPLE YET ATTRACTIVE (FUTURISTIC) */}
            {/* ================================================== */}
            <section className=" overflow-hidden min-h-screen flex flex-col justify-center">

                {/* ---------------------------------------------------- */}
                {/* 1. FULL-SCREEN BACKGROUND IMAGE CONTAINER */}
                {/* ---------------------------------------------------- */}
                <div className="absolute top-0 inset-0 z-0">
                    {/* Placeholder: Replace 'your-logistics-image-url' with the actual image path */}
                    <div
                        className="w-full h-full bg-cover bg-center absolute top-0"
                        style={{
                            backgroundImage: "url('/projects/bg_2.jpg')",
                            filter: "brightness(0.5) contrast(1.1)" // Darkens and enhances contrast for readability
                        }}
                    />
                </div>

                {/* ---------------------------------------------------- */}
                {/* 2. MAIN CONTENT (Centered) */}
                {/* ---------------------------------------------------- */}
                
                <div className="max-w-7xl mx-auto px-6 md:px-8 py-32 lg:py-32 grid lg:grid-cols-1 gap-20  text-center relative z-10 flex-grow items-center justify-center">
                    
                  <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                    >
                        <motion.p
                            variants={fadeUp(0)}
                            className="inline-flex items-center gap-3 rounded-full bg-yellow-400/10 border border-yellow-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300 backdrop-blur-sm"
                        >
                            <Workflow size={14} className="animate-pulse" />
                            NEXT-GEN PROJECT LOGISTICS
                        </motion.p>

                        <motion.h1
                            variants={fadeUp(0.1)}
                            className="mt-8 text-5xl sm:text-4xl md:text-6xl font-black tracking-tight leading-[1.05] text-white" // Use white text for background contrast
                        >
                            The Future of Project
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-300 dark:from-yellow-300 dark:to-yellow-100">
                                Cargo Execution.
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUp(0.2)}
                            className="mt-6 text-xl leading-relaxed text-gray-200 max-w-3xl mx-auto" // Lighter text for background contrast
                        >
                            HornBox delivers integrated, end-to-end logistics solutions for the most
                            complex projects in the Horn of Africa, utilizing predictive analytics and
                            unmatched regional intelligence.
                        </motion.p>

                        {/* CTA Buttons (Recommended addition) */}
                        <motion.div
                            variants={fadeUp(0.3)}
                            className="mt-10 flex justify-center gap-4"
                        >
                            <button className="px-8 py-3 text-lg font-bold rounded-lg bg-yellow-500 text-gray-900 hover:bg-yellow-400 transition shadow-lg">
                                Request Quote
                            </button>
                            <button className="px-8 py-3 text-lg font-medium rounded-lg border border-gray-400 text-white hover:border-yellow-500 transition">
                                Explore Services
                            </button>
                        </motion.div>


                        <div className="relative z-10 w-full flex justify-center pt-12">
                            <motion.div
                                className="flex flex-col items-center text-yellow-400"
                                animate={{ y: [0, 10, 0] }} // Subtle vertical bounce animation
                                transition={{
                                    repeat: Infinity,
                                    duration: 1.5,
                                    ease: "easeInOut",
                                }}
                            >
                                {/* Chevron icon (requires an icon library like Lucide/Feather, size=24 used here) */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-6 h-6"
                                >
                                    <polyline points="7 13 12 18 17 13"></polyline>
                                    <polyline points="7 6 12 11 17 6"></polyline>
                                </svg>
                            </motion.div>
                        </div>

                    </motion.div>
                </div>

                {/* ---------------------------------------------------- */}
                {/* 3. SCROLL DOWN INDICATOR (Bottom Element) */}
                {/* ---------------------------------------------------- */}

            </section>

            {/* ================================================== */}
            {/* SECTION: CORE PROJECT CAPABILITIES */}
            {/* ================================================== */}
            <section className="py-24 md:py-24">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <motion.h2
                        variants={fadeUp(0)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className={`text-3xl md:text-4xl font-extrabold text-center ${TEXT_DARK}`}
                    >
                        Our Project Execution Architecture
                    </motion.h2>

                    <motion.p
                        variants={fadeUp(0.1)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className={`mt-4 text-lg max-w-3xl mx-auto text-center ${TEXT_MUTED}`}
                    >
                        Beyond transport, we provide the full suite of integrated services required for project success in complex environments.
                    </motion.p>

                    <div className="mt-16 grid lg:grid-cols-3 gap-10">
                        {[
                            {
                                icon: Wrench,
                                title: "Integrated Heavy Lift & Rigging",
                                desc: "Comprehensive management of oversized and heavy-haul cargo, including route surveys, permits, and final positioning.",
                                delay: 0.1,
                            },
                            {
                                icon: Boxes,
                                title: "Warehousing & Inventory Control",
                                desc: "Secure, climate-controlled storage and just-in-time delivery management to site. Advanced real-time tracking.",
                                delay: 0.2,
                            },
                            {
                                icon: ShieldCheck,
                                title: "Compliance & Risk Mitigation",
                                desc: "Full adherence to international and local regulatory frameworks, security protocols, and customs clearance optimization.",
                                delay: 0.3,
                            },
                            {
                                icon: Globe,
                                title: "Cross-Border Management (HOA)",
                                desc: "Unrivaled expertise in navigating complex regional borders and multi-modal transit corridors across East Africa.",
                                delay: 0.4,
                            },
                            {
                                icon: Zap,
                                title: "Time-Critical Rapid Deployment",
                                desc: "Dedicated resources for fast-track projects and emergency/humanitarian response where speed is paramount.",
                                delay: 0.5,
                            },
                            {
                                icon: Code,
                                title: "Digital Supply Chain Visibility",
                                desc: "Proprietary platforms providing 24/7 real-time tracking, reporting, and predictive delay alerts for proactive management.",
                                delay: 0.6,
                            },
                        ].map((p, i) => {
                            const Icon = p.icon;
                            return (
                                <motion.div
                                    key={i}
                                    variants={fadeUp(p.delay)}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, amount: 0.3 }}
                                    className={`p-8 rounded-3xl ${PANEL} ${BORDER_YELLOW} ${HOVER_EFFECT}`}
                                >
                                    <Icon size={32} className={`mb-4 ${TEXT_YELLOW}`} />
                                    <h3 className={`text-xl font-bold ${TEXT_DARK}`}>{p.title}</h3>
                                    <p className={`mt-2 text-sm ${TEXT_MUTED}`}>{p.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ================================================== */}
            {/* SECTION: INTERACTIVE MODAL EXPERTISE (NEW INTERACTIVE) */}
            {/* ================================================== */}
            <InteractiveModalExpertise />

            {/* ================================================== */}
            {/* SECTION: FEATURED PROJECTS GRID */}
            {/* ================================================== */}
            <section className="py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6 md:px-8">

                    <motion.h2
                        variants={fadeUp(0)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className={`text-4xl md:text-5xl font-extrabold text-center ${TEXT_DARK}`}
                    >
                        Pioneering Projects & Case Studies
                    </motion.h2>

                    <motion.p
                        variants={fadeUp(0.15)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className={`mt-4 text-lg text-center max-w-3xl mx-auto ${TEXT_MUTED}`}
                    >
                        See the scale of our impact with detailed examples of mission-critical logistics successfully executed in challenging regions.
                    </motion.p>

                    <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            {
                                title: "Djibouti Port Expansion Support",
                                category: "Infrastructure & Heavy Lift",
                                desc: "Oversized gantry crane components, marine coordination & precision phased delivery for major port upgrade.",
                                img: "/projects/p1.jpg",
                                delay: 0.2,
                            },
                            {
                                title: "Somalia Wind Corridor Project",
                                category: "Energy & Renewables",
                                desc: "Management and secure transport of 50m+ turbine blades and nacelles via cross-border heavy-haul corridors.",
                                img: "/projects/p2.jpg",
                                delay: 0.3,
                            },
                            {
                                title: "East Africa Humanitarian Aid Chain",
                                category: "Relief & Time-Critical",
                                desc: "Emergency deployment of 10,000+ tons of essential supplies across East Africa with zero-tolerance for delay.",
                                img: "/projects/p3.jpg",
                                delay: 0.4,
                            },
                        ].map((p, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp(p.delay)}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.3 }}
                                className={`rounded-3xl overflow-hidden border ${BORDER_YELLOW} bg-white dark:bg-neutral-900 shadow-xl ${HOVER_EFFECT}`}
                            >
                                <div className="relative h-56 w-full">
                                    <Image src={p.img} alt={p.title} fill className="object-cover" />
                                </div>
                                <div className="p-6">
                                    <p className={`text-xs font-semibold uppercase tracking-widest ${TEXT_YELLOW} mb-1`}>{p.category}</p>
                                    <h3 className={`text-xl font-bold ${TEXT_DARK}`}>{p.title}</h3>
                                    <p className={`mt-2 text-sm ${TEXT_MUTED}`}>{p.desc}</p>
                                    <a href="#" className={`mt-4 inline-flex items-center text-sm font-semibold ${TEXT_YELLOW} hover:text-yellow-600 dark:hover:text-yellow-400 transition`}>
                                        View Case Study <CornerRightUp size={14} className="ml-1" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ================================================== */}
            {/* CTA SECTION - Prominent Final Call */}
            {/* ================================================== */}
            <section className="py-24">
                <div
                    className={`max-w-7xl mx-auto px-6 md:px-8 p-12 rounded-3xl ${PANEL} ${BORDER_YELLOW} shadow-2xl shadow-yellow-500/10`}
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="max-w-3xl">
                            <h2 className={`text-3xl md:text-4xl font-extrabold ${TEXT_DARK}`}>
                                Let’s Build Your Next Major Project.
                            </h2>
                            <p className={`mt-3 text-lg ${TEXT_MUTED}`}>
                                Dedicated project managers, 24/7 coordination & global expertise.
                            </p>
                        </div>

                        <a
                            href="/contact"
                            className="flex-shrink-0 inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-yellow-500 hover:bg-yellow-400 dark:bg-yellow-300 dark:hover:bg-yellow-200 text-black font-bold text-lg shadow-xl shadow-yellow-500/50 transition transform hover:scale-[1.05]"
                        >
                            <Users size={20} /> Start a Consultation <CornerRightUp size={18} />
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}