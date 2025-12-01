"use client";

import { useState } from "react";
import { brand } from "@/components/config/brand";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CornerRightUp } from "lucide-react";

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
const BORDER_YELLOW = "border-yellow-500/30 dark:border-yellow-500/20";
const PANEL =
  "bg-white/80 dark:bg-neutral-900/70 backdrop-blur-xl border shadow-2xl shadow-black/10 dark:shadow-yellow-500/10";
const INPUT =
  "w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-neutral-900/60 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-neutral-500 focus:ring-2 focus:ring-yellow-400 outline-none";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submitForm(e: any) {
    e.preventDefault();
    setStatus("loading");

    const form = new FormData(e.target);

    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company"),
      service: form.get("service"),
      message: form.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.ok) {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2500);
      e.target.reset();
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  }

  /* ------------------------- Loader ------------------------- */
  const LoaderUI = () => (
    <div className="flex flex-col items-center justify-center py-10">
      <motion.div
        className="w-16 h-16 relative mb-4"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-yellow-400 opacity-60" />
        <div className="absolute inset-2 rounded-full bg-yellow-400" />
      </motion.div>
      <p className="text-yellow-400 font-semibold text-sm tracking-wide">Sending message…</p>
    </div>
  );

  /* ------------------------- Success ------------------------- */
  const SuccessUI = () => (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="w-16 h-16 rounded-full border-4 border-green-400 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-green-400" fill="none" strokeWidth="2" stroke="currentColor">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-green-400 font-semibold text-sm">Message Sent Successfully</p>
      <p className="text-neutral-400 text-xs mt-1">Our team will reply shortly.</p>
    </div>
  );

  /* ------------------------- Error ------------------------- */
  const ErrorUI = () => (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="w-16 h-16 rounded-full border-4 border-red-400 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-red-400" fill="none" strokeWidth="2" stroke="currentColor">
          <path d="M6 6l12 12M6 18L18 6" />
        </svg>
      </div>
      <p className="text-red-400 font-semibold text-sm">Failed to Send Message</p>
      <p className="text-neutral-400 text-xs mt-1">Please try again.</p>
    </div>
  );

  return (
    <main className="flex flex-col">

      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <motion.h1
          variants={fadeUp(0)}
          initial="hidden"
          animate="show"
          className="text-5xl md:text-5xl font-extrabold"
        >
          Contact <span className="text-yellow-400">HornBox Logistics</span>
        </motion.h1>

        <motion.p
          variants={fadeUp(0.15)}
          initial="hidden"
          animate="show"
          className="mt-6 text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto"
        >
          Our logistics specialists are available 7 days a week.
        </motion.p>
      </section>

      <section className="">
        <div className="max-w-7xl mx-auto px-8 pb-20 grid md:grid-cols-3 gap-10">

          {[
            {
              icon: Phone,
              title: "Phone Support",
              desc: brand.social.phoneNumber + " | " + brand.social.phoneNumber2,
            },
            {
              icon: Mail,
              title: "Email Us",
              desc: brand.social.email,
            },
            {
              icon: MapPin,
              title: "Visit Office",
              desc: brand.social.location,
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp(0.2 + i * 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className={`p-8 rounded-3xl text-center ${PANEL} ${BORDER_YELLOW}`}
              >
                <Icon className="text-yellow-500 dark:text-yellow-300 mb-4 mx-auto" size={32} />

                <h3 className={`text-md font-bold ${TEXT_DARK}`}>{item.title}</h3>

                <p className={`mt-2 text-sm ${TEXT_MUTED}`}>
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="pb-32 px-6 md:px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

        {/* LEFT — FORM */}
        <div className={`${PANEL} ${BORDER_YELLOW} p-10 rounded-3xl`}>
          <h2 className={`text-3xl font-extrabold ${TEXT_DARK}`}>Send us a message</h2>
          <p className={`mt-2 text-lg ${TEXT_MUTED}`}>We typically reply within minutes.</p>

          <div className="mt-10">

            <AnimatePresence mode="wait">
              {status === "loading" && <LoaderUI />}
              {status === "success" && <SuccessUI />}
              {status === "error" && <ErrorUI />}

              {status === "idle" && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={submitForm}
                  className="space-y-6"
                >
                  <input name="name" type="text" placeholder="Your Name" className={INPUT} required />
                  <input name="email" type="email" placeholder="Email Address" className={INPUT} required />
                  <input name="company" type="text" placeholder="Company Name" className={INPUT} />

                  <input
                    name="service"
                    type="text"
                    placeholder="Service Required (Freight, Customs, Project, etc.)"
                    className={INPUT}
                  />

                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us about your shipment or project"
                    className={`${INPUT} resize-none`}
                    required
                  ></textarea>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-yellow-500 hover:bg-yellow-400 dark:bg-yellow-300 dark:hover:bg-yellow-200 text-black font-bold shadow-lg shadow-yellow-500/30 transition"
                  >
                    Send Message <Send size={18} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* RIGHT — INFO */}
        <div className="space-y-10">
          <div className={`${PANEL} ${BORDER_YELLOW} p-10 rounded-3xl`}>
            <h3 className={`text-2xl font-extrabold ${TEXT_DARK}`}>Offices & Operations</h3>

            <ul className="mt-6 space-y-5">
              <li className={`${TEXT_MUTED} flex gap-4`}>
                <MapPin size={20} className="text-yellow-500 mt-1" />
                {brand.social.location}
              </li>
            </ul>
          </div>

          <div className={`${PANEL} ${BORDER_YELLOW} p-10 rounded-3xl`}>
            <h3 className={`text-2xl font-extrabold ${TEXT_DARK}`}>Working Hours</h3>
            <ul className="mt-6 space-y-4 text-lg">
              <li className={TEXT_MUTED}>Saturday – Friday: 8:00am – 6:00pm</li>
              <li className={TEXT_MUTED}>Thursday: 8:00am – 6:00pm</li>
              <li className="text-yellow-500 font-semibold">
                Emergency logistics & project cargo support available.
              </li>
            </ul>
          </div>
        </div>

      </section>

     
    </main>
  );
}
