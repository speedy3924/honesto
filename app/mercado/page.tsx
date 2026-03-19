"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import ProductCard, { Product } from "../../components/ProductCard";
import styles from "../../styles/mercado.module.css";

export default function MercadoPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51978797239";

  useEffect(() => {
    async function fetchProducts() {
      try {
        const q = query(collection(db, "mercado_products"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() } as Product)));
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

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
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner} />
            <p>Cargando productos...</p>
          </div>
        ) : products.length === 0 ? (
          <div className={styles.emptyState}>
            <span>📦</span>
            <p>Pronto habrá nuevas oportunidades. Vuelve pronto.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                whatsappNumber={whatsappNumber}
              />
            ))}
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