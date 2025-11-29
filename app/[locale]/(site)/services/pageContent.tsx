"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ship,
  Plane,
  Truck,
  Warehouse,
  Boxes,
  ClipboardList,
  ArrowRight,
  X,
  ShieldCheck,
  Zap,
  Globe,
  BarChart3,
  Route,
  FileText,
  CheckCircle,
  Loader,
} from "lucide-react";
import Image from "next/image";
import {Link} from "@/lib/i18n/navigation";

// --- Data ---
const SERVICES = [
  {
    id: "ocean",
    code: "SEA-01",
    title: "Ocean Freight",
    desc: "Full-container (FCL) & LCL consolidation. We connect the Horn of Africa to major global hubs with guaranteed space allocation.",
    icon: Ship,
  },
  {
    id: "air",
    code: "AIR-02",
    title: "Air Freight",
    desc: "Express air cargo solutions. When speed is non-negotiable, we utilize premium carriers for urgent and high-value logistics.",
    icon: Plane,
  },
  {
    id: "road",
    code: "LND-03",
    title: "Road Transport",
    desc: "Regional trucking fleet. Secure inland haulage and last-mile delivery across East Africa with real-time GPS monitoring.",
    icon: Truck,
  },
  {
    id: "warehousing",
    code: "STR-04",
    title: "Warehousing",
    desc: "Bonded and non-bonded storage facilities with inventory management systems tailored for complex supply chains.",
    icon: Warehouse,
  },
  {
    id: "customs",
    code: "CST-05",
    title: "Customs Brokerage",
    desc: "Navigating complex import/export regulations. We handle documentation and inspections for rapid cargo release.",
    icon: ClipboardList,
  },
  {
    id: "project",
    code: "PRJ-06",
    title: "Project Cargo",
    desc: "Oversized and industrial logistics. Engineering-led planning for infrastructure, energy, and construction machinery.",
    icon: Boxes,
  },
];

const FEATURES = [
  {
    title: "Velocity-Driven",
    desc: "We utilize predictive routing to shave days off standard transit times.",
    icon: Zap,
  },
  {
    title: "Global Compliance",
    desc: "Full adherence to international trade laws, reducing customs friction.",
    icon: ShieldCheck,
  },
  {
    title: "Real-Time Data",
    desc: "24/7 visibility on your cargo's location and status updates.",
    icon: BarChart3,
  },
];

const WORKFLOW = [
  {
    step: "01",
    title: "Route Engineering",
    desc: "Custom planning and multi-modal optimization to define the most efficient, cost-effective path.",
    icon: Route,
  },
  {
    step: "02",
    title: "Documentation & Transit",
    desc: "Seamless handling of all paperwork, carrier booking, and proactive vessel/flight monitoring.",
    icon: FileText,
  },
  {
    step: "03",
    title: "Clearance & Delivery",
    desc: "Accelerated customs brokerage and final last-mile transport to your destination.",
    icon: CheckCircle,
  },
];

export default function ServicesPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const handleOpen = (srv: any) => {
    setSelectedService(srv);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  return (
    <div className="relative min-h-screen w-full  text-neutral-900 dark:text-neutral-100 font-sans selection:bg-yellow-400 selection:text-black">




      {/* ========================================= */}
      {/* HERO SECTION */}
      {/* ========================================= */}
      <section className="relative z-10 pt-12 md:pt-24 lg:pt-24  pb-20 px-8 max-w-7xl mx-auto">
        <div className=" inset-0 -z-10">
          <div className=" w-full h-full">
            {/* Base Background vid */}
            <Image
              src="/services/bg_2.png"
              alt="Background video"
              layout="fill"
              objectFit="contain"
              className="opacity-30 object-right"
              priority
            />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
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

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1] mb-8">
            ENGINEERED FOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">
              MOVEMENT.
            </span>
          </h1>

          <p className="text-lg  text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl border-l-4 border-yellow-400 pl-6">
            HornBox Logistics isn't just a freight forwarder. We are the
            architects of your supply chain, bridging the Horn of Africa to the
            world with precision, speed, and unshakeable reliability.
          </p>
        </motion.div>
      </section>

      {/* ========================================= */}
      {/* OPERATIONAL EXCELLENCE (More Info) */}
      {/* ========================================= */}
      <section className="relative z-10 px-8 mb-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Operational Excellence</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Why do industry leaders choose us? Because we treat every shipment
              as a critical mission. Our methodology combines local expertise
              with global standards.
            </p>
          </div>
          <div className="md:col-span-2 grid sm:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 p-5 rounded-xl hover:border-yellow-400 transition-colors duration-300"
              >
                <feat.icon className="w-8 h-8 text-yellow-500 mb-4" />
                <h4 className="font-bold text-sm mb-2">{feat.title}</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* ATTENTION GRABBER STRIP */}
      {/* ========================================= */}
      <div className="w-full bg-yellow-400 text-black py-4 overflow-hidden mt-4 mb-16 transform -skew-y-1">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between font-mono text-sm font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Globe size={16} /> Global Network Access
          </div>
          <div className="hidden md:flex items-center gap-2">
            <ShieldCheck size={16} /> 100% Insured Cargo
          </div>
          <div className="flex items-center gap-2">
            Next-Gen Tracking <ArrowRight size={16} />
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* NEW: LOGISTICS WORKFLOW (Process/How we do it) */}
      {/* ========================================= */}
      <section className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 md:text-center">Our End-to-End Logistics System</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {WORKFLOW.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-mono font-bold text-yellow-500">{item.step}</span>
                <item.icon className="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
              </div>
              <h4 className="text-xl font-bold mb-2">{item.title}</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.desc}</p>

              {/* Connector line for large screens */}
              {i < WORKFLOW.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(100%+8px)] w-6 h-[2px] bg-neutral-300 dark:bg-neutral-700" />
              )}
            </motion.div>
          ))}
        </div>
      </section>


      {/* ========================================= */}
      {/* OPERATIONAL EXCELLENCE (The Why) */}
      {/* ========================================= */}
      <section className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Why We Are Exceptional</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Our commitment to **Operational Excellence** is built on technical foundations, ensuring your cargo moves reliably.
            </p>
          </div>
          <div className="md:col-span-2 grid sm:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 p-5 rounded-xl hover:border-yellow-400 transition-colors duration-300"
              >
                <feat.icon className="w-8 h-8 text-yellow-500 mb-4" />
                <h4 className="font-bold text-sm mb-2">{feat.title}</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <div className="w-full bg-yellow-400 text-black py-1 overflow-hidden mt-4 mb-16 transform " />
      {/* ========================================= */}
      {/* SERVICES GRID (Capabilities) */}
      {/* ========================================= */}
      <section className="relative z-10 px-6 pb-32 max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Our Capabilities</h2>
          <p className="text-neutral-500 mt-2">
            Select a specialized service to begin your request.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((srv, i) => (
            <ServiceCard
              key={srv.id}
              service={srv}
              index={i}
              onOpen={handleOpen}
            />
          ))}
        </div>
      </section>

      {/* ========================================= */}
      {/* CTA SECTION */}
      {/* ========================================= */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="rounded-3xl bg-neutral-900 dark:bg-neutral-800 text-white p-12 relative overflow-hidden">
          {/* Decorative yellow lines */}
          <div className="absolute top-0 right-0 w-32 h-full border-l-[20px] border-yellow-400/20 skew-x-12"></div>

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Complex Cargo? Custom Solutions.</h2>
            <p className="text-neutral-400 mb-8">
              Don't see exactly what you need? Our project logistics team specializes in
              tailoring bespoke solutions for unique challenges.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors inline-block"
              >
                Contact Sales Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* MODAL */}
      {/* ========================================= */}
      <RequestModal
        isOpen={openModal}
        service={selectedService}
        onClose={handleClose}
      />
    </div>
  );
}

// --- Sub-Components ---

function ServiceCard({
  service,
  index,
  onOpen,
}: {
  service: any;
  index: number;
  onOpen: (s: any) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group relative flex flex-col h-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 overflow-hidden"
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl text-neutral-900 dark:text-neutral-100 group-hover:bg-yellow-400 group-hover:text-black transition-colors duration-300">
          <service.icon size={26} strokeWidth={1.5} />
        </div>
        <span className="text-[10px] font-mono font-bold text-neutral-300 dark:text-neutral-600 border border-neutral-200 dark:border-neutral-800 px-2 py-1 rounded">
          {service.code}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3">
        {service.title}
      </h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8 flex-grow">
        {service.desc}
      </p>

      {/* Button */}
      <button
        onClick={() => onOpen(service)}
        className="mt-auto w-full group/btn flex items-center justify-center gap-2 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 text-sm font-semibold rounded-lg hover:bg-black hover:text-white dark:hover:bg-yellow-400 dark:hover:text-black transition-all"
      >
        Initiate Request
        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}

function RequestModal({
  isOpen,
  service,
  onClose,
}: {
  isOpen: boolean;
  service: any;
  onClose: () => void;
}) {

  const FuturisticLoader = () => {
    return (
      // 💡 Ensured h-full and w-full to cover the entire modal content area
      <div className="flex flex-col items-center justify-center p-10 h-[300px] w-full text-center">
        <motion.div
          className="w-20 h-20 relative mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Outer Ring - Pulsating Scan Line */}
          <motion.div
            className="absolute inset-0 border-4 border-yellow-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
              rotate: 360,
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          {/* Inner Core - Spinning Data Icon */}
          <motion.div
            className="absolute inset-2 flex items-center justify-center bg-yellow-400 rounded-full"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1.5,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <Loader size={24} className="text-neutral-900" />
          </motion.div>
        </motion.div>

        <h3 className="text-xl font-bold font-mono text-yellow-400 mb-2 animate-pulse">
          PROCESSING | FLUX INITIATED
        </h3>
        <p className="text-sm text-neutral-400">
          Authenticating request via Quantum Ledger. Please wait...
        </p>

        {/* Logistic-like Progress Bar */}
        <div className="mt-6 w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-yellow-400"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 2,
              ease: "linear",
            }}
          />
        </div>
      </div>
    );
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulate a submission process
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call delay (2 seconds)
    setTimeout(() => {
      setIsSubmitting(false);
      // For a real application, you'd check for success/failure here.
      // For this example, we'll just close the modal after the simulated process.
      onClose();
    }, 2000);
  };

  const handleBackdropClick = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && service && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // 🚫 Prevents backdrop closure while submitting
            onClick={handleBackdropClick}
            className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden border-t-4 border-yellow-400"
          >
            {isSubmitting ? (
              // RENDER LOADER
              <FuturisticLoader />
            ) : (
              // RENDER FORM
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 font-mono mt-1">
                      REQ-ID: {Math.floor(Math.random() * 9000) + 1000}
                    </p>
                  </div>

                  {/* 🚫 Disabled button ensures no manual exit */}
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full"
                    disabled={isSubmitting} // 💡 Crucial check
                  >
                    <X size={20} />
                  </button>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input
                    placeholder="Company Name"
                    className="w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Business Email"
                    className="w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
                    required
                  />
                  <textarea
                    rows={3}
                    placeholder="Describe cargo details..."
                    className="w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-yellow-400 outline-none text-sm resize-none"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg transition-colors shadow-lg shadow-yellow-400/20"
                  >
                    SUBMIT REQUEST
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}