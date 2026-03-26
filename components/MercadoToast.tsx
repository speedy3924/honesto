"use client";
import { useState, useEffect } from "react";
import styles from "../styles/mercadotoast.module.css";

export default function MercadoToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const key = "mercado_toast_shown";
    const lastShown = localStorage.getItem(key);
    const today = new Date().toDateString();
    if (lastShown !== today) {
      setTimeout(() => setVisible(true), 1500);
      localStorage.setItem(key, today);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className={`${styles.toast} ${visible ? styles.toastVisible : ""}`}>
      <button className={styles.close} onClick={() => setVisible(false)}>✕</button>
      <div className={styles.inner}>
        <div className={styles.iconWrap}>🛒</div>
        <div className={styles.textBlock}>
          <span className={styles.badge}>¡NUEVO!</span>
          <p className={styles.title}>Mercado Honesto</p>
          <p className={styles.sub}>Productos a precios que no tienen explicación. ¡Échale un vistazo!</p>
          <a href="/mercado" className={styles.btn} onClick={() => setVisible(false)}>
            Ver ofertas →
          </a>
        </div>
      </div>
    </div>
  );
}