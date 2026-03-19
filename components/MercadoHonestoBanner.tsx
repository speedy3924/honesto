"use client";
import styles from "../styles/mercadobanner.module.css";

interface MercadoHonestoBannerProps {
  whatsappNumber: string;
}

export default function MercadoHonestoBanner({ whatsappNumber }: MercadoHonestoBannerProps) {
  return (
    <section className={styles.banner}>
      <div className={styles.bannerInner}>
        <div className={styles.badgeNew}>✦ NUEVO</div>
        <div className={styles.content}>
          <div className={styles.textBlock}>
            <h2 className={styles.title}>
              Mercado<br />
              <span className={styles.titleAccent}>Honesto</span>
            </h2>
            <p className={styles.description}>
              Muebles y electrodomésticos reacondicionados por nuestros técnicos.{" "}
              <strong>Ahorra hasta un 60%.</strong>
            </p>
            <a href="/mercado" className={styles.ctaButton}>
              Ver oportunidades
              <span className={styles.ctaArrow}>→</span>
            </a>
          </div>
          <div className={styles.statsBlock}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>60%</span>
              <span className={styles.statLabel}>Ahorro promedio</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>0</span>
              <span className={styles.statLabel}>Sorpresas ocultas</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Transparencia total</span>
            </div>
          </div>
        </div>
        <div className={styles.decorCircle1} />
        <div className={styles.decorCircle2} />
        <div className={styles.tagCloud}>
          <span>Reparado</span>
          <span>Caja Abierta</span>
          <span>Exhibición</span>
          <span>Todo a la vista</span>
        </div>
      </div>
    </section>
  );
}