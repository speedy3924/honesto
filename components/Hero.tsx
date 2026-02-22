"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Menu, X } from "lucide-react";
import styles from "@/styles/hero.module.css";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51978797239";
const heroMessage = encodeURIComponent("Hola, necesito un servicio en Piura. ¿Me pueden ayudar?");

const SLIDES = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80",
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1400&q=80",
  "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1400&q=80",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1400&q=80",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <div className={styles.logo}>
            <img
              src="/logo.png"
              alt="HONESTOpe"
              style={{ height: "36px", width: "160px", objectFit: "contain", objectPosition: "left center" }}
            />
          </div>
          <nav className={styles.nav}>
            <a href="#servicios">Servicios</a>
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#confianza">¿Por qué elegirnos?</a>
          </nav>
          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
        <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Cómo funciona</a>
        <a href="#confianza" onClick={() => setMenuOpen(false)}>¿Por qué elegirnos?</a>
      </div>

      <section className={styles.hero}>
        <div className={styles.carouselBg}>
          {SLIDES.map((url, i) => (
            <div
              key={i}
              className={`${styles.slide} ${i === current ? styles.slideActive : ""}`}
              style={{ backgroundImage: `url(${url})` }}
            />
          ))}
          <div className={styles.overlay} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>
            Servicios confiables para tu hogar y oficina <span>en Piura.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Conectamos personas con técnicos verificados, sin vueltas y con atención humana.
          </p>
          
           <a href="#solicitar"
            className={styles.heroCta}
      >
            🔵 Necesito un servicio ahora
          </a>
          <div className={styles.heroBadges}>
            {["Técnicos verificados", "Atención humana", "Sin pagos adelantados"].map((label) => (
              <span key={label} className={styles.badge}>
                <CheckCircle size={14} className={styles.badgeIcon} />
                {label}
              </span>
            ))}
          </div>
          <div className={styles.dots}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Imagen ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}