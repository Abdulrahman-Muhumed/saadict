"use client";

import { ReactNode } from "react";
import HeaderBare from "@/components/header/HeaderBare";
import FooterContent from "@/components/footer/FooterContent";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    // ✅ Theme provider wraps the site (auto theme detection, transitions)

    <div className="flex min-h-screen flex-col bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Header (always visible) */}
      <HeaderBare />
      {/* Main content */}
      <main className="
          flex-1
          w-full
          scroll-smooth
          motion-safe:animate-fadeIn
        ">{children}</main>

      {/* Footer */}
      <FooterContent />
    </div>

  );
}
