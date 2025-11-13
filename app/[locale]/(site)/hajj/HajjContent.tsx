"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

/* Dynamic imports to reduce bundle weight */
const HajjHero = dynamic(() => import("./_components/HajjHero"));
const RitualsCinematic = dynamic(() => import("./_components/RitualsCinematic"));
const UnifiedPackage = dynamic(() => import("./_components/UnifiedPackage"));
const SupportStrip = dynamic(() => import("./_components/SupportStrip"));
const HajjLeadModal = dynamic(() => import("./_components/HajjLeadModal"));

export default function Hajj2026Page() {
  const [open, setOpen] = useState(false);

  return (
    <main
      className="
        min-h-screen relative overflow-x-hidden 
        dark:bg-neutral-950
        text-slate-900 dark:text-slate-100 transition-colors duration-500
      "
    >
      <HajjHero onOpen={() => setOpen(true)} />
      <RitualsCinematic />
      <UnifiedPackage onOpen={() => setOpen(true)} />
      <SupportStrip onOpen={() => setOpen(true)} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <HajjLeadModal open={open} onClose={() => setOpen(false)} />
      </motion.div>
    </main>
  );
}
