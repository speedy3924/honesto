// app/page.tsx
// Página principal de HONESTOpe (single-page MVP)

import Hero from "@/components/Hero";
import RequestForm from "@/components/RequestForm";
import ServicesSection from "@/components/ServicesSection";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <RequestForm />
      <ServicesSection />
      <Testimonials />
      <HowItWorks />
      <TrustSection />
    </main>
  );
}