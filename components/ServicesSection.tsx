// components/ServicesSection.tsx
import Image from "next/image";
import ServiceCard, { type Service } from "./ServiceCard";
import styles from "@/styles/services.module.css";

const SERVICES: Service[] = [
  {
    id: "gasfiteria",
    name: "Gasfitería",
    description: "Tuberías, filtraciones e instalaciones",
    icon: <Image src="https://img.icons8.com/color/96/plumber.png" alt="Gasfitería" width={64} height={64} unoptimized />,
    waMessage: "Hola, necesito un servicio de *gasfitería* en Piura.\nTipo de trabajo:\nDistrito:",
  },
  {
    id: "electricidad",
    name: "Electricidad",
    description: "Instalaciones eléctricas y fallas",
    icon: <Image src="https://img.icons8.com/color/96/lightning-bolt.png" alt="Electricidad" width={64} height={64} unoptimized />,
    waMessage: "Hola, necesito un servicio de *electricidad* en Piura.\nTipo de trabajo:\nDistrito:",
  },
  {
    id: "pintura",
    name: "Pintura",
    description: "Interior, exterior y acabados",
    icon: <Image src="https://img.icons8.com/color/96/paint-bucket.png" alt="Pintura" width={64} height={64} unoptimized />,
    waMessage: "Hola, necesito un servicio de *pintura* en Piura.\nTipo de trabajo:\nDistrito:",
  },
  {
    id: "albanileria",
    name: "Albañilería",
    description: "Reparaciones, enchapes y trabajos menores",
    icon: <Image src="https://img.icons8.com/color/96/bricklayer.png" alt="Albañilería" width={64} height={64} unoptimized />,
    waMessage: "Hola, necesito un servicio de *albañilería* en Piura.\nTipo de trabajo:\nDistrito:",
  },
  {
    id: "limpieza",
    name: "Limpieza",
    description: "Hogar, oficinas y post-obra",
    icon: <Image src="https://img.icons8.com/color/96/broom.png" alt="Limpieza" width={64} height={64} unoptimized />,
    waMessage: "Hola, necesito un servicio de *limpieza* en Piura.\nTipo de trabajo:\nDistrito:",
  },
  {
    id: "decoracion",
    name: "Decoración",
    description: "Decoración de eventos y celebraciones",
    icon: <Image src="https://img.icons8.com/color/96/confetti.png" alt="Decoración" width={64} height={64} unoptimized />,
    waMessage: "Hola, necesito *decoración para un evento* en Piura.\nTipo de evento:\nFecha:\nDistrito:",
  },
  {
    id: "catering",
    name: "Catering",
    description: "Servicio de comida para eventos",
    icon: <Image src="https://img.icons8.com/color/96/chef-hat.png" alt="Catering" width={64} height={64} unoptimized />,
    waMessage: "Hola, necesito un servicio de *catering* en Piura.\nTipo de evento:\nDistrito:",
  },
  {
    id: "sastreria y Costura",
    name: "Sastrería",
    description: "Costura, confección y arreglos",
    icon: <Image src="https://img.icons8.com/color/96/sewing-machine.png" alt="Sastrería" width={64} height={64} unoptimized />,
    waMessage: "Hola, necesito un servicio de *sastrería* en Piura.\nTipo de trabajo:\nDistrito:",
  },
  {
    id: "lavanderia",
    name: "Lavandería",
    description: "Lavado y planchado a domicilio",
    icon: <Image src="https://img.icons8.com/color/96/washing-machine.png" alt="Lavandería" width={64} height={64} unoptimized />,
    waMessage: "Hola, necesito un servicio de *lavandería* en Piura.\nCantidad de ropa:\nDistrito:",
  },
  {
    id: "clases",
    name: "Clases Particulares",
    description: "Profesores a domicilio",
    icon: <Image src="https://img.icons8.com/color/96/teacher.png" alt="Clases" width={64} height={64} unoptimized />,
    waMessage: "Hola, necesito un *profesor particular* en Piura.\nMateria:\nDistrito:",
  },
  {
    id: "carpinteria",
    name: "Carpintería",
    description: "Muebles, puertas y madera",
    icon: <Image src="https://img.icons8.com/color/96/saw.png" alt="Carpintería" width={64} height={64} unoptimized />,
    waMessage: "Hola, necesito un servicio de *carpintería* en Piura.\nTipo de trabajo:\nDistrito:",
  },
  {
    id: "muebles",
    name: "Armado de Muebles",
    description: "Ensamble e instalación",
    icon: <Image src="https://img.icons8.com/color/96/wardrobe.png" alt="Muebles" width={64} height={64} unoptimized />,
    waMessage: "Hola, necesito *armado de muebles* en Piura.\nTipo de mueble:\nDistrito:",
  },
  {
    id: "mudanzas",
    name: "Mudanzas",
    description: "Traslado seguro de enseres",
    icon: <Image src="https://img.icons8.com/color/96/truck.png" alt="Mudanzas" width={64} height={64} unoptimized />,
    waMessage: "Hola, necesito un servicio de *mudanza* en Piura.\nOrigen:\nDestino:",
  },
  {
    id: "jardineria",
    name: "Jardinería",
    description: "Jardines, podas y mantenimiento",
    icon: <Image src="https://img.icons8.com/color/96/potted-plant.png" alt="Jardinería" width={64} height={64} unoptimized />,
    waMessage: "Hola, necesito un servicio de *jardinería* en Piura.\nTipo de trabajo:\nDistrito:",
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