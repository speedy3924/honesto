// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HONESTO.pe — Servicios confiables en Piura",
  description:
    "Conectamos personas con técnicos verificados para servicios de hogar y oficina en Piura, Perú. Gasfitería, electricidad, pintura, albañilería y limpieza.",
  keywords: "servicios hogar Piura, técnicos verificados, gasfitería, electricidad, limpieza Piura",
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