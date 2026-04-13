"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type WordFlipProps = {
  words: string[];
  interval?: number;
};

export default function WordFlip({ words = [], interval = 2500 }: WordFlipProps) {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReduced || words.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval, words.length, prefersReduced]);

  return (
    <span className="relative inline-grid h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          // Shifted y values to ensure text stays within the 1.3em viewport
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
          transition={{
            duration: 0.5,
            ease: [0.23, 1, 0.32, 1]
          }}
          // Added px-1 to prevent right-side clipping of italic/bold characters
          className="whitespace-nowrap  bg-clip-text text-transparent bg-gradient-to-r from-[#24365C] to-[#4C8FC4] dark:from-white dark:to-[#4C8FC4] font-bold"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>

      {/* Progress Line - Adjusted to sit perfectly at the bottom of the text descender zone */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        key={`line-${index}`}
        transition={{ duration: interval / 1000, ease: "linear" }}
        className="absolute bottom-0 left-0 h-[2px] bg-[#4C8FC4]/30 dark:bg-[#4C8FC4]/50"
      />
    </span>
  );
}