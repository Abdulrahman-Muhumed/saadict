"use client";

import { motion } from "framer-motion";
import { Link } from "@/lib/i18n/navigation";
import { brand } from "../config/brand";
import Image from "next/image";
import { X } from "lucide-react";
import type { NavLink } from "./types";
import { useTranslations } from "next-intl";
import clsx from "clsx";

type Props = {
  open: boolean;
  onClose: () => void;
  brandIndigo: string;
  accent: string;
  pathname: string;
  navLinks: NavLink[];
  resourceLinks: NavLink[];
};

function isLinkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MobileSheet({
  onClose,
  pathname,
  navLinks,
  resourceLinks,
}: Props) {

  const t = useTranslations("nav");
 

  const allLinks = [
    ...navLinks,
    { href: "/contact", label: t("contact") },
  ];

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      {/* BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/20 backdrop-blur-md dark:bg-black/60"
      />

      {/* SHEET */}
      <motion.div
        initial={{ x:"100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={clsx(
          "absolute top-0 bottom-0 z-10 flex w-[min(88%,380px)] flex-col overflow-hidden",
          "bg-white/95 backdrop-blur-2xl dark:bg-[#0A0A0B]/95",
           "right-0"
        )}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-black/5 p-6 dark:border-white/5">
          <Link href="/" onClick={onClose} className="flex items-center gap-3">
            <div className="relative h-8 w-8">
              <Image
                src={brand.logo.light}
                alt={brand.name}
                fill
                className="object-contain dark:invert"
                priority
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1F2933] dark:text-white">
              {brand.name}
            </span>
          </Link>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-slate-900 dark:bg-white/5 dark:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* MAIN NAV */}
          <div className="mb-8">
            <div className="mb-3 px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              {t("brandName")}
            </div>

            <div className="flex flex-col gap-2">
              {allLinks.map((link, idx) => {
                const isActive = isLinkActive(pathname, link.href);

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={clsx(
                        "group flex items-center justify-between rounded-2xl px-5 py-4 text-sm font-bold uppercase tracking-widest transition-all",
                        isActive
                          ? "bg-[#24365C] text-white shadow-lg shadow-[#24365C]/20 dark:bg-white dark:text-[#24365C] dark:shadow-white/10"
                          : "text-slate-500 hover:bg-black/5 dark:text-slate-400 dark:hover:bg-white/5"
                      )}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="active-circle"
                          className="h-1.5 w-1.5 rounded-full bg-white dark:bg-[#24365C]"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RESOURCES */}
          <div className="mb-8">
            <div className="mb-3 px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              {t("resources")}
            </div>

            <div className="flex flex-col gap-2">
              {resourceLinks.map((link, idx) => {
                const isActive = isLinkActive(pathname, link.href);

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + idx * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={clsx(
                        "group flex items-center justify-between rounded-2xl px-5 py-4 text-sm font-bold uppercase tracking-widest transition-all",
                        isActive
                          ? "bg-[#24365C] text-white shadow-lg shadow-[#24365C]/20 dark:bg-white dark:text-[#24365C] dark:shadow-white/10"
                          : "text-slate-500 hover:bg-black/5 dark:text-slate-400 dark:hover:bg-white/5"
                      )}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId={`resource-active-${link.href}`}
                          className="h-1.5 w-1.5 rounded-full bg-white dark:bg-[#24365C]"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
         
        </div>
     
      </motion.div>
    </div>
  );
}