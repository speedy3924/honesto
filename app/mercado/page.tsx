"use client";
import ProductCard, { Product } from "../../components/ProductCard";
import styles from "../../styles/mercado.module.css";

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Ropero de Melamina 4 Puertas",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    honestDetail: "Luce y funciona perfecto. Detalle mínimo: una tapa de cajón fue reemplazada por nuestro carpintero. No se nota.",
    originalPrice: 850,
    honestPrice: 340,
  },
  {
    id: "2",
    title: "Laptop HP 15 Core i5 8GB RAM",
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    honestDetail: "Como nueva por dentro, sin uso previo. Único detalle visible: rayón de 0.5 cm en la tapa trasera.",
    originalPrice: 2200,
    honestPrice: 1450,
  },
  {
    id: "3",
    title: "Refrigeradora LG No Frost 300L",
    imageUrl: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&q=80",
    honestDetail: "Enfría perfecto, compresor nuevo instalado. Pequeño golpe estético en el costado izquierdo, no se ve al colocarla.",
    originalPrice: 1800,
    honestPrice: 890,
  },
  {
    id: "4",
    title: "Sillón de Oficina Ergonómico",
    imageUrl: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=600&q=80",
    honestDetail: "Producto impecable, nunca usado. Solo la caja exterior presentaba un golpe en el embalaje.",
    originalPrice: 680,
    honestPrice: 420,
  },
  {
    id: "5",
    title: "Microondas Panasonic 20L",
    imageUrl: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&q=80",
    honestDetail: "Calienta perfecto. Detalle mínimo: el platillo giratorio fue reemplazado por pieza original de fábrica.",
    originalPrice: 450,
    honestPrice: 220,
  },
  {
    id: "6",
    title: "Televisor Samsung 43\" 4K",
    imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80",
    honestDetail: "Imagen y sonido perfectos. Viene sin control remoto original — incluimos uno universal compatible.",
    originalPrice: 1600,
    honestPrice: 890,
  },
];

export default function MercadoPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51978797239";

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>🏪 Mercado Honesto</div>
          <h1 className={styles.heroTitle}>
            Precios que<br />
            <span className={styles.heroAccent}>no tienen explicación</span>
          </h1>
          <p className={styles.heroSub}>
            Cada producto fue revisado por nuestros técnicos.
            Te contamos todo antes de que decidas.
          </p>
        </div>
        <div className={styles.heroDecor} />
      </section>

      <section className={styles.catalog}>
        <div className={styles.grid}>
          {SAMPLE_PRODUCTS.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaBox}>
          <h2 className={styles.ctaTitle}>¿No encontraste lo que buscas?</h2>
          <p className={styles.ctaText}>
            Escríbenos y te avisamos cuando llegue el producto que necesitas.
          </p>
          
            <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, me gustaría saber cuándo llegan nuevos productos al Mercado Honesto.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            Avisar cuando llegue
          </a>
        </div>
      </section>
    </main>
  );
}