"use client";

import { motion } from "framer-motion";

const PRIMARY = "#241c72";
const ACCENT = "#F99417";

export default function ShimmerText({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="bg-clip-text text-transparent"
      style={{
        backgroundImage: `linear-gradient(90deg, ${ACCENT}, ${PRIMARY}, ${ACCENT})`,
        backgroundSize: "200% 100%",
        textShadow: "0 4px 20px rgba(249,148,23,0.25)",
      }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
    >
      {children}
    </motion.span>
  );
}
