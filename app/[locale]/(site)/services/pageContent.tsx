"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/lib/i18n/navigation";

import {
  Globe,
  ShieldCheck,
  ArrowRight,
  Route,
  FileText,
  CheckCircle,
} from "lucide-react";

// Local Components
import ServiceCard from "./_components/ServiceCard";
import RequestModal from "./_components/RequestModal";

// --- Data ---
const SERVICES = [
  {
    id: "ocean",
    code: "SEA-01",
    title: "Ocean Freight",
    desc: "FCL + LCL consolidation with global routing. Guaranteed capacity linking the Horn of Africa to international ports.",
    icon: require("lucide-react").Ship,
  },
  {
    id: "air",
    code: "AIR-02",
    title: "Air Freight",
    desc: "Express air cargo for urgent, high-value shipments. Speed-first routing with premium carriers.",
    icon: require("lucide-react").Plane,
  },
  {
    id: "road",
    code: "LND-03",
    title: "Road Transport",
    desc: "Inland trucking + last-mile delivery across East Africa. GPS-enabled fleet for real-time monitoring.",
    icon: require("lucide-react").Truck,
  },
  {
    id: "warehousing",
    code: "STR-04",
    title: "Warehousing",
    desc: "Bonded / non-bonded storage with digital inventory systems. Designed for complex supply chains.",
    icon: require("lucide-react").Warehouse,
  },
  {
    id: "customs",
    code: "CST-05",
    title: "Customs Brokerage",
    desc: "Fast-track clearance, regulatory compliance, and documentation management.",
    icon: require("lucide-react").ClipboardList,
  },
  {
    id: "project",
    code: "PRJ-06",
    title: "Project Cargo",
    desc: "Heavy, oversized, and industrial cargo engineered with precision logistics.",
    icon: require("lucide-react").Boxes,
  },
];

const FEATURES = [
  {
    title: "Velocity-Driven",
    desc: "Predictive routing to reduce transit times.",
    icon: require("lucide-react").Zap,
  },
  {
    title: "Global Compliance",
    desc: "Aligned with all major trade & customs regulations.",
    icon: require("lucide-react").ShieldCheck,
  },
  {
    title: "Real-Time Data",
    desc: "24/7 cargo visibility and milestone tracking.",
    icon: require("lucide-react").BarChart3,
  },
];

const WORKFLOW = [
  {
    step: "01",
    title: "Route Engineering",
    desc: "Multi-modal optimization to achieve the fastest, most cost-efficient transport path.",
    icon: Route,
  },
  {
    step: "02",
    title: "Documentation & Transit",
    desc: "Booking, paperwork, and real-time vessel / flight monitoring included.",
    icon: FileText,
  },
  {
    step: "03",
    title: "Clearance & Delivery",
    desc: "Accelerated customs processing + last-mile fulfillment.",
    icon: CheckCircle,
  },
];

export default function ServicesPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const open = (srv:any) => {
    setSelectedService(srv);
    setOpenModal(true);
  };

  const close = () => {
    setOpenModal(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  return (
    <div className="relative min-h-screen w-full text-neutral-900 dark:text-neutral-100 font-sans selection:bg-yellow-400 selection:text-black">

      {/* ======================================================
          HERO SECTION
      ======================================================= */}
      <section className="relative pt-16 md:pt-28 pb-20 px-8 max-w-7xl mx-auto">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/services/bg_2.png"
            alt="Background visual"
            fill
            className="object-contain object-right opacity-30 pointer-events-none select-none"
            priority
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-2 w-2 bg-yellow-400 rounded-sm animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Logistics Infrastructure
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1] mb-8">
            ENGINEERED FOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">
              MOVEMENT.
            </span>
          </h1>

          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl border-l-4 border-yellow-400 pl-6">
            HornBox Logistics builds and manages seamless supply chains across the Horn of Africa and beyond — with precision, reliability, and speed.
          </p>
        </motion.div>
      </section>

      {/* ======================================================
         OPERATIONAL EXCELLENCE (Icons Section)
      ======================================================= */}
      <section className="relative px-8 mb-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Operational Excellence</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Every shipment is treated as mission-critical. Our process combines global systems with regional expertise.
            </p>
          </div>

          <div className="md:col-span-2 grid sm:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 p-5 rounded-xl hover:border-yellow-400 transition-colors duration-300"
                >
                  <Icon className="w-8 h-8 text-yellow-500 mb-4" />
                  <h4 className="font-bold text-sm mb-2">{feat.title}</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================
         MARQUEE STRIP
      ======================================================= */}
      <div className="w-full bg-yellow-400 text-black py-4 overflow-hidden mb-16 transform -skew-y-1">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between font-mono text-sm font-bold uppercase tracking-wide">
          <div className="flex items-center gap-2">
            <Globe size={16} /> Global Network Access
          </div>
          <div className="hidden md:flex items-center gap-2">
            <ShieldCheck size={16} /> Insured Cargo
          </div>
          <div className="flex items-center gap-2">
            Next-Gen Tracking <ArrowRight size={16} />
          </div>
        </div>
      </div>

      {/* ======================================================
         WORKFLOW
      ======================================================= */}
      <section className="relative px-6 py-24 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-10 md:text-center">
          Our End-to-End Logistics System
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {WORKFLOW.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-mono font-bold text-yellow-500">
                    {item.step}
                  </span>
                  <Icon className="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
                </div>

                <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {item.desc}
                </p>

                {/* Connector */}
                {i < WORKFLOW.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(100%+8px)] w-6 h-[2px] bg-neutral-300 dark:bg-neutral-700" />
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ======================================================
         OUR CAPABILITIES
      ======================================================= */}
      <section className="relative px-6 pb-32 max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Our Capabilities</h2>
          <p className="text-neutral-500 mt-2">Select a service to begin your request.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv, i) => (
            <ServiceCard key={srv.id} service={srv} index={i} onOpen={open} />
          ))}
        </div>
      </section>

      {/* ======================================================
         CTA SECTION
      ======================================================= */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="relative rounded-3xl bg-neutral-900 dark:bg-neutral-800 text-white p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-full border-l-[20px] border-yellow-400/20 skew-x-12"></div>

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Complex Cargo? Custom Solutions.
            </h2>
            <p className="text-neutral-400 mb-8">
              Our project logistics team designs tailor-made solutions for oversized, industrial, and non-standard cargo requirements.
            </p>
            <Link
              href="/contact"
              className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors inline-block"
            >
              Contact Sales Team
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================
         MODAL
      ======================================================= */}
      <RequestModal
        isOpen={openModal}
        service={selectedService}
        onClose={close}
      />
    </div>
  );
}
