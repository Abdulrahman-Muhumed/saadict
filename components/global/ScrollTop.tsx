"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Box } from "lucide-react"; // Importing 'Box' for logistics feel

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  // State to track if the scroll-to-top action is currently running
  const [isScrolling, setIsScrolling] = useState(false); 

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      const percent = (scrolled / height) * 100;

      setProgress(percent);
      setVisible(scrolled > 200);
      
      // If we were scrolling and we've reached the top, stop the loading state
      if (isScrolling && scrolled === 0) {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isScrolling]); // Dependency on isScrolling to check scroll position after click

  const scrollTop = () => {
    if (isScrolling) return; // Prevent multiple clicks
    
    setIsScrolling(true); // Start the loading/scrolling state
    
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Fallback: If 'smooth' behavior completes, ensure isScrolling is false.
    // In a real application, you might use an IntersectionObserver or a Promise-based 
    // smooth scroll library for more reliable completion tracking.
    const scrollEndCheck = setInterval(() => {
        if (window.scrollY === 0) {
            setIsScrolling(false);
            clearInterval(scrollEndCheck);
        }
    }, 100);
  };

  // --- Framer Motion Variants for the Inner Button/Icon ---
  const iconVariants = {
    // Rotate the 'Box' symbol as a dynamic loader when scrolling
    loading: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 0.8,
        ease: "linear",
      },
    },
    // Standard state: just a slight lift on hover
    default: {
      rotate: 0,
      scale: 1,
      transition: { duration: 0.2 },
    }
  };

  // Determine the stroke color based on whether we are actively scrolling
  const progressStrokeColor = isScrolling ? "#FF9900" : "#00338D"; // Orange/Yellow for loading, Deep Blue for progress

  // Determine the icon and the main button background color
  const buttonBgClass = isScrolling 
    ? "bg-gray-700 hover:bg-gray-600" // Gray/dark background for loading
    : "bg-gradient-to-br from-[#00338D] to-[#00A3FF] hover:from-[#0047b3] hover:to-[#00bfff]"; // Logistics Deep Blue Gradient

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.7 }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-6 right-6 z-[9999] cursor-pointer"
      onClick={scrollTop}
    >
      <div className="relative">
        {/* Progress Ring / Loader Ring */}
        <svg
          className={`w-12 h-12 rotate-[-90deg] ${isScrolling ? 'animate-spin-slow' : ''}`} // Add a slower spin for the background ring if scrolling
          viewBox="0 0 36 36"
        >
          <path
            d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
            fill="none"
            stroke="rgba(100,100,100,0.2)" // Lighter gray background for logistics feel
            strokeWidth="3"
          />
          <motion.path
            d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
            fill="none"
            stroke={progressStrokeColor} // Dynamic stroke color
            strokeWidth="3"
            // If scrolling, show a 10% dash to mimic a classic loader gap
            // Otherwise, show the progress based on scroll position
            strokeDasharray={isScrolling ? "10, 90" : `${progress}, 100`}
            className="transition-all duration-200"
            strokeLinecap="round"
            initial={false} // Ensure Framer Motion manages updates
            animate={{ stroke: progressStrokeColor, strokeDasharray: isScrolling ? "10, 90" : `${progress}, 100` }}
            transition={{ duration: 0.2 }}
          />
        </svg>

        {/* Button */}
        <motion.button
          whileHover={{ scale: isScrolling ? 1 : 1.1 }} // Disable hover scale if scrolling
          whileTap={{ scale: isScrolling ? 1 : 0.95 }}
          className={`
            absolute inset-0 flex items-center justify-center
            rounded-full
            ${buttonBgClass} 
            text-white shadow-xl backdrop-blur-xl
            border border-white/20 transition-colors duration-300
          `}
        >
          <motion.span
            
            animate={isScrolling ? "loading" : "default"} // Apply dynamic rotation if scrolling
          >
            {/* Display a 'Box' icon when loading, or the 'ArrowUp' when ready */}
            {isScrolling ? (
                <Box size={20} className="text-[#FF9900]" /> // Orange Box for a logistics 'package in transit' feel
            ) : (
                <ArrowUp size={20} />
            )}
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
}