"use client";

import { AnimatePresence, motion } from "framer-motion";
import { brand } from "./config/brand";

const PRIMARY = brand.colors.primary; 
const ACCENT = brand.colors.accent;

// 2030 Tech: Kinetic energy is never linear. 
// We use springs and non-uniform scaling for a "living" feel.
const barVariants = {
  initial: {
    scaleY: 0.2,
    opacity: 0.1,
    filter: "blur(8px)",
  },
  animate: (i) => ({
    scaleY: [0.2, 1.5, 0.4],
    opacity: [0.2, 1, 0.3],
    filter: ["blur(4px)", "blur(0px)", "blur(2px)"],
    backgroundColor: [PRIMARY, ACCENT, PRIMARY],
    transition: {
      duration: 1,
      ease: [0.4, 0, 0.2, 1], // Smooth custom cubic-bezier
      repeat: Infinity,
      repeatType: "mirror" ,
      delay: i * 0.15,
    },
  }),
};

export default function LoaderOverlay({ show = true }) {
  const bars = [0, 1, 2, 3, 4];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center backdrop-blur-sm"
        >
          {/* Subtle Scanning Ring - The "2030" tech signature */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-48 h-48"
          />

          <div className="relative flex items-center justify-center h-16 w-32">
            {bars.map((i) => (
              <motion.div
                key={i}
                custom={i}
                variants={barVariants}
                initial="initial"
                animate="animate"
                className="mx-[5px] w-[8px] h-12 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}