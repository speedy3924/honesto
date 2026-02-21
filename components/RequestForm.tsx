// components/RequestForm.tsx
"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import styles from "@/styles/requestform.module.css";

const SERVICES = [
  "Gasfitería", "Electricidad", "Pintura", "Albañilería",
  "Limpieza", "Decoración de Eventos", "Catering", "Sastrería y Costura",
  "Lavandería", "Clases Particulares", "Carpintería",
  "Armado de Muebles", "Mudanzas", "Jardinería"
];

const DISTRICTS = ["Piura", "Castilla", "Catacaos", "La Arena", "La Unión", "Tambogrande", "Sullana", "Paita", "Otro"];

export default function RequestForm() {
  const [form, setForm] = useState({ name: "", phone: "", service: "", district: "", description: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.service || !form.district) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }
    setStatus("loading");
    try {
      await addDoc(collection(db, "service_requests"), {
        ...form,
        createdAt: serverTimestamp(),
        status: "pending",
      });
      setStatus("success");
    } catch (e) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className={styles.section}>
        <div className={`container ${styles.successBox}`}>
          <div className={styles.successIcon}>✅</div>
          <h3>¡Solicitud recibida!</h3>
          <p>Te contactaremos en menos de 30 minutos al número <strong>{form.phone}</strong>.</p>
          <button className={styles.resetBtn} onClick={() => { setForm({ name: "", phone: "", service: "", district: "", description: "" }); setStatus("idle"); }}>
            Hacer otra solicitud
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="solicitar" className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>¿Necesitas un servicio ahora?</h2>
        <p className={styles.subtitle}>Déjanos tus datos y te contactamos en menos de 30 minutos</p>
        <div className={styles.card}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Tu nombre *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Ej: María García" />
            </div>
            <div className={styles.field}>
              <label>Tu teléfono *</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Ej: 987654321" type="tel" />
            </div>
            <div className={styles.field}>
              <label>Servicio que necesitas *</label>
              <select name="service" value={form.service} onChange={handleChange}>
                <option value="">Selecciona un servicio</option>
                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label>Tu distrito *</label>
              <select name="district" value={form.district} onChange={handleChange}>
                <option value="">Selecciona tu distrito</option>
                {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className={styles.field}>
            <label>Describe el trabajo (opcional)</label>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Ej: Tengo una filtración en el baño del segundo piso..." rows={3} />
          </div>
          <button className={styles.submitBtn} onClick={handleSubmit} disabled={status === "loading"}>
            {status === "loading" ? "Enviando..." : "📩 Solicitar servicio ahora"}
          </button>
          <p className={styles.note}>Sin compromisos. Te llamamos gratis para coordinar.</p>
        </div>
      </div>
    </section>
  );
}