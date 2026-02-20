"use client";

import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import styles from "@/styles/hero.module.css";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51999999999";
const heroMessage = encodeURIComponent("Hola, necesito un servicio en Piura. ¿Me pueden ayudar?");

const SLIDES = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80",
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1400&q=80",
  "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1400&q=80",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1400&q=80",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

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
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="#e8f0fc" />
              <circle cx="18" cy="14" r="7" fill="#1a6fd4" />
              <path d="M7 30c0-6 4.9-10 11-10s11 4 11 10" fill="#2a9d5c" />
              <circle cx="15.5" cy="13" r="1.2" fill="white" />
              <circle cx="20.5" cy="13" r="1.2" fill="white" />
              <path d="M15.5 16.5 Q18 19 20.5 16.5" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </svg>
            <span className={styles.logoText}>HONESTO<span>.pe</span></span>
          </div>
          <nav className={styles.nav}>
            <a href="#servicios">Servicios</a>
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#confianza">¿Por qué elegirnos?</a>
          </nav>
        </div>
      </header>

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
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${heroMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.heroCta}
          >
            🔵 Necesito un servicio ahora
          </a>
          <div className={styles.heroBadges}>
            {["Técnicos verificados", "Atención humana", "Sin pagos adelantados"].map((label) => (
              <span key={label} className={styles.badge}>
                <CheckCircle size={15} className={styles.badgeIcon} />
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