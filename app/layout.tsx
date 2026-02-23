// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HONESTOpe — Servicios para el hogar en Piura",
  description: "Conectamos personas en Piura con técnicos verificados de gasfitería, electricidad, pintura, limpieza, carpintería, mudanzas, jardinería y más. Rápido, confiable y sin pagos adelantados.",
  keywords: "gasfitero Piura, electricista Piura, pintor Piura, limpieza hogar Piura, carpintero Piura, mudanzas Piura, jardinería Piura, sastrería Piura, lavandería Piura, catering Piura, clases particulares Piura, armado muebles Piura, decoración eventos Piura, técnicos verificados Piura, servicios hogar Piura",
  openGraph: {
    title: "HONESTOpe — Servicios confiables en Piura",
    description: "Técnicos verificados para tu hogar y oficina en Piura. Gasfitería, electricidad, pintura, limpieza, mudanzas, jardinería y más.",
    url: "https://www.honestope.com",
    siteName: "HONESTOpe",
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}