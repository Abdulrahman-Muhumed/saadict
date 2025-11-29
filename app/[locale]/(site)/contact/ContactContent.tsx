"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, CornerRightUp, Send, Building2 } from "lucide-react";
import Image from "next/image";

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
  "bg-white/80 dark:bg-neutral-900/70 backdrop-blur-xl border shadow-2xl shadow-black/10 dark:shadow-yellow-500/10 transition-all duration-300";
const INPUT =
  "w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-neutral-900/60 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-neutral-500 focus:ring-2 focus:ring-yellow-400 outline-none";

export default function ContactPage() {
  return (
    <main className="flex flex-col">

      {/* ------------------------------------------------ */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------ */}
      <section className="relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 md:px-8 py-32 lg:py-32 text-center">
          <motion.h1
            variants={fadeUp(0)}
            initial="hidden"
            animate="show"
            className="text-5xl md:text-6xl font-extrabold text-foreground"
          >
            Talk to <span className="text-yellow-400">HornBox Logistics</span>
          </motion.h1>

          <motion.p
            variants={fadeUp(0.15)}
            initial="hidden"
            animate="show"
            className="mt-6 text-xl text-foreground max-w-3xl mx-auto"
          >
            Whether you're shipping containers, managing heavy-lift cargo,
            or building a major project — our experts respond within minutes.
          </motion.p>
        </div>
      </section>

      {/* ------------------------------------------------ */}
      {/* QUICK CONTACT OPTIONS */}
      {/* ------------------------------------------------ */}
      <section className="">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-3 gap-10">

          {[
            {
              icon: Phone,
              title: "Phone Support",
              desc: "+252 61 XXX XXXX • +254 7XX XXX XXX",
            },
            {
              icon: Mail,
              title: "Email Us",
              desc: "operations@hornboxlogistics.com",
            },
            {
              icon: MapPin,
              title: "Visit Office",
              desc: "Mogadishu • Nairobi • Djibouti",
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

      {/* ------------------------------------------------ */}
      {/* CONTACT FORM + DETAILS */}
      {/* ------------------------------------------------ */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-16">

          {/* ================== LEFT: FORM ================== */}
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className={`${PANEL} ${BORDER_YELLOW} p-10 rounded-3xl`}
          >
            <h2 className={`text-3xl font-extrabold ${TEXT_DARK}`}>Send us a message</h2>
            <p className={`mt-2 text-lg ${TEXT_MUTED}`}>
              Our logistics team will respond instantly.
            </p>

            <form className="mt-10 space-y-6">

              <input type="text" placeholder="Your Name" className={INPUT} />
              <input type="email" placeholder="Email Address" className={INPUT} />
              <input type="text" placeholder="Company Name" className={INPUT} />
              <input type="text" placeholder="Service Required (Freight, Project, etc.)" className={INPUT} />

              <textarea
                rows={5}
                placeholder="Tell us about your shipment/project"
                className={`${INPUT} resize-none`}
              ></textarea>

              <button
                type="submit"
                className="
                  inline-flex items-center gap-3 px-8 py-4 rounded-xl
                  bg-yellow-500 hover:bg-yellow-400
                  dark:bg-yellow-300 dark:hover:bg-yellow-200
                  text-black font-bold shadow-lg shadow-yellow-500/30
                  transition
                "
              >
                Send Message <Send size={18} />
              </button>

            </form>
          </motion.div>

          {/* ================== RIGHT: INFO PANEL ================== */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-10"
          >
            <div className={`${PANEL} ${BORDER_YELLOW} p-10 rounded-3xl`}>
              <h3 className={`text-2xl font-extrabold ${TEXT_DARK}`}>Offices & Operations</h3>

              <ul className="mt-6 space-y-5">
                <li className={`${TEXT_MUTED} flex gap-4`}>
                  <MapPin size={20} className="text-yellow-500 dark:text-yellow-300 mt-1" />
                  Mogadishu – Port Supply Base & Airport Cargo
                </li>
                <li className={`${TEXT_MUTED} flex gap-4`}>
                  <MapPin size={20} className="text-yellow-500 dark:text-yellow-300 mt-1" />
                  Nairobi – Regional Hub & Project Logistics
                </li>
                <li className={`${TEXT_MUTED} flex gap-4`}>
                  <MapPin size={20} className="text-yellow-500 dark:text-yellow-300 mt-1" />
                  Djibouti – Maritime Gateway & Heavy-Lift Corridor
                </li>
              </ul>
            </div>

            <div className={`${PANEL} ${BORDER_YELLOW} p-10 rounded-3xl`}>
              <h3 className={`text-2xl font-extrabold ${TEXT_DARK}`}>Working Hours</h3>
              <ul className="mt-6 space-y-4 text-lg">
                <li className={TEXT_MUTED}>Monday – Friday: 8:00am – 6:00pm</li>
                <li className={TEXT_MUTED}>Saturday: 9:00am – 4:00pm</li>
                <li className="text-yellow-500 dark:text-yellow-300 font-semibold">
                  24/7 support for project cargo & emergency logistics
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ------------------------------------------------ */}
      {/* FINAL CTA */}
      {/* ------------------------------------------------ */}
      <section className="py-24">
        <div
          className={`max-w-6xl mx-auto px-6 md:px-8 p-12 rounded-3xl ${PANEL} ${BORDER_YELLOW} shadow-2xl shadow-yellow-500/10 text-center`}
        >
          <h2 className={`text-3xl md:text-4xl font-extrabold ${TEXT_DARK}`}>
            Need immediate coordination?
          </h2>

          <p className={`mt-3 text-lg ${TEXT_MUTED} max-w-2xl mx-auto`}>
            Our operations desk responds instantly to all urgent cargo, air charters, and project requests.
          </p>

          <a
            href="tel:+252610000000"
            className="mt-8 inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-yellow-500 hover:bg-yellow-400 dark:bg-yellow-300 dark:hover:bg-yellow-200 text-black font-bold text-lg shadow-xl shadow-yellow-500/50 transition transform hover:scale-[1.05]"
          >
            Call Operations Desk <CornerRightUp size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}
