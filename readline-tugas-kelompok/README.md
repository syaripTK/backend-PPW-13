# 📘 Catatan Tugas Readline (Node.js)

Project ini merupakan **catatan tugas kelompok** yang membahas penerapan **readline versi asynchronous (Promise-based)** pada **Node.js**.  
Pengembangan aplikasi dilakukan dengan pendekatan **modular programming** menggunakan konsep **VCM (View, Controller, Module)** guna meningkatkan keteraturan kode, pemisahan tanggung jawab, serta kemudahan dalam pengelolaan logika aplikasi.


## 🎯 Tujuan Pembelajaran

Tujuan dari pembuatan project ini antara lain:
1. Memahami penggunaan **readline** pada Node.js
2. Mengimplementasikan konsep **asynchronous** dalam kode program
3. Menerapkan konsep **pemrograman modular**
4. Mengimplementasikan arsitektur sederhana **VCM (View, Controller, Module)**
5. Melatih pemisahan logika program agar lebih terstruktur dan mudah dipelihara


## 📂 Struktur Folder

readline-tugas-kelompok
│
├── view/
│ └── app.js
│
├── controller/
│ ├── core.js
│ └── utils.js
│
├── module/
│ └── data.js
│
└── README.md


### Penjelasan Struktur
- **View**  
  Berfungsi sebagai entry point aplikasi dan menangani interaksi pengguna melalui terminal menggunakan readline.
- **Controller**  
  Mengatur alur utama aplikasi (`core.js`) serta menyediakan fungsi bantu atau utilitas (`utils.js`) untuk mendukung logika program.
- **Module**  
  Menyimpan data atau logika inti aplikasi (`data.js`) yang bersifat reusable dan terpisah dari tampilan maupun controller.


## ⚙️ Teknologi yang Digunakan

- **Node.js**
- **Readline (Promise-based)**
- **CommonJS (`require`)**


## ▶️ Cara Menjalankan Aplikasi

1. Pastikan **Node.js** telah terpasang pada perangkat
2. Masuk ke direktori **view**
   
   cd view

3. Jalankan aplikasi dengan perintah:

node app.js

## 👥 Author 

- **Ahmad Syangkan Syarip**

- **Ahmad Faisal Amar**

- **Muhammad Fajar Wiguna**

