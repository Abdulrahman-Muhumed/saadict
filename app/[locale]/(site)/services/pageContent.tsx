"use client";

// Local Components
import ServiceHero from "./_components/ServicesHero";
import ServicesCTA from "./_components/ServicesCta";
import ServicesList from "./_components/ServicesList";



export default function ServicesPage() {
  
  return (
    <div className="relative min-h-screen w-full">
      <ServiceHero />
      <ServicesList />
      <ServicesCTA />
    </div>
  );
}
