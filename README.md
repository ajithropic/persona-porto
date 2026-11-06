🔗 https://ajithropic.github.io/persona-porto/ 

---

## Struktur 

```
persona-porto/
├── public/          
├── scripts/         
├── src/            
├── P3Menu.jsx       
├── index.html       
├── vite.config.js   
└── eslint.config.js 
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
