"use client";
import styles from "../styles/productcard.module.css";

export type ProductCondition = "Reparado" | "Caja Abierta" | "Exhibición";

export interface Product {
  id: string;
  title: string;
  imageUrl: string;
  condition: ProductCondition;
  honestDetail: string;
  originalPrice: number;
  honestPrice: number;
}

interface ProductCardProps {
  product: Product;
  whatsappNumber: string;
}

const conditionConfig: Record<ProductCondition, { color: string; emoji: string }> = {
  Reparado:        { color: "#2a9d5c", emoji: "🔧" },
  "Caja Abierta":  { color: "#1a6fd4", emoji: "📦" },
  Exhibición:      { color: "#c87a1a", emoji: "🏷️" },
};

function formatPrice(n: number) {
  return "S/ " + n.toLocaleString("es-PE");
}

function savingsPercent(original: number, honest: number) {
  return Math.round(((original - honest) / original) * 100);
}

export default function ProductCard({ product, whatsappNumber }: ProductCardProps) {
  const { color, emoji } = conditionConfig[product.condition];
  const savings = savingsPercent(product.originalPrice, product.honestPrice);

  const waMessage = encodeURIComponent(
    `¡Hola! Me interesa comprar el ${product.title} que está a ${formatPrice(product.honestPrice)}. ¿Aún está disponible?`
  );
  const waUrl = `https://wa.me/${whatsappNumber}?text=${waMessage}`;

  return (
    <article className={styles.card}>
      <div className={styles.savingsBadge}>-{savings}%</div>

      <div className={styles.imageWrap}>
        <img src={product.imageUrl} alt={product.title} className={styles.image} />
        <span
          className={styles.conditionTag}
          style={{ "--cond-color": color } as React.CSSProperties}
        >
          {emoji} {product.condition}
        </span>
      </div>

      <div className={styles.trustBadge}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L3 6v6c0 5.25 3.75 10.14 9 11.25C17.25 22.14 21 17.25 21 12V6l-9-4z" fill="#2a9d5c"/>
          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Revisado por HONESTOpe
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.honestDetail}>
          <span className={styles.honestLabel}>📋 Detalle honesto</span>
          <p className={styles.honestText}>{product.honestDetail}</p>
        </div>

        <div className={styles.priceBlock}>
          <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
          <div className={styles.priceRow}>
            <span className={styles.honestPrice}>{formatPrice(product.honestPrice)}</span>
            <span className={styles.savingsLabel}>Ahorras {formatPrice(product.originalPrice - product.honestPrice)}</span>
          </div>
        </div>

        <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Lo quiero
        </a>
      </div>
    </article>
  );
}