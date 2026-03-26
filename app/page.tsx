// app/page.tsx
// Página principal de HONESTOpe (single-page MVP)
import MercadoHonestoBanner from "@/components/MercadoHonestoBanner";
import Hero from "@/components/Hero";
import RequestForm from "@/components/RequestForm";
import ServicesSection from "@/components/ServicesSection";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";
import MercadoToast from "@/components/MercadoToast";

export default function Home() {
  return (
    <main>
      <Hero />
      <RequestForm />
      <ServicesSection />
      <MercadoHonestoBanner whatsappNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51978797239"} />
      <Testimonials />
      <HowItWorks />
      <TrustSection />
      <MercadoToast />
    </main>
  );
}