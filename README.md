# Panduan Kontributor - web_lpk_ijef 🚀

Selamat datang di proyek privat `web_lpk_ijef`. Dokumen ini berisi panduan untuk menyiapkan lingkungan pengembangan (*development environment*) di laptop Anda agar kode dapat berjalan dengan lancar.

---

## 🛠️ Persyaratan Sistem (Prerequisites)
Sebelum memulai, pastikan Anda sudah menginstal aplikasi berikut di laptop Anda:
- **Git** (Versi terbaru)
- **[Sebutkan Bahasa/Runtime]** (Contoh: Node.js versi v18.x / PHP versi 8.2)
- **[Sebutkan Database jika ada]** (Contoh: MySQL / PostgreSQL)
- **Kode Editor** (Direkomendasikan: VS Code)

---

## 💻 Cara Menyiapkan Lingkungan Proyek (Setup Environment)

Ikuti langkah-langkah berikut secara berurutan:

### 1. Clone Repositori
Buka terminal/Git Bash Anda, lalu jalankan perintah:
```bash
git clone https://github.com
cd web_lpk_ijef
```

### 2. Instalasi Dependensi (Packages)
Instal semua pustaka atau dependensi yang dibutuhkan oleh proyek ini:
```bash
# Jika menggunakan Node.js/JavaScript:
npm install

# Jika menggunakan PHP/Composer:
composer install

# Jika menggunakan Python:
pip install -r requirements.txt
```

### 3. Konfigurasi Environment Variables (.env)
Proyek ini menggunakan file `.env` untuk menyimpan konfigurasi sensitif (seperti database atau API key).
1. Duplikat file `.env.example` yang sudah disediakan menjadi `.env`.
2. Buka file `.env` yang baru dibuat, lalu sesuaikan nilai konfigurasi (misalnya nama database dan *password*) dengan komputer Anda.

### 4. Menjalankan Server Lokal (Local Development)
Untuk melihat dan menguji proyek di browser Anda, jalankan perintah:
```bash
# Contoh jika menggunakan Node.js:
npm run dev

# Contoh jika menggunakan PHP/Laravel:
php artisan serve
```
Setelah itu, buka browser Anda dan akses alamat yang tertera di terminal (biasanya `http://localhost:3000` atau `http://127.0.0.1:8000`).

---

## 🔀 Alur Kerja Git (Git Workflow)
Agar cabang `main` tetap aman, mohon ikuti aturan berikut saat berkontribusi:
1. Jangan pernah melakukan `push` langsung ke *branch* `main`.
2. Selalu buat *branch* baru dari `main` sebelum bekerja:
   ```bash
   git checkout -b namaAnda/fitur-yang-dibuat
   ```
3. Jika sudah selesai, lakukan `push` ke *branch* Anda dan buat **Pull Request (PR)** di GitHub untuk ditinjau oleh pemilik proyek yaitu Mang DODO.
