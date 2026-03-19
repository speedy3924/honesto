"use client";
import { useState } from "react";
import ProductCard, { Product, ProductCondition } from "../../components/ProductCard";
import styles from "../../styles/mercado.module.css";

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Ropero de Melamina 4 Puertas",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    condition: "Reparado",
    honestDetail: "Faltaba tapa de un cajón inferior. Reparado y sellado por nuestro equipo de carpintería. Funciona al 100%.",
    originalPrice: 850,
    honestPrice: 340,
  },
  {
    id: "2",
    title: "Laptop HP 15 Core i5 8GB RAM",
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    condition: "Exhibición",
    honestDetail: "Unidad de exhibición de tienda. Pequeño rayón en la tapa trasera (0.5 cm). Internamente como nueva, sin uso.",
    originalPrice: 2200,
    honestPrice: 1450,
  },
  {
    id: "3",
    title: "Refrigeradora LG No Frost 300L",
    imageUrl: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&q=80",
    condition: "Reparado",
    honestDetail: "El compresor fue reemplazado por uno nuevo. Golpe estético en costado izquierdo (no visible al instalar). Enfría perfecto.",
    originalPrice: 1800,
    honestPrice: 890,
  },
  {
    id: "4",
    title: "Sillón de Oficina Ergonómico",
    imageUrl: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=600&q=80",
    condition: "Caja Abierta",
    honestDetail: "Caja abierta pero nunca usado. La caja presentaba daños en el embalaje. El producto está impecable.",
    originalPrice: 680,
    honestPrice: 420,
  },
  {
    id: "5",
    title: "Microondas Panasonic 20L",
    imageUrl: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&q=80",
    condition: "Reparado",
    honestDetail: "Platillo giratorio roto al recibir. Reemplazado con pieza original. La unidad calienta perfecto.",
    originalPrice: 450,
    honestPrice: 220,
  },
  {
    id: "6",
    title: "Televisor Samsung 43\" 4K",
    imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80",
    condition: "Exhibición",
    honestDetail: "TV de sala de exhibición. Funciona perfectamente. Sin control remoto original (incluimos universal).",
    originalPrice: 1600,
    honestPrice: 890,
  },
];

const CONDITIONS: ("Todos" | ProductCondition)[] = ["Todos", "Reparado", "Caja Abierta", "Exhibición"];

export default function MercadoPage() {
  const [filter, setFilter] = useState<"Todos" | ProductCondition>("Todos");
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51978797239";

  const filtered = filter === "Todos"
    ? SAMPLE_PRODUCTS
    : SAMPLE_PRODUCTS.filter(p => p.condition === filter);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>🏪 Mercado Honesto</div>
          <h1 className={styles.heroTitle}>
            Segunda vida,<br />
            <span className={styles.heroAccent}>precio honesto</span>
          </h1>
          <p className={styles.heroSub}>
            Cada producto fue revisado y reparado si era necesario por nuestros técnicos.
            No escondemos nada — al contrario, te contamos todo.
          </p>
        </div>
        <div className={styles.heroDecor} />
      </section>

      <section className={styles.filters}>
        <div className={styles.filtersInner}>
          <span className={styles.filtersLabel}>Filtrar por:</span>
          <div className={styles.filterButtons}>
            {CONDITIONS.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`${styles.filterBtn} ${filter === c ? styles.filterBtnActive : ""}`}
              >
                {c}
              </button>
            ))}
          </div>
          <span className={styles.filterCount}>{filtered.length} producto{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      </section>

      <section className={styles.catalog}>
        <div className={styles.grid}>
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <p>No hay productos con ese filtro aún.</p>
          </div>
        )}
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaBox}>
          <h2 className={styles.ctaTitle}>¿No encontraste lo que buscas?</h2>
          <p className={styles.ctaText}>
            Escríbenos y te avisamos cuando llegue el producto que necesitas.
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, me gustaría saber cuándo llegan nuevos productos al Mercado Honesto.")}`}
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