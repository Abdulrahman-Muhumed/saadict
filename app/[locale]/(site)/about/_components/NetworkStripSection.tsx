"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Users2 } from "lucide-react";
import { fadeUp } from "./animations";

export default function NetworkStripSection() {
  return (
    <section className="py-16 bg-black text-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-xl"
        >
          <h2 className="text-3xl font-bold mb-3">
            Strategic Coverage Across Key Global Lanes
          </h2>
          <p className="text-base text-white/80">
            From Mogadishu to Mombasa, Berbera to Djibouti, HornBox connects
            regional corridors with global hubs in the Middle East, Asia,
            Europe and North America, ensuring your cargo reaches its
            destination efficiently.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/70">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
              <MapPin size={14} className="text-yellow-400" />
              Key Ports: Mogadishu, Berbera, Bosaso, Mombasa, Djibouti
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative w-full max-w-md h-52 rounded-3xl border border-yellow-400/30 bg-gradient-to-br from-black/50 to-yellow-400/10 overflow-hidden shadow-2xl shadow-yellow-400/10"
        >
          <Image
            src="/home/home_bg2.jpg"
            alt="HornBox Network"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-yellow-400/10" />
          <div className="relative z-10 h-full flex flex-col justify-between p-5 text-xs">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-white/80">
                <Users2 size={16} />
                Global Carrier Alliances
              </span>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] text-emerald-200 font-bold uppercase">
                ACTIVE
              </span>
            </div>
            <div className="space-y-2 text-white/85">
              <div className="flex justify-between font-mono">
                <span>Countries Connected</span>
                <span className="font-extrabold text-yellow-400">195+</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>Service Modes</span>
                <span className="font-extrabold text-yellow-400">
                  SEA • AIR • ROAD
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
