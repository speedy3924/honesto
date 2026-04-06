"use client";
import { useState, useEffect } from "react";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { doc, setDoc } from "firebase/firestore";
import { db, app } from "@/lib/firebase";
import styles from "@/styles/pushprompt.module.css";

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

export default function PushNotificationPrompt() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function check() {
      try {
        const supported = await isSupported();
        if (!supported) return;
        if (Notification.permission !== "default") return;
        const dismissed = localStorage.getItem("push_dismissed");
        if (dismissed) return;
        setTimeout(() => setShow(true), 4000);
      } catch (e) {}
    }
    check();
  }, []);

  async function handleAllow() {
    setLoading(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const messaging = getMessaging(app);
        const token = await getToken(messaging, { vapidKey: VAPID_KEY });
        if (token) {
          await setDoc(doc(db, "push_tokens", token), {
            token,
            createdAt: new Date().toISOString(),
            userAgent: navigator.userAgent,
          });
        }
        setDone(true);
        setTimeout(() => setShow(false), 2000);
      } else {
        setShow(false);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  function handleDismiss() {
    localStorage.setItem("push_dismissed", "true");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className={styles.wrap}>
      {done ? (
        <div className={styles.success}>
          ✅ ¡Listo! Te avisaremos cuando lleguen nuevas ofertas.
        </div>
      ) : (
        <div className={styles.box}>
          <button className={styles.close} onClick={handleDismiss}>✕</button>
          <div className={styles.icon}>🔔</div>
          <p className={styles.title}>¿Quieres ser el primero en enterarte?</p>
          <p className={styles.sub}>Activa las notificaciones y te avisamos cuando lleguen nuevos productos al Mercado Honesto.</p>
          <div className={styles.btns}>
            <button onClick={handleAllow} className={styles.btnAllow} disabled={loading}>
              {loading ? "Activando..." : "Sí, avisar"}
            </button>
            <button onClick={handleDismiss} className={styles.btnDismiss}>
              Ahora no
            </button>
          </div>
        </div>
      )}
    </div>
  );
}