"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import ShimmerText from "./ShimmerText";

const PRIMARY = "#241c72";
const ACCENT = "#F99417";

export default function HajjHero({ onOpen }: { onOpen: () => void }) {
  const t = useTranslations("hajj.hero");

  return (
    <section className="relative w-full py-24 min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 20% 40%, rgba(249,148,23,0.18), transparent 60%),
            linear-gradient(135deg, ${PRIMARY} 0%, #2f247a 60%, ${ACCENT} 100%)
          `,
        }}
      />

      <div className="mx-auto max-w-7xl px-8 grid md:grid-cols-2 items-center gap-10 ">
        {/* Text */}
        <div className="text-center md:text-left">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <span
                className="px-6 py-2 rounded-full text-sm font-semibold text-white"
                style={{
                  background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
                  boxShadow: `0 0 28px -10px ${ACCENT}99`,
                }}
              >
                
              </span>
            </motion.div>
          </AnimatePresence>

          <motion.h1
            className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ShimmerText>{t("titleLead")}</ShimmerText> {t("titleTrail")}
          </motion.h1>

          <motion.p
            className="mt-6 text-foreground/90 max-w-lg mx-auto md:mx-0 text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t("desc")}
          </motion.p>

          <motion.button
            
            className="mt-8 inline-flex items-center px-8 py-3 rounded-full font-semibold shadow-lg text-white"
            style={{
              background: `linear-gradient(90deg, ${ACCENT}, ${PRIMARY})`,
              boxShadow: `0 10px 28px -10px ${ACCENT}99`,
            }}
            whileHover={{ scale: 1.03 }}
          >
           
          </motion.button>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl"
        >
          <Image
            src="/hajj_hero2.png"
            alt="Hajj 2026 — Hoggaan Travels"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
