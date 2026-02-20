// components/ServiceCard.tsx
"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import styles from "@/styles/services.module.css";

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  waMessage: string;
}

interface Props {
  service: Service;
}

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51999999999";

export default function ServiceCard({ service }: Props) {
  // Registra el clic en Firestore y abre WhatsApp
  const handleClick = async () => {
    try {
      // Guardar solicitud en Firestore (sin bloquear la navegación)
      addDoc(collection(db, "service_requests"), {
        serviceType: service.id,
        createdAt: serverTimestamp(),
      }).catch(console.error);
    } catch (e) {
      // Si Firebase falla, el usuario igual llega a WhatsApp
      console.error("Firestore error:", e);
    }

    const encoded = encodeURIComponent(service.waMessage);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
  };

  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>{service.icon}</div>
      <p className={styles.cardName}>{service.name}</p>
      <p className={styles.cardDesc}>{service.description}</p>
      <button onClick={handleClick} className={styles.waButton}>
        {/* WhatsApp icon SVG pequeño */}
        <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.737 5.469 2.027 7.774L0 32l8.456-2.012A15.93 15.93 0 0016 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm8.293 22.293c-.34.957-1.994 1.826-2.734 1.94-.742.116-1.658.163-2.676-.168-.617-.2-1.41-.467-2.423-.914-4.257-1.836-7.035-6.107-7.246-6.387-.211-.28-1.72-2.287-1.72-4.365 0-2.077 1.09-3.1 1.477-3.52.387-.42.844-.524 1.125-.524.28 0 .562.003.808.015.26.013.607-.098.95.726.352.84 1.193 2.908 1.298 3.119.104.21.175.456.035.735-.14.28-.21.455-.42.7-.21.245-.44.548-.63.736-.21.21-.428.437-.184.857.245.42 1.087 1.79 2.335 2.9 1.603 1.43 2.956 1.87 3.376 2.08.42.21.665.175.91-.105.246-.28 1.05-1.225 1.33-1.645.28-.42.56-.35.945-.21.386.14 2.45 1.155 2.87 1.365.42.21.7.315.805.49.104.175.104 1.013-.236 1.97z" />
        </svg>
        Hablar por WhatsApp
      </button>
    </div>
  );
}