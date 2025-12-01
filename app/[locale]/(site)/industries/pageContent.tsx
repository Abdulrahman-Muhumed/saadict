"use client";

import { motion } from "framer-motion";
import { useState } from "react"; // Added for interactivity/filters
import {
    Building2,
    ShoppingBag,
    Leaf,
    HeartPulse,
    Factory,
    Truck,
    Globe2,
    Handshake, // New icon for Public Sector
    Wrench, // New icon for Engineering/Industrial
    ArrowRight,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────
    Animation helpers
────────────────────────────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease: [0.25, 1, 0.3, 1] as const },
    viewport: { once: true, amount: 0.2 },
});

const staggerContainer = {
    hidden: { opacity: 0 },
    show: (delay = 0) => ({
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
        },
    }),
};

/* ──────────────────────────────────────────────────────────────
    Industry Data (Enhanced)
────────────────────────────────────────────────────────────── */

type Industry = {
    id: string;
    icon: typeof Building2;
    name: string;
    tagline: string;
    body: string;
    focus: string[];
    category: 'Trade' | 'Specialty' | 'Projects';
}

const INDUSTRIES: Industry[] = [
    {
        id: "retail",
        icon: ShoppingBag,
        name: "Retail & Consumer Goods (FMCG)",
        tagline: "High-volume, time-critical supply for regional markets.",
        body: "We manage complex inventory flows, ensuring rapid replenishment for FMCG, electronics, and lifestyle product distributors. Our focus is reducing lead times and minimizing stock-outs.",
        focus: ["Retail Store Replenishment", "E-commerce Logistics", "Promotional Campaign Cargo"],
        category: 'Trade',
    },
    {
        id: "construction",
        icon: Building2,
        name: "Construction & Infrastructure",
        tagline: "On-site delivery of heavy and bulk materials, exactly when needed.",
        body: "Supporting large-scale development projects requires just-in-time delivery and complex scheduling. We handle everything from cement and steel to specialized construction machinery.",
        focus: ["Project Site Logistics", "Heavy Lift & Oversize", "Bulk Commodity Transport"],
        category: 'Projects',
    },
    {
        id: "energy",
        icon: Factory,
        name: "Oil, Gas & Power Generation",
        tagline: "Compliant logistics for high-risk, remote energy operations.",
        body: "Serving the energy sector demands reliability, rigorous safety standards, and specialized handling for industrial equipment, spares, and remote site supply chains.",
        focus: ["Drilling Equipment Transport", "Regulated Spares Flow", "Power Plant Components"],
        category: 'Projects',
    },
    {
        id: "food",
        icon: Leaf,
        name: "Food & Perishables",
        tagline: "Maintaining cold chain integrity and compliance from source to market.",
        body: "Handling foodstuffs, agricultural inputs, and temperature-sensitive goods requires precision. We ensure clean, compliant, and predictable transit to maintain quality and shelf life.",
        focus: ["Reefer Container Services", "Agricultural Imports", "Food Security Logistics"],
        category: 'Trade',
    },
    {
        id: "ngo",
        icon: Globe2,
        name: "Humanitarian & NGOs",
        tagline: "Logistical speed and transparency in mission-critical environments.",
        body: "We are trusted by aid organizations for prompt, robust, and well-documented movement of relief cargo and program supplies into challenging or remote areas.",
        focus: ["Relief Cargo Priority", "Customs Exemptions Processing", "Program Supplies Distribution"],
        category: 'Specialty',
    },
    {
        id: "healthcare",
        icon: HeartPulse,
        name: "Pharma & Healthcare",
        tagline: "Secure, temperature-controlled transport for sensitive supplies.",
        body: "Transportation of medical devices, pharmaceuticals, and vaccines demands compliance and temperature control. We adhere to strict GxP-lite handling protocols.",
        focus: ["Medical Device Import", "Temperature-Sensitive Pharma", "Hospital Supplies Management"],
        category: 'Specialty',
    },
    {
        id: "auto",
        icon: Truck,
        name: "Automotive & Heavy Equipment",
        tagline: "Seamless parts supply for dealers, workshops, and mining fleets.",
        body: "Supporting the continuous operation of fleets and machinery with consolidated and express spare parts shipments, minimizing expensive downtime for our clients.",
        focus: ["JIT Spare Parts Flow", "Vehicle Import & Clearance", "Consolidated LCL shipments"],
        category: 'Trade',
    },
    {
        id: "public",
        icon: Handshake,
        name: "Government & Public Sector",
        tagline: "Structured logistics built on high standards of documentation and audit.",
        body: "We manage logistics for public sector tenders and long-term contracts, providing the required transparency, detailed reporting, and verifiable compliance.",
        focus: ["Tender & Contract Logistics", "Audit-Ready Documentation", "Tax & Exemption Clearance"],
        category: 'Specialty',
    },
];

const CATEGORIES = [
    { id: 'all', name: 'All Sectors' },
    { id: 'trade', name: 'Commercial Trade' },
    { id: 'specialty', name: 'Regulated & Aid' },
    { id: 'projects', name: 'Industrial & Project Cargo' },
];

export default function IndustriesPage() {
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredIndustries = INDUSTRIES.filter(ind => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'trade' && ind.category === 'Trade') return true;
        if (activeFilter === 'specialty' && ind.category === 'Specialty') return true;
        if (activeFilter === 'projects' && ind.category === 'Projects') return true;
        return false;
    });

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-slate-900 dark:text-slate-100 font-sans pb-32">
            {/* ========================================================= */}
            {/* HERO / INTRO */}
            {/* ========================================================= */}
            <section className="bg-white dark:bg-neutral-900 pt-16 md:pt-28 pb-32 border-b border-neutral-200 dark:border-neutral-800">
                <div className="max-w-7xl mx-auto px-8">
                    <motion.div {...fadeUp(0)} className="max-w-4xl">
                        <p className="inline-flex items-center gap-2 rounded-full 
                            bg-yellow-400/10 dark:bg-yellow-300/10 
                            border border-yellow-400/30 dark:border-yellow-300/20 
                            px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]
                            text-yellow-700 dark:text-yellow-300 backdrop-blur">
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
                            INDUSTRY-SPECIFIC LOGISTICS
                        </p>

                        <h1 className="mt-5 text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                            Expertise Engineered for Your <span className="text-yellow-500 dark:text-yellow-400">Sector.</span>
                        </h1>

                        <p className="mt-5 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-3xl">
                            HornBox Logistics moves beyond generic freight forwarding. We understand that your supply chain is defined by its unique demands—from compliance and temperature control to project timelines and remote access.
                        </p>

                        <div className="mt-6 border-l-4 border-yellow-400 pl-4">
                            <p className="text-base text-neutral-700 dark:text-neutral-300 font-medium">
                                Our solutions are blueprints, not packages, built to ensure your cargo delivers competitive advantage.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* LOGISTICS DESIGN PROCESS SECTION */}
            {/* ========================================================= */}
            <section className="max-w-7xl mx-auto px-8 py-20 md:py-24">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div {...fadeUp(0.1)} className="mb-12 max-w-4xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Our Logistics Design Process
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400">
                            We apply a structured methodology to translate your industry's demands into a robust and cost-effective logistics model.
                        </p>
                    </motion.div>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-3 text-sm">
                    {[
                        { title: "Define Requirements", desc: "Deep dive into regulations, cargo profile (temp, hazmat, size), critical timelines, and specific customs challenges.", icon: Handshake },
                        { title: "Engineer Solution", desc: "Select optimal mode mix (Sea/Air/Road), engineer reliable routes, establish risk mitigation controls, and allocate specialized assets.", icon: Wrench },
                        { title: "Assured Execution", desc: "Deploy dedicated operations teams, integrate tracking systems, handle all documentation, and provide proactive, transparent communication.", icon: ArrowRight },
                    ].map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.title}
                                {...fadeUp(0.15 + i * 0.1)}
                                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900 shadow-md transition hover:shadow-lg"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-yellow-400/15 text-yellow-500 dark:bg-yellow-300/15 dark:text-yellow-300">
                                        <Icon size={20} />
                                    </div>
                                    <p className="text-xl font-extrabold text-yellow-500 dark:text-yellow-400">{`0${i + 1}`}</p>
                                </div>
                                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    {step.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* ========================================================= */}
            {/* INDUSTRY GRID WITH FILTERS */}
            {/* ========================================================= */}
            <section className="max-w-7xl mx-auto px-8 pb-24">
                <motion.div {...fadeUp(0.05)} className="mb-10 max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        Sector-Specific
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400">
                        Select a category to see how we apply specialized knowledge to different business needs.
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div {...fadeUp(0.1)} className="mb-10 flex flex-wrap gap-3">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveFilter(cat.id)}
                            className={`
                        px-5 py-2.5 rounded-full text-sm font-semibold transition
                        ${activeFilter === cat.id
                                    ? 'bg-yellow-500 text-black shadow-lg'
                                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                                }
                    `}
                        >
                            {cat.name}
                        </button>
                    ))}
                </motion.div>

                {/* Industry Cards */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    {filteredIndustries.length > 0 ? (
                        filteredIndustries.map((ind, idx) => {
                            const Icon = ind.icon;
                            return (
                                <motion.article
                                    key={ind.id}
                                    variants={fadeUp(0.08 + idx * 0.03)} // slight stagger
                                    className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-7 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 h-full w-1/4 bg-yellow-400/10 dark:bg-yellow-500/10 transition-all duration-500 transform translate-x-full group-hover:translate-x-0" />

                                    <div className="relative z-10">
                                        <Icon className="h-9 w-9 text-yellow-500 mb-4 transition-transform duration-300 group-hover:scale-[1.05]" />
                                        <h3 className="text-xl font-bold mb-1">{ind.name}</h3>
                                        <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400 mb-4 border-b pb-3 border-neutral-200 dark:border-neutral-800">
                                            {ind.tagline}
                                        </p>

                                        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
                                            {ind.body}
                                        </p>

                                        <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                                            Core Focus Areas:
                                        </p>
                                        <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                                            {ind.focus.map((f) => (
                                                <li key={f} className="flex gap-2 items-start">
                                                    <span className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-400" />
                                                    <span>{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.article>
                            );
                        })
                    ) : (
                        <motion.div
                            {...fadeUp(0.1)}
                            className="col-span-full text-center py-10 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-lg text-neutral-600 dark:text-neutral-400"
                        >
                            No sectors found for this filter. Please select "All Sectors" or another category.
                        </motion.div>
                    )}
                </motion.div>
            </section>

            {/* ========================================================= */}
            {/* SPECIAL REQUEST CTA */}
            {/* ========================================================= */}
            <section className="max-w-7xl mx-auto px-8">
                <motion.div
                    {...fadeUp(0.1)}
                    className="rounded-3xl px-8 py-10 md:px-12 md:py-14 text-center bg-black dark:bg-neutral-900 shadow-xl border-y border-yellow-400/50"
                >
                    <h3 className="text-3xl md:text-4xl font-extrabold text-white">
                        Custom Logistics for Complex Projects.
                    </h3>
                    <p className="mt-4 text-base md:text-lg text-neutral-400 max-w-3xl mx-auto">
                        If your cargo involves unique regulatory challenges, non-standard dimensions, or a completely new market entry, our Project Logistics division is ready to design a dedicated solution.
                    </p>

                    <a
                        href="/contact"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-8 py-3.5 text-base font-bold text-black shadow-md hover:bg-yellow-300 transition uppercase tracking-wider"
                    >
                        Contact Our Team
                        <ArrowRight size={18} />
                    </a>
                </motion.div>
            </section>
        </div>
    );
}