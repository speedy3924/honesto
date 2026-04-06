"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import styles from "@/styles/pushpanel.module.css";

export default function PushPanel() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("https://www.honestope.com/mercado");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ sent: number; failed: number; total: number } | null>(null);
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);

  useEffect(() => {
    async function countTokens() {
      const snap = await getDocs(collection(db, "push_tokens"));
      setSubscriberCount(snap.size);
    }
    countTokens();
  }, []);

  async function handleSend() {
    if (!title || !body) {
      alert("Escribe el título y el mensaje.");
      return;
    }
    if (!confirm(`¿Enviar notificación a ${subscriberCount} suscriptores?`)) return;
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/api/notify-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, url }),
      });
      const data = await res.json();
      setResult(data);
      setTitle("");
      setBody("");
    } catch (e) {
      alert("Error al enviar. Intenta de nuevo.");
    }
    setSending(false);
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h3 className={styles.panelTitle}>🔔 Enviar notificación push</h3>
        {subscriberCount !== null && (
          <span className={styles.subCount}>{subscriberCount} suscriptores</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Título</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Ej: ¡Nueva oferta en Mercado Honesto!"
          className={styles.input}
          maxLength={50}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Mensaje</label>
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Ej: Televisor Samsung 43&quot; a S/ 890. ¡Solo por hoy!"
          className={styles.textarea}
          rows={2}
          maxLength={120}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Link (opcional)</label>
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className={styles.input}
        />
      </div>

      <button
        onClick={handleSend}
        className={styles.sendBtn}
        disabled={sending || !title || !body}
      >
        {sending ? "Enviando..." : "Enviar a todos"}
      </button>

      {result && (
        <div className={styles.result}>
          ✅ Enviado: {result.sent} · ❌ Fallidos: {result.failed} · Total: {result.total}
        </div>
      )}
    </div>
  );
}