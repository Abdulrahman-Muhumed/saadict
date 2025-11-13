"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

const primary = "#241c72";
const accent = "#F99417";

type GradientButtonProps = {
  href?: string;
  label?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  /** Optional icon on left or right */
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

/**
 * Apple-like gradient button with smooth hover scale,
 * focus ring, and theme-aware colors.
 */
export default function GradientButton({
  href,
  label,
  children,
  className = "",
  onClick,
  iconLeft,
  iconRight,
}: GradientButtonProps) {
  const { theme } = useTheme();

  // 🔥 Prevent hydration errors
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === "dark";

  const gradientStyle = {
    background: `linear-gradient(90deg, ${accent}, ${primary})`,
    boxShadow: isDark
      ? "0 10px 24px -10px rgba(249,148,23,0.4)"
      : "0 10px 28px -12px rgba(249,148,23,0.55)",
  };

  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const btnContent = (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseClasses} text-white ${className}`}
      style={gradientStyle}
    >
      {iconLeft && <span className="mr-1">{iconLeft}</span>}
      {children ?? label}
      {iconRight && <span className="ml-1">{iconRight}</span>}
    </motion.span>
  );

  return href ? (
    <Link href={href}>{btnContent}</Link>
  ) : (
    <button onClick={onClick} type="button" className="cursor-pointer">
      {btnContent}
    </button>
  );
}
