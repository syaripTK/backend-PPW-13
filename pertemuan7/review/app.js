import express from "express";
import data from "./models/data.js";
const app = express();

//Ini wajib ada jika mau menerima kiriman data dalam bentuk json dari client
app.use(express.json());

app.get("/", (req, res) => {
  //Cara 1st (tidak disarankan)
  //res.json({ message: "Sukses", data });

  //Cara 2nd (disarankan)
  res.status(200).json({ message: "Sukses", data });
});

//Simulasi Route params "/santri/12"

app.get("/santri/:id", (req, res) => {
  const { id } = req.params;

  const result = data.find((s) => s.id === Number(id));

  /**
   * Di dalam express, 1 request hanya bisa menampung 1 respond.
   * Maka di dalam logika percabangannya harus ditambahkan return agar ketika kondisi terpenuhi
   * kodenya akan berhenti.
   */
  if (!result) {
    return res.status(404).send("Data tidak ditemukan!");
  }

  return res.status(200).json({ message: "Data success", data: result });
});

// Simulasi query params "/santri?nama=Asep"

app.get("/santri", (req, res) => {
  const cekNama = req.query.nama;

  if (!cekNama) {
    return res.status(200).json({ message: "Data success", data });
  } else {
    const hasil = data.find((d) => d.nama === cekNama);
    if (hasil) {
      return res.status(200).json({ message: "Data success", data: hasil });
    } else {
      return res.status(404).send("Route tidak ditemukan");
    }
  }
});

app.post("/santri", (req, res) => {
  //Ini buat nangkep data dari client
  const { nama, nilai } = req.body;

  const databaru = { id: data.length + 1, nama, nilai };

  if (!nilai || !nama) {
    return res.status(500).json({ message: "Request body harus diisi" });
  }
  data.push(databaru);
  console.log(data);
  res
    .status(201)
    .json({ message: "Data berhasil ditambahkan", data: databaru });
});

app.delete("/santri/:id", (req, res) => {
  const { id } = req.params;
  const index = data.findIndex((e) => (e.id = Number(id)));

  if ((index = -1)) {
    return res.status(404).json({ message: "Id santri tidak ditemukan" });
  }

  data.splice(index, 1);
  res.status(200).json({ message: "Data berhasil dihapus", data: data });
});

app.put("/santri/:id", (req, res) => {
  const { id } = req.params;
  const { nama, nilai } = req.body;
  /**
   * findIndex() digunakan untuk mencari posisi object,
   * berbeda dengan find() yang mereturn sebuah object secara utuh, yang direturn oleh findIndex adalah index arraynya
   * jika tidak ditemukan, maka findIndex akan mereturn nilai -1
   */

  const index = data.findIndex((e) => e.id === Number(id));

  data[index] = {
    id: Number(id),
    nama,
    nilai,
  };

  res.status(201).json({ message: "Data berhasil diupdate", data });
});

app.listen(3000, () => {
  console.info("Server berjalan di port 3000");
});

/**
 * Tugas (Deadline pukul 8)
 * 1. Tambahkan fitur untuk update data
 * 2. Buat dokumentasi API - (Link pengumpulan berbentuk URL)
 *    link dokumentasi di file link.txt
 */
