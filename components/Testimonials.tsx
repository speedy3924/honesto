// components/Testimonials.tsx
import styles from "@/styles/testimonials.module.css";

const TESTIMONIALS = [
  {
    name: "María Sullón",
    district: "Piura - Castilla",
    service: "Gasfitería",
    text: "En menos de 2 horas vino el técnico y arregló la filtración que tenía semanas. Nunca pensé que sería tan rápido y sin regateos.",
    initials: "MS",
    color: "#1a6fd4",
  },
  {
    name: "Carlos Ramos",
    district: "Piura - Centro",
    service: "Electricidad",
    text: "Muy buena atención. El técnico llegó puntual, explicó todo antes de trabajar y el precio fue justo. Los recomiendo.",
    initials: "CR",
    color: "#2a9d5c",
  },
  {
    name: "Rosa Timana",
    district: "Piura - Miraflores",
    service: "Limpieza",
    text: "Quedé muy satisfecha. La señorita fue muy trabajadora y dejó todo impecable. Ya la pedí para la próxima semana.",
    initials: "RT",
    color: "#e07b00",
  },
];

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Lo que dicen nuestros clientes</h2>
        <p className={styles.subtitle}>Personas reales de Piura que ya confiaron en HONESTOpe</p>
        <div className={styles.grid}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className={styles.card}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.text}>&ldquo;{t.text}&rdquo;</p>
              <div className={styles.author}>
                <div
                  className={styles.avatar}
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className={styles.name}>{t.name}</p>
                  <p className={styles.meta}>{t.service} · {t.district}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}