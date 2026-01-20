import mysql from "mysql2/promise";
/**
 * #CREATEPOOL
 * createPool digunakan untuk multi connection
 * variable koneksi di bawah ini hanya untuk membuat konfig susunan koneksinya
 * Kalau sudah dibuat maka harus dicek apakah koneksi berjalan atau tidak
 */
const koneksi = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "bismillah",
  database: "db_praktikum2026",

  //   Ini seperti membuat antrian untuk koneksi berikutnya
  waitForConnections: true,
  //   Ini maksimal koneksi yag bisa dibuat dalam 1 waktu
  connectionLimit: 10,
  //   Kalau disi 0, maka antrian koneksinya unlimited
  queueLimit: 0,
});

// Karena kita membuat koneksi yang bersifat promise, maka fungsinya harus berupa async await
const cekKoneksi = async () => {
  try {
    //Jalankan perntah koneksinya
    const hasil = await koneksi.getConnection();
    console.info("Koneksi ke DB sedang dijalankan");

    //  Lepas koneksi jika sudah berhasil dijalankan dan sudah dipakai
    hasil.release();
    return true
  } catch (error) {
    console.error("Gagal", error.message);
  }
};

export { koneksi, cekKoneksi };
