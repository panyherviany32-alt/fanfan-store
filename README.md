# Fanfan Store V2 — Supabase

Versi ini sudah disiapkan untuk mengambil kategori dan produk aktif langsung dari Supabase.

## 1. Buat environment file

Salin `.env.local.example` menjadi `.env.local`.

Isi:
- `NEXT_PUBLIC_SUPABASE_URL` = URL project Supabase
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` = Publishable Key `sb_publishable_...`

Jangan masukkan Secret Key/service_role ke browser.

## 2. Jalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## 3. Database

Project mengharapkan tabel:
- categories
- products

Kolom products yang dipakai:
id, name, slug, description, price, image_url, category_id, active

## 4. Deploy

Project bisa dideploy ke Vercel. Masukkan dua environment variable yang sama di Vercel.

WhatsApp checkout diarahkan ke 0882001959221.
