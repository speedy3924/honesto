// components/HowItWorks.tsx
import Image from "next/image";
import styles from "@/styles/howitworks.module.css";

const STEPS = [
  {
    number: "Paso 1",
    title: "Elige tu servicio",
    description: "Selecciona lo que necesitas y escríbenos por WhatsApp.",
    icon: "https://img.icons8.com/color/96/todo-list--v1.png",
  },
  {
    number: "Paso 2",
    title: "Te contactamos",
    description: "Te conectamos con un técnico verificado cerca de ti.",
    icon: "https://img.icons8.com/color/96/customer-support.png",
  },
  {
    number: "Paso 3",
    title: "Tú decides",
    description: "El trabajo se realiza y pagas solo si quedas conforme.",
    icon: "https://img.icons8.com/color/96/home--v1.png",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Cómo funciona</h2>
        <div className={styles.steps}>
          {STEPS.map((step) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepIcon}>
                <Image src={step.icon} alt={step.title} width={72} height={72} unoptimized />
              </div>
              <p className={styles.stepNumber}>{step.number}</p>
              <p className={styles.stepTitle}>{step.title}</p>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}