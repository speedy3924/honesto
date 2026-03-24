"use client";
import { useState, useEffect, useRef } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import styles from "../../../styles/adminmercado.module.css";

interface Product {
  id: string;
  title: string;
  imageUrl: string;
  images?: string[];
  honestDetail: string;
  originalPrice: number;
  honestPrice: number;
  createdAt?: any;
}

const PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "honesto2026";
const MAX_PHOTOS = 3;

export default function AdminMercadoPage() {
  const [authed, setAuthed] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [passError, setPassError] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [success, setSuccess] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [honestDetail, setHonestDetail] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [honestPrice, setHonestPrice] = useState("");

  // Múltiples fotos
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null, null]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(["", "", ""]);
  const [uploading, setUploading] = useState(false);
  const fileRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const formRef = useRef<HTMLDivElement>(null);

  const savings = originalPrice && honestPrice
    ? Math.round(((Number(originalPrice) - Number(honestPrice)) / Number(originalPrice)) * 100)
    : 0;

  useEffect(() => {
    if (authed) fetchProducts();
  }, [authed]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const q = query(collection(db, "mercado_products"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() } as Product)));
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  function handleImageChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];
    newFiles[index] = file;
    newPreviews[index] = URL.createObjectURL(file);
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  }

  function removeImage(index: number) {
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];
    newFiles[index] = null;
    newPreviews[index] = "";
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
    if (fileRefs[index].current) fileRefs[index].current!.value = "";
  }

  async function uploadSingleImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (!data.url) throw new Error("Upload failed");
    return data.url;
  }

  async function uploadAllImages(existingUrls: string[]): Promise<string[]> {
    setUploading(true);
    const urls: string[] = [];
    for (let i = 0; i < MAX_PHOTOS; i++) {
      if (imageFiles[i]) {
        const url = await uploadSingleImage(imageFiles[i]!);
        urls.push(url);
      } else if (existingUrls[i]) {
        urls.push(existingUrls[i]);
      }
    }
    setUploading(false);
    return urls;
  }

  function handleEdit(p: Product) {
    setEditingId(p.id);
    setTitle(p.title);
    setHonestDetail(p.honestDetail);
    setOriginalPrice(String(p.originalPrice));
    setHonestPrice(String(p.honestPrice));
    const existing = p.images ?? [p.imageUrl, "", ""];
    setImagePreviews([existing[0] ?? "", existing[1] ?? "", existing[2] ?? ""]);
    setImageFiles([null, null, null]);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  function handleCancelEdit() {
    setEditingId(null);
    setTitle(""); setHonestDetail(""); setOriginalPrice(""); setHonestPrice("");
    setImageFiles([null, null, null]);
    setImagePreviews(["", "", ""]);
    fileRefs.forEach(r => { if (r.current) r.current.value = ""; });
  }

  function resetForm() {
    setEditingId(null);
    setTitle(""); setHonestDetail(""); setOriginalPrice(""); setHonestPrice("");
    setImageFiles([null, null, null]);
    setImagePreviews(["", "", ""]);
    fileRefs.forEach(r => { if (r.current) r.current.value = ""; });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !honestDetail || !originalPrice || !honestPrice) {
      alert("Completa todos los campos.");
      return;
    }
    const existingPreviews = editingId ? imagePreviews : ["", "", ""];
    const hasAnyImage = imageFiles.some(f => f !== null) || existingPreviews.some(p => p !== "");
    if (!hasAnyImage) {
      alert("Sube al menos una foto del producto.");
      return;
    }
    setSaving(true);
    try {
      const urls = await uploadAllImages(existingPreviews);
      const imageUrl = urls[0] ?? "";
      const images = urls;

      if (editingId) {
        await updateDoc(doc(db, "mercado_products", editingId), {
          title, honestDetail,
          originalPrice: Number(originalPrice),
          honestPrice: Number(honestPrice),
          imageUrl, images,
        });
        setSuccess("¡Producto actualizado!");
      } else {
        await addDoc(collection(db, "mercado_products"), {
          title, honestDetail,
          originalPrice: Number(originalPrice),
          honestPrice: Number(honestPrice),
          imageUrl, images,
          createdAt: serverTimestamp(),
        });
        setSuccess("¡Producto publicado!");
      }
      resetForm();
      setTimeout(() => setSuccess(""), 3000);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Error al guardar. Intenta de nuevo.");
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este producto del catálogo?")) return;
    setDeleting(id);
    await deleteDoc(doc(db, "mercado_products", id));
    setProducts(prev => prev.filter(p => p.id !== id));
    setDeleting(null);
  }

  if (!authed) {
    return (
      <div className={styles.loginWrap}>
        <div className={styles.loginBox}>
          <div className={styles.loginLogo}>🏪</div>
          <h1 className={styles.loginTitle}>Admin Mercado</h1>
          <p className={styles.loginSub}>HONESTOpe — Panel de productos</p>
          <input
            type="password"
            placeholder="Contraseña"
            value={passInput}
            onChange={e => { setPassInput(e.target.value); setPassError(false); }}
            onKeyDown={e => e.key === "Enter" && (passInput === PASS ? setAuthed(true) : setPassError(true))}
            className={`${styles.loginInput} ${passError ? styles.loginInputError : ""}`}
          />
          {passError && <p className={styles.loginError}>Contraseña incorrecta</p>}
          <button onClick={() => passInput === PASS ? setAuthed(true) : setPassError(true)} className={styles.loginBtn}>
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <span className={styles.headerTitle}>🏪 Mercado Honesto</span>
            <span className={styles.headerSub}>Panel de productos</span>
          </div>
          <a href="/mercado" target="_blank" className={styles.headerLink}>Ver tienda →</a>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar} ref={formRef}>
          <div className={styles.card}>
            <div className={styles.cardTitleRow}>
              <h2 className={styles.cardTitle}>
                {editingId ? "✏️ Editando producto" : "Agregar producto"}
              </h2>
              {editingId && (
                <button onClick={handleCancelEdit} className={styles.cancelBtn}>Cancelar</button>
              )}
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>

              {/* Fotos múltiples */}
              <div className={styles.photosLabel}>
                <span className={styles.label}>Fotos (hasta 3)</span>
                <span className={styles.photosHint}>La primera es la principal</span>
              </div>
              <div className={styles.photosGrid}>
                {[0, 1, 2].map(i => (
                  <div key={i} className={`${styles.photoSlot} ${i === 0 ? styles.photoSlotMain : ""}`}>
                    {imagePreviews[i] ? (
                      <div className={styles.photoPreviewWrap}>
                        <img src={imagePreviews[i]} alt={`foto ${i + 1}`} className={styles.photoPreview} />
                        <button type="button" onClick={() => removeImage(i)} className={styles.photoRemove}>✕</button>
                        {i === 0 && <span className={styles.photoMainBadge}>Principal</span>}
                      </div>
                    ) : (
                      <div className={styles.photoEmpty} onClick={() => fileRefs[i].current?.click()}>
                        <span>{i === 0 ? "📷" : "+"}</span>
                        <span>{i === 0 ? "Principal" : `Foto ${i + 1}`}</span>
                      </div>
                    )}
                    <input
                      ref={fileRefs[i]}
                      type="file"
                      accept="image/*"
                      onChange={e => handleImageChange(i, e)}
                      className={styles.fileInput}
                    />
                  </div>
                ))}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Nombre del producto</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                  placeholder="Ej: Zapatera Blanca 6 Niveles" className={styles.input} />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Detalle honesto</label>
                <textarea value={honestDetail} onChange={e => setHonestDetail(e.target.value)}
                  placeholder="Funciona perfecto. Detalle mínimo: ..."
                  className={styles.textarea} rows={3} />
              </div>

              <div className={styles.priceRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Precio original (S/)</label>
                  <input type="number" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)}
                    placeholder="179" className={styles.input} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Precio Honesto (S/)</label>
                  <input type="number" value={honestPrice} onChange={e => setHonestPrice(e.target.value)}
                    placeholder="89" className={styles.input} />
                </div>
              </div>

              {savings > 0 && (
                <div className={styles.savingsPreview}>
                  El cliente ahorra <strong>{savings}%</strong> — S/ {Number(originalPrice) - Number(honestPrice)}
                </div>
              )}

              <button type="submit" className={`${styles.submitBtn} ${editingId ? styles.submitBtnEdit : ""}`}
                disabled={saving || uploading}>
                {uploading ? "Subiendo fotos..." : saving ? "Guardando..." : editingId ? "Guardar cambios" : "Publicar producto"}
              </button>

              {success && <div className={styles.successMsg}>{success}</div>}
            </form>
          </div>
        </aside>

        <main className={styles.main}>
          <div className={styles.productsHeader}>
            <h2 className={styles.cardTitle}>Productos en venta</h2>
            <span className={styles.productCount}>{products.length} activos</span>
          </div>

          {loading ? (
            <div className={styles.loadingMsg}>Cargando productos...</div>
          ) : products.length === 0 ? (
            <div className={styles.emptyMsg}>
              <span>📦</span>
              <p>No hay productos aún. Agrega el primero.</p>
            </div>
          ) : (
            <div className={styles.productGrid}>
              {products.map(p => {
                const s = Math.round(((p.originalPrice - p.honestPrice) / p.originalPrice) * 100);
                const isEditing = editingId === p.id;
                return (
                  <div key={p.id} className={`${styles.productCard} ${isEditing ? styles.productCardEditing : ""}`}>
                    <div className={styles.productImageWrap}>
                      <img src={p.imageUrl} alt={p.title} className={styles.productImage} />
                      <span className={styles.productBadge}>-{s}%</span>
                      {p.images && p.images.length > 1 && (
                        <span className={styles.photoCount}>📷 {p.images.length}</span>
                      )}
                    </div>
                    <div className={styles.productInfo}>
                      <h3 className={styles.productTitle}>{p.title}</h3>
                      <p className={styles.productDetail}>{p.honestDetail}</p>
                      <div className={styles.productPrices}>
                        <span className={styles.productOrig}>S/ {p.originalPrice.toLocaleString("es-PE")}</span>
                        <span className={styles.productHonest}>S/ {p.honestPrice.toLocaleString("es-PE")}</span>
                      </div>
                    </div>
                    <div className={styles.productActions}>
                      <button onClick={() => handleEdit(p)} className={styles.editBtn} disabled={!!deleting}>
                        ✏️ Editar
                      </button>
                      <button onClick={() => handleDelete(p.id)} className={styles.deleteBtn} disabled={deleting === p.id}>
                        {deleting === p.id ? "..." : "✕ Quitar"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}