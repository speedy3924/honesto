// components/TrustSection.tsx
import { ShieldCheck, Headphones, Ban } from "lucide-react";
import styles from "@/styles/trust.module.css";

const TRUST_ITEMS = [
  {
    label: "Técnicos verificados",
    icon: <ShieldCheck size={36} />,
    colorClass: "green",
  },
  {
    label: "Atención humana",
    icon: <Headphones size={36} />,
    colorClass: "blue",
  },
  {
    label: "Sin pagos adelantados",
    icon: <Ban size={36} />,
    colorClass: "orange",
  },
];

export default function TrustSection() {
  return (
    <>
      <section id="confianza" className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>¿Por qué elegirnos?</h2>
          <div className={styles.grid}>
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className={styles.item}>
                <div
                  className={`${styles.iconCircle} ${
                    styles[item.colorClass as keyof typeof styles]
                  }`}
                >
                  {item.icon}
                </div>
                <p className={styles.itemLabel}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <strong>HONESTO.pe</strong> — Servicios confiables en Piura, Perú &nbsp;·&nbsp;
        MVP v0.1
      </footer>
    </>
  );
}