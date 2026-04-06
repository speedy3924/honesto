"use client";
import { useEffect } from "react";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { app } from "@/lib/firebase";

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

export function usePushNotifications() {
  useEffect(() => {
    async function init() {
      try {
        const supported = await isSupported();
        if (!supported) return;
        if (Notification.permission === "denied") return;

        const messaging = getMessaging(app);
        const token = await getToken(messaging, { vapidKey: VAPID_KEY });
        if (!token) return;

        // Guardar token en Firestore
        await setDoc(doc(db, "push_tokens", token), {
          token,
          createdAt: new Date().toISOString(),
          userAgent: navigator.userAgent,
        });
      } catch (e) {
        console.error("Push init error:", e);
      }
    }
    init();
  }, []);
}