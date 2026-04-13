"use client";

import WhoWeAre from "@/components/landing/who-we-are";
import WhySaadICT from "@/components/landing/why-saad-ict";
import WhatWeDo from "@/components/landing/what-we-do";
import SystemsShowcase from "@/components/landing/systems-showcase";
import HowWeWork from "@/components/landing/how-we-work";
import ValueProposition from "@/components/landing/value-proposition";
import MarketFocus from "@/components/landing/market-focus";
import ProjectExperience from "@/components/landing/project-experience";
import Philosophy from "@/components/landing/philosophy";
import ClientTestimonials from "@/components/landing/client-testimonials";
import CtaPanel from "@/components/landing/cta-panel";

export default function LandingBody() {
  return (
    <div className="relative overflow-hidden">

      <WhoWeAre />
      <WhySaadICT />
      <WhatWeDo />
      <SystemsShowcase />
      <HowWeWork />
      <ValueProposition />
      <MarketFocus />
      <ProjectExperience />
      <Philosophy />
      <ClientTestimonials />
      <CtaPanel />

    </div>
  );
}