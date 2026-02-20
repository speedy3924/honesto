// components/ServicesSection.tsx
import Image from "next/image";
import ServiceCard, { type Service } from "./ServiceCard";
import styles from "@/styles/services.module.css";

const SERVICES: Service[] = [
  {
    id: "gasfiteria",
    name: "Gasfitería",
    description: "Tuberías, filtraciones e instalaciones de agua",
    icon: (
      <Image
        src="https://img.icons8.com/color/96/plumber.png"
        alt="Gasfitería"
        width={64}
        height={64}
        unoptimized
      />
    ),
    waMessage:
      "Hola, necesito un servicio de *gasfitería* en Piura.\nTipo de trabajo:\nDistrito:",
  },
  {
    id: "electricidad",
    name: "Electricidad",
    description: "Instalaciones eléctricas, cortos y fallas",
    icon: (
      <Image
        src="https://img.icons8.com/color/96/lightning-bolt.png"
        alt="Electricidad"
        width={64}
        height={64}
        unoptimized
      />
    ),
    waMessage:
      "Hola, necesito un servicio de *electricidad* en Piura.\nTipo de trabajo:\nDistrito:",
  },
  {
    id: "pintura",
    name: "Pintura",
    description: "Pintura interior, exterior y acabados",
    icon: (
      <Image
        src="https://img.icons8.com/color/96/paint-bucket.png"
        alt="Pintura"
        width={64}
        height={64}
        unoptimized
      />
    ),
    waMessage:
      "Hola, necesito un servicio de *pintura* en Piura.\nTipo de trabajo:\nDistrito:",
  },
  {
    id: "albanileria",
    name: "Albañilería Ligera",
    description: "Reparaciones, enchapes y trabajos menores",
    icon: (
      <Image
        src="https://img.icons8.com/color/96/bricklayer.png"
        alt="Albañilería"
        width={64}
        height={64}
        unoptimized
      />
    ),
    waMessage:
      "Hola, necesito un servicio de *albañilería* en Piura.\nTipo de trabajo:\nDistrito:",
  },
  {
    id: "limpieza",
    name: "Limpieza",
    description: "Limpieza de hogar, oficinas y post-obra",
    icon: (
      <Image
        src="https://img.icons8.com/color/96/broom.png"
        alt="Limpieza"
        width={64}
        height={64}
        unoptimized
      />
    ),
    waMessage:
      "Hola, necesito un servicio de *limpieza* en Piura.\nTipo de trabajo:\nDistrito:",
  },
];

export default function ServicesSection() {
  return (
    <section id="servicios" className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>
          Selecciona el servicio que necesitas
        </h2>
        <div className={styles.grid}>
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}