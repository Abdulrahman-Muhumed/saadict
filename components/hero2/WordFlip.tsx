"use client";

import { useEffect, useState } from "react";
// Import Variants type along with motion, AnimatePresence
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion";

const primary = "#241c72";
const accent = "#F99417";

type WordFlipProps = {
  words: string[];
  interval?: number;
};

// FIX: Explicitly type the variants as Variants from framer-motion.
// This ensures Framer Motion correctly recognizes the 'type' in the transition object.
const wordVariants: Variants = {
  // Initial state (before entering)
  initial: {
    opacity: 0,
    y: 20,
    transition: { 
      type: "spring", // TypeScript is now happy with this literal string
      damping: 12, 
      stiffness: 100 
    },
  },
  // The animated state (while visible)
  animate: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring", 
      damping: 12, 
      stiffness: 100 
    },
  },
  // Exit state (when leaving)
  exit: {
    opacity: 0,
    y: -20,
    transition: { 
      type: "tween", // Using a simple tween for a quick fade-out is common for exits
      duration: 0.25 
    },
  },
};

export default function WordFlip({ words = [], interval = 2200 }: WordFlipProps) {
  const prefersReduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [interval, words.length, prefersReduced]);

  const currentWord = words[i] ?? "";

  return (
    <span className="inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          variants={wordVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="block bg-clip-text text-transparent whitespace-nowrap"
          style={{ backgroundImage: `linear-gradient(90deg, ${primary}, ${accent})` }}
          aria-live="polite"
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}