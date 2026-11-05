🔗 https://ajithropic.github.io/persona-porto/ 

---

## Struktur 

```
persona-porto/
├── public/          # Aset statis (gambar, ikon, font)
├── scripts/         # Script bantu, misalnya watch-build
├── src/             # Source code utama (komponen, halaman, style)
├── P3Menu.jsx       # Komponen menu bergaya Persona 3
├── index.html       # Entry point HTML
├── vite.config.js   # Konfigurasi Vite
└── eslint.config.js # Konfigurasi ESLint
```

## Cara Menjalankan

Pastikan Node.js sudah terpasang, lalu:

```bash
# Clone repo
git clone https://github.com/ajithropic/persona-porto.git
cd persona-porto

# Install dependency (pilih salah satu)
pnpm install
# atau
npm install

# Jalankan development server
pnpm dev
```

Buka `http://localhost:5173` di browser.

## Script yang Tersedia

| Perintah | Fungsi |
| --- | --- |
| `pnpm dev` | Menjalankan development server |
| `pnpm build` | Build untuk production |
| `pnpm build:watch` | Build otomatis setiap ada perubahan file |
| `pnpm preview` | Preview hasil build production |
| `pnpm lint` | Mengecek kode dengan ESLint |

## Deployment

Hasil build ada di folder `dist/` dan bisa di-deploy ke hosting statis seperti Vercel, Netlify, atau GitHub Pages.

## Author

GitHub: [@ajithropic](https://github.com/ajithropic)
