"use client";

import AboutHero from "./_components/AboutHero";
import IntroGrid from "./_components/intro-grid";
import Story from "./_components/story";
import IntegratedSolutionsSection from "./_components/IntegratedSolutionsSection";
import MissionVisionSection from "./_components/MissionVisionSection";
import WhySaad from "./_components/why-saad.tsx";
import FinalCTASection from "./_components/FinalCTASection";
import AboutPrinciples from "./_components/Principles";
import AboutMarketFocus from "./_components/market-focus";
import AboutProjectPresence from "./_components/project-presence";
import AboutSystemSpotlight from "./_components/spotlight";
import AboutFounderNote from "./_components/founder-note";
import AboutStandards from "./_components/Standards";
import AboutClientPerspective from "./_components/Testimonials";
//import AboutVisualGallery from "./_components/Gallery";
import AboutFutureDirection from "./_components/future-direction";
export default function AboutPage() {
  return (
    <main className="relative w-full overflow-hidden text-slate-900 dark:text-slate-100 font-sans">
      <AboutHero />
      <IntroGrid />
      <Story />
      <MissionVisionSection />
      <IntegratedSolutionsSection /> {/* what-we-build */}
      <WhySaad />
      <AboutPrinciples />
      <AboutMarketFocus />
      <AboutProjectPresence />
      <AboutSystemSpotlight />
      <AboutFounderNote />
      <AboutStandards />
      <AboutClientPerspective />
      {/* <AboutVisualGallery /> */}
      <AboutFutureDirection />
      <FinalCTASection />
    </main>
  );
}
