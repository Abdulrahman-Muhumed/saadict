"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";

// --- CONFIGURATION CONSTANTS ---
const CONTAINER_HEIGHT = 100; // Total height of the loader area
const BAR_WIDTH = 10; // Width/thickness of each bar
const GAP_WIDTH = 12; // Space between bars
const NUMBER_OF_BARS = 6; 
const BRAND_COLOR = "bg-amber-500 dark:bg-amber-400"; // Brand Yellow

/* --------------------------------------------- */
/* CONTAINER VARIANTS (Staggered Children)        */
/* --------------------------------------------- */
const containerVariants: Variants = {
  // Use `staggerChildren` to sequence the bars
  animate: {
    transition: {
      staggerChildren: 0.08, // Very quick delay between bars
    },
  },
};

/* --------------------------------------------- */
/* BAR VARIANTS (The "Elevation" Motion)          */
/* --------------------------------------------- */
const barVariants: Variants = {
  initial: {
    y: "100%", // Start off-screen bottom
    scaleY: 0.1, // Start very thin (low elevation)
    opacity: 0.2, // Start faint
  },
  animate: {
    y: "-100%", // Sweep across to the top (elevation)
    scaleY: [0.1, 1.2, 0.1], // Elevate and slightly overshoot (nice touch), then drop
    opacity: [0.2, 1, 0.2], // Pulse to solid yellow at peak
    transition: {
      duration: 1.5, // Duration of one full vertical lift cycle
      ease: "easeInOut", // Smooth, non-mechanical lift
      repeat: Infinity,
      repeatDelay: 0.3, // Short delay before repeating the cycle
    },
  },
};

/* --------------------------------------------- */
/* WRAPPER VARIANTS (Subtle entrance/exit)        */
/* --------------------------------------------- */
const wrapperVariants: Variants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
};

// Helper array to render the required number of bars
const barIndices = Array.from({ length: NUMBER_OF_BARS }, (_, i) => i);

export default function PageLoader({ isLoading }: { isLoading: boolean }) {
  const containerWidth = (BAR_WIDTH * NUMBER_OF_BARS) + (GAP_WIDTH * (NUMBER_OF_BARS - 1));
  const backdropClasses = "fixed inset-0 z-[9999] flex items-center justify-center  backdrop-blur-sm";

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={backdropClasses}
        >
          {/* WRAPPER: Centers the loader and applies the subtle zoom */}
          <motion.div
            variants={wrapperVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-7 p-10" // High-tech panel look
          >
            {/* The Animated Elevation Stream Container */}
            <motion.div
              variants={containerVariants} // Container for stagger effect
              initial="initial"
              animate="animate"
              style={{ width: containerWidth, height: CONTAINER_HEIGHT }}
              className="relative overflow-hidden flex justify-between items-end" // Bars sit at the bottom
            >
              {/* Render Bars */}
              {barIndices.map((i) => (
                <motion.div
                  key={i}
                  variants={barVariants}
                  
                  className={`absolute bottom-0 origin-bottom ${BRAND_COLOR}`} // Key: origin-bottom ensures scaleY works correctly
                  // Position the bars horizontally using absolute positioning
                  custom={i} 
                  initial="initial"
                  animate="animate"
                  // Use a fixed left position instead of flex to ensure consistent gap
                  style={{ left: i * (BAR_WIDTH + GAP_WIDTH), width: BAR_WIDTH, height: CONTAINER_HEIGHT }} 
                />
              ))}
            </motion.div>

             {/* Dynamic, 2050-style loading text */}
             <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-xl font-sans font-extralight tracking-[0.3em] uppercase text-amber-300 drop-shadow-lg"
            >
                
            </motion.p>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}