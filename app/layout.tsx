import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HONESTOpe - Servicios para el hogar en Piura",
  description: "Conectamos personas en Piura con tecnicos verificados de gasfiteria, electricidad, pintura, limpieza, carpinteria, mudanzas, jardineria y mas.",
  keywords: "gasfitero Piura, electricista Piura, pintor Piura, limpieza hogar Piura, carpintero Piura, mudanzas Piura, jardineria Piura, sastreria Piura, lavanderia Piura, catering Piura, clases particulares Piura, armado muebles Piura, decoracion eventos Piura, tecnicos verificados Piura",
  openGraph: {
    title: "HONESTOpe - Servicios confiables en Piura",
    description: "Tecnicos verificados para tu hogar y oficina en Piura.",
    url: "https://www.honestope.com",
    siteName: "HONESTOpe",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "https://www.honestope.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "HONESTOpe - Servicios confiables en Piura",
      }
    ],
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