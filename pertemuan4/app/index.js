import fs from "fs";

/**
 * Susunan sintaks menulis file secara synchronous
 */
// fs.writeFileSync("nama_file", isi_filenya)
// fs.writeFileSync("text.txt", 'Belajar menulis file menggunakan node')

/**
 * Membaca file dengan menggunakan fs
 * gunakan utf-8 untuk meng-encoding kode buffer
 */

const baca = fs.readFileSync("text.txt", "utf-8")
console.log(baca);
