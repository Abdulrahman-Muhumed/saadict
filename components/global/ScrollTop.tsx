"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Code } from "lucide-react";

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      const percent = (scrolled / height) * 100;

      setProgress(percent);
      setVisible(scrolled > 300);

      if (scrolled === 0) setIsScrolling(false);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    if (isScrolling) return;
    setIsScrolling(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
          className="fixed bottom-3 right-2 z-[9999]"
          onClick={scrollTop}
        >
          {/* Reduced size from h-20 w-20 to h-16 w-16 */}
          <div className="relative group cursor-pointer h-16 w-16 flex items-center justify-center">
            
            {/* 1. DYNAMIC THEME-AWARE GLOW */}
            <motion.div 
              animate={{ 
                scale: isScrolling ? [1, 1.4, 1] : [1, 1.1, 1],
                opacity: isScrolling ? [0.4, 0.7, 0.4] : [0.1, 0.2, 0.1] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-full blur-2xl transition-colors duration-700
                bg-[#241c72]/30 dark:bg-white/10"
            />

            {/* 2. TRIPLE-RING ARCHITECTURE */}
            <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
              {/* Outer Rail */}
              <circle
                cx="50" cy="50" r="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2, 4"
                className="text-black/10 dark:text-white/10"
              />

              {/* Kinetic Dash */}
              <motion.circle
                cx="50" cy="50" r="46"
                fill="none"
                stroke={isScrolling ? "#F36A0A" : "#241c72"}
                strokeWidth="2"
                strokeDasharray="15, 120"
                className="dark:stroke-white/40"
                animate={{ rotate: 360 }}
                transition={{ duration: isScrolling ? 1 : 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Main Progress Ring */}
              <motion.circle
                cx="50" cy="50" r="38"
                fill="none"
                stroke={isScrolling ? "#F36A0A" : "#241c72"}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="238.76"
                animate={{ 
                  strokeDashoffset: 238.76 - (238.76 * progress) / 100,
                  stroke: isScrolling ? "#F36A0A" : (progress > 99 ? "#F36A0A" : "#241c72")
                }}
                className="dark:stroke-white transition-colors duration-500"
              />
            </svg>

            {/* 3. COMMAND CORE */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              /* Removed 'transition-all duration-700' to fix hover lag */
              className={`
                relative z-10 w-11 h-11 rounded-full
                flex items-center justify-center
                backdrop-blur-2xl border
                bg-white/90 border-black/5 
                dark:bg-black/80 dark:border-white/10 dark:shadow-none
              `}
            >
              <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.15] pointer-events-none overflow-hidden rounded-full">
                <div className="h-full w-full bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:6px_6px]" />
              </div>

              <motion.div
                animate={isScrolling ? { 
                  scale: [1, 1.2, 1],
                  filter: ["blur(0px)", "blur(1px)", "blur(0px)"]
                } : {}}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                {isScrolling ? (
                  <Code size={18} className="text-[#F36A0A] fill-[#F36A0A]/20" />
                ) : (
                  <ArrowUp size={18} className="text-[#241c72] dark:text-white" />
                )}
              </motion.div>

              {/* Status Indicator */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-[2px]">
                 <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-[2px] h-[2px] rounded-full ${isScrolling ? 'bg-[#0ad0f3]' : 'bg-[#241c72] dark:bg-white'}`} 
                 />
              </div>
            </motion.button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}