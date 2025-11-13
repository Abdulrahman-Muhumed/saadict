"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image"; // Keeping Image for the central element

const PRIMARY = "#241c72"; // brand indigo
const ACCENT = "#F99417"; // brand orange

// Animation variants for the entire bar container
const containerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.1, // Stagger the start of each bar's animation
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Animation variants for a single bar (the pulsing motion)
const barVariants = {
  initial: {
    y: "0%", // Start at the base level
  },
  animate: {
    y: ["0%", "-50%", "0%"], // Animate up to 50% height, then back down
    backgroundColor: [PRIMARY, ACCENT, PRIMARY], // Color shift adds visual punch
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

export default function LoaderOverlay({ show = true }) {
  // Array to generate 5 animated bars
  const bars = [1, 2, 3, 4, 5];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center backdrop-blur-sm"
        >
          {/* Central Logo - static for anchoring the eye */}
          {/* Wavy Bar Container */}
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="flex h-8 ml-10 w-24 items-end justify-between"
          >
            {bars.map((i) => (
              // Each bar is a motion.div
              <motion.div
                key={i}
                variants={barVariants}
                // Custom delay for a continuous wave effect
                transition={{
                  ...barVariants.animate.transition,
                  repeatDelay: 0.1,
                  delay: i * 0.1, // Staggers the start based on its index
                }}
                className="h-full w-3 rounded-full"
                // The actual bar's style is handled by the variants for height and color
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}