import { supabase } from "@/lib/supabase";
"use client";

import { useEffect, useState } from "react";

type Category = {
  id: string | number;
  name: string;
};

type Product = {
  id: string | number;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  image_url?: string | null;
  category_id?: string | number | null;
  active?: boolean;
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        if (!SUPABASE_URL || !SUPABASE_KEY) {
          throw new Error("Supabase Environment Variables belum diatur.");
        }

        const headers = {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        };

        const [categoryResponse, productResponse] = await Promise.all([
          fetch(
            `${SUPABASE_URL}/rest/v1/kategori?select=*`,
            { headers }
          ),
          fetch(
            `${SUPABASE_URL}/rest/v1/produk?select=id,name,slug,description,price,image_url,category_id,active&active=eq.true`,
            { headers }
          ),
        ]);

        if (!categoryResponse.ok) {
          throw new Error("Gagal mengambil kategori dari Supabase.");
        }

        if (!productResponse.ok) {
          throw new Error("Gagal mengambil produk dari Supabase.");
        }

        const categoryData = await categoryResponse.json();
        const productData = await productResponse.json();

        setCategories(categoryData);
        setProducts(productData);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan."
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  function formatPrice(price: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  }

  function orderProduct(product: Product) {
    const message = `Halo Fanfan Store 💗 Saya ingin membeli ${product.name} dengan harga ${formatPrice(product.price)}.`;
    const url = `https://wa.me/62882001959221?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  return (
    <main className="min-h-screen bg-[#fff7fb] text-[#4a2636]">
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #fff7fb;
        }

        .container {
          width: min(1100px, 92%);
          margin: auto;
        }

        .hero {
          padding: 55px 20px;
          text-align: center;
          background:
            radial-gradient(circle at top left, #ffd9ea, transparent 35%),
            radial-gradient(circle at bottom right, #f8d5e5, transparent 35%),
            #fff;
        }

        .logo {
          font-family: Georgia, serif;
          font-size: clamp(38px, 8vw, 70px);
          color: #b84f78;
          margin: 0;
        }

        .subtitle {
          margin: 8px 0 22px;
          color: #8c5b6e;
          font-size: 16px;
        }

        .badge {
          display: inline-block;
          padding: 10px 18px;
          border-radius: 999px;
          background: #f7c5d9;
          color: #7e3655;
          font-weight: 700;
        }

        .section {
          padding: 35px 0;
        }

        .section-title {
          font-family: Georgia, serif;
          font-size: 30px;
          text-align: center;
          color: #a8456d;
          margin-bottom: 22px;
        }

        .categories {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding: 5px 2px 15px;
        }

        .category {
          white-space: nowrap;
          padding: 11px 18px;
          border-radius: 999px;
          background: white;
          border: 1px solid #f1c5d6;
          color: #a8456d;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 18px;
        }

        .card {
          overflow: hidden;
          border-radius: 22px;
          background: white;
          border: 1px solid #f4d5e1;
          box-shadow: 0 8px 25px rgba(170, 80, 115, 0.08);
        }

        .product-image {
          width: 100%;
          height: 190px;
          object-fit: cover;
          background: #fbe4ed;
        }

        .placeholder {
          height: 190px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #fbd7e5, #fff);
          color: #bd6a8a;
          font-size: 42px;
        }

        .card-body {
          padding: 17px;
        }

        .product-name {
          margin: 0 0 7px;
          font-size: 18px;
          color: #633447;
        }

        .description {
          min-height: 40px;
          margin: 0 0 12px;
          color: #997180;
          font-size: 13px;
        }

        .price {
          color: #b13f6b;
          font-size: 19px;
          font-weight: 800;
          margin-bottom: 13px;
        }

        .button {
          width: 100%;
          border: 0;
          padding: 12px;
          border-radius: 13px;
          background: #d86691;
          color: white;
          font-weight: 700;
          cursor: pointer;
        }

        .button:hover {
          background: #bd4e79;
        }

        .empty {
          padding: 35px;
          text-align: center;
          border-radius: 20px;
          background: white;
          color: #95687a;
        }

        .error {
          margin: 20px auto;
          max-width: 700px;
          padding: 15px;
          border-radius: 14px;
          background: #ffe5ed;
          color: #a33d62;
          text-align: center;
        }

        footer {
          margin-top: 30px;
          padding: 30px 20px;
          text-align: center;
          background: #f8d2e1;
          color: #754256;
        }
      `}</style>

      <header className="hero">
        <div className="container">
          <h1 className="logo">Fanfan Store</h1>
          <p className="subtitle">
            Apk Premium • Digital Store • Fast & Trusted
          </p>
          <span className="badge">♡ Premium Untuk Kamu ♡</span>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Kategori</h2>

          {categories.length > 0 ? (
            <div className="categories">
              {categories.map((category) => (
                <div className="category" key={category.id}>
                  ♡ {category.name}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty">
              Belum ada kategori tersedia.
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Produk Premium</h2>

          {loading && (
            <div className="empty">
              Memuat produk Fanfan Store... ♡
            </div>
          )}

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="empty">
              Belum ada produk aktif.
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className="grid">
              {products.map((product) => (
                <article className="card" key={product.id}>
                  {product.image_url ? (
                    <img
                      className="product-image"
                      src={product.image_url}
                      alt={product.name}
                    />
                  ) : (
                    <div className="placeholder">♡</div>
                  )}

                  <div className="card-body">
                    <h3 className="product-name">
                      {product.name}
                    </h3>

                    <p className="description">
                      {product.description || "Produk premium Fanfan Store."}
                    </p>

                    <div className="price">
                      {formatPrice(product.price)}
                    </div>

                    <button
                      className="button"
                      onClick={() => orderProduct(product)}
                    >
                      Order via WhatsApp
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer>
        <strong>Fanfan Store</strong>
        <br />
        Apk Premium & Produk Digital
        <br />
        WhatsApp: 0882001959221
      </footer>
    </main>
  );
}
