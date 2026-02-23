"use client";

import { useState, useEffect, useRef } from "react";
import { collection, doc, updateDoc, orderBy, query, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import styles from "@/styles/admin.module.css";

type Request = {
  id: string;
  name: string;
  phone: string;
  service: string;
  district: string;
  description?: string;
  status: string;
  createdAt: any;
  source?: string;
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  inProgress: "En gestión",
  completed: "Completado",
  cancelled: "Cancelado",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  inProgress: "#3b82f6",
  completed: "#22c55e",
  cancelled: "#ef4444",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [requests, setRequests] = useState<Request[]>([]);
  const [filter, setFilter] = useState("all");
  const [newAlert, setNewAlert] = useState(false);
  const prevCountRef = useRef(0);
  const audioRef = useRef<AudioContext | null>(null);

  const playAlert = () => {
    try {
      const ctx = new AudioContext();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.frequency.setValueAtTime(880, ctx.currentTime);
      oscillator.frequency.setValueAtTime(660, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  };

  useEffect(() => {
    if (!authed) return;

    const q = query(collection(db, "service_requests"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs
        .map(d => ({ id: d.id, ...d.data() } as Request))
        .filter(r => r.name);
      
      if (prevCountRef.current > 0 && data.length > prevCountRef.current) {
        playAlert();
        setNewAlert(true);
        setTimeout(() => setNewAlert(false), 4000);
      }
      prevCountRef.current = data.length;
      setRequests(data);
    });

    return () => unsub();
  }, [authed]);

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthed(true);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    setPassword("");
    setRequests([]);
    prevCountRef.current = 0;
  };

  const updateStatus = async (id: string, newStatus: string) => {
    await updateDoc(doc(db, "service_requests", id), { status: newStatus });
  };

  const filtered = filter === "all" ? requests : requests.filter(r => r.status === filter);

  if (!authed) {
    return (
      <div className={styles.loginWrap}>
        <div className={styles.loginBox}>
          <img src="/logo.png" alt="HONESTOpe" style={{ height: 48, marginBottom: 24 }} />
          <h2>Panel de Administración</h2>
          <p>Ingresa la contraseña para continuar</p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="Contraseña"
            className={styles.passwordInput}
            autoFocus
          />
          <button className={styles.loginBtn} onClick={handleLogin}>
            Ingresar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      {newAlert && (
        <div className={styles.alertBanner}>
          Nueva solicitud recibida
        </div>
      )}

      <div className={styles.topBar}>
        <img src="/logo.png" alt="HONESTOpe" style={{ height: 36 }} />
        <span className={styles.badge}>{requests.length} solicitudes</span>
        <button className={styles.logoutBtn} onClick={handleLogout}>Salir</button>
      </div>

      <div className={styles.filters}>
        {["all", "pending", "inProgress", "completed", "cancelled"].map(f => (
          <button
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "Todos" : STATUS_LABELS[f]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>No hay solicitudes en esta categoría.</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map(r => (
            <div key={r.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div>
                  <p className={styles.name}>{r.name}</p>
                  <p className={styles.service}>{r.service} · {r.district}</p>
                </div>
                <span
                  className={styles.status}
                  style={{ background: STATUS_COLORS[r.status] || "#94a3b8" }}
                >
                  {STATUS_LABELS[r.status] || r.status}
                </span>
              </div>

              {r.description && (
                <p className={styles.description}>{r.description}</p>
              )}

              <div className={styles.actions}>
                
                 <a href={`https://wa.me/51${r.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.waBtn}
                >
                  WhatsApp
                </a>
                <a href={`tel:${r.phone}`} className={styles.callBtn}>
                  Llamar
                </a>
              </div>

              <div className={styles.statusBtns}>
                {Object.entries(STATUS_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    className={`${styles.statusBtn} ${r.status === key ? styles.statusBtnActive : ""}`}
                    onClick={() => updateStatus(r.id, key)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <p className={styles.date}>
                {r.createdAt?.toDate?.()?.toLocaleString("es-PE") ?? ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}