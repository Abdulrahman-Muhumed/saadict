"use client";

import AboutHero from "./_components/AboutHero";
import ProfessionalEdgeSection from "./_components/ProfessionalEdgeSection";
import LegacySection from "./_components/LegacySection";
import IntegratedSolutionsSection from "./_components/IntegratedSolutionsSection";
import MissionVisionSection from "./_components/MissionVisionSection";
import NetworkStripSection from "./_components/NetworkStripSection";
import FinalCTASection from "./_components/FinalCTASection";

export default function AboutPage() {
  return (
    <main className="relative w-full overflow-hidden text-slate-900 dark:text-slate-100 font-sans selection:bg-yellow-400 selection:text-black">
      <AboutHero />
      <ProfessionalEdgeSection />
      <LegacySection />
      <IntegratedSolutionsSection />
      <MissionVisionSection />
      <NetworkStripSection />
      <FinalCTASection />
    </main>
  );
}
