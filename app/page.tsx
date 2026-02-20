// app/page.tsx
// Página principal de HONESTO.pe (single-page MVP)

import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <HowItWorks />
      <TrustSection />
    </main>
  );
}