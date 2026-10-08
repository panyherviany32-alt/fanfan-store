import { supabase } from "@/lib/supabase";

type Category = { id: string; name: string; slug: string };
type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string | null;
};

export default async function Home() {
  const [{ data: categories }, { data: products, error }] = await Promise.all([
    supabase.from("categories").select("id,name,slug").order("name"),
    supabase
      .from("products")
      .select("id,name,slug,description,price,image_url,category_id")
      .eq("active", true)
      .order("name")
  ]);

  const cats = (categories ?? []) as Category[];
  const items = (products ?? []) as Product[];

  return (
    <main>
      <header className="hero">
        <div className="brand">Fanfan Store ♡</div>
        <div className="badge">Apk Premium</div>
        <h1>Premium jadi lebih cute ✨</h1>
        <p>Canva, CapCut, Netflix, Viu dan produk digital lainnya.</p>
        <a className="wa" href="https://wa.me/62882001959221" target="_blank">Chat WhatsApp ♡</a>
      </header>

      <section className="container">
        <div className="sectionTitle">
          <div>
            <span className="eyebrow">KATEGORI</span>
            <h2>Pilih favoritmu</h2>
          </div>
        </div>

        <div className="chips">
          {cats.map(c => <span className="chip" key={c.id}>{c.name}</span>)}
        </div>

        <div className="sectionTitle productsTitle">
          <div>
            <span className="eyebrow">FANFAN STORE</span>
            <h2>Produk Premium ♡</h2>
          </div>
          <span className="count">{items.length} produk</span>
        </div>

        {error && (
          <div className="notice">
            Produk belum bisa dimuat. Cek <b>Publishable Key</b> di .env.local.
          </div>
        )}

        {!error && items.length === 0 && (
          <div className="empty">Belum ada produk aktif di database.</div>
        )}

        <div className="grid">
          {items.map(p => (
            <article className="card" key={p.id}>
              <div className="productIcon">♡</div>
              <div className="cardBody">
                <h3>{p.name}</h3>
                {p.description && <p>{p.description}</p>}
                <div className="bottom">
                  <strong>Rp {Number(p.price).toLocaleString("id-ID")}</strong>
                  <a
                    href={`https://wa.me/62882001959221?text=${encodeURIComponent(`Halo Fanfan Store, saya mau order ${p.name}.`)}`}
                    target="_blank"
                  >Order</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer>Fanfan Store • Solusi for Your Digital Life ♡</footer>
    </main>
  );
}