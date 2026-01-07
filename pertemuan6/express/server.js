//Ini adalah syntax utama ketika hendak membuat server
import express from "express";

const app = express();

/**
 * Ini adalah URL root
 * Jalurnya harus didefinisikan secara manual
 * Kita coba buat dulu yang typenya plan/text
 */

app.get("/syarip", (req, res) => {
  console.info(req.url);
  console.info(res.statusCode);
  res.send("Chill");
});

/**
 * Jika kita ingin mengirimkan type data JSON
 * maka fungsi res yang digunakan adalah .json() bukan .send()
 */

app.get("/json", (req, res) => {
  res.json({
    success: true,
    message: "Data from express",
    data: [
      {
        username: "Samsul",
        pass: "fufufafa",
      },
    ],
  });
});

/**
 * Query params
 */

/**
 * Perbedaan query params dan route params
 * "/" adalah url root yang akan pertama kali dijalankan
 */

app.get("/produk/:id", (req, res) => {
  //    Ini untuk mendapatkan id
  const { id } = req.params;
  /**
   * atau bisa juga dengan sintax seperti ini
   * const id = req.query.id;
   */

  console.log(id);

  res.json({
    success: true,
    message: "Data from express",
    data: [
      {
        nama_produk: "kaos",
        stok: 12,
      },
      {
        nama_produk: "celana",
        stok: 10,
      },
      {
        nama_produk: "Celana sksk",
        stok: 8,
      },
    ],
  });
});

const user = [
  { id: 1, nama: "Asep", nilai: 90 },
  { id: 2, nama: "Ujang", nilai: 80 },
  { id: 3, nama: "Samsul", nilai: 90 },
  { id: 4, nama: "Adit", nilai: 85 },
];

app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  /**
   * Karena nilai dari params type datanya adalah string,
   * maka kita bisa menggunakan parseInt() atau Number() untuk menyamakan id nya
   */

  const findUser = user.find((e) => e.id === Number(id));
  console.log(findUser);

  res.json({
    success: true,
    message: "Data from server",
    data: findUser,
  });
});

app.get("/search", (req, res) => {
  const { mod } = req.query;

  const genap = user.filter((data) => data.id % 2 === 0);
  const ganjil = user.filter((data) => data.id % 2 === 1);

  if (mod === "genap") {
    res.json(genap);
  } else if (mod === "ganjil") {
    res.json(ganjil);
  } else {
    res.send("Route tidak ditemukan");
  }
});

app.get("/searchBarang", (req, res) => {
  const { barang } = req.query;

  if (barang) {
    res.json(barang);
  } 

  res.json({
    success: true,
    message: "Data from express",
    data: [
      {
        nama_produk: "kaos",
        stok: 12,
      },
      {
        nama_produk: "celana",
        stok: 10,
      },
      {
        nama_produk: "Celana sksk",
        stok: 8,
      },
    ],
  });
});

app.listen(3000, () => {
  console.info("Server berjalan");
});
