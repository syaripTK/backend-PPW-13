const express = require("express");
const controller = require("./controller");
const uploadPhoto = require("../middlewares/uploadFile.js");

const router = express.Router();

router.get("/", controller.tampilPeminjaman);
router.post(
  "/tambah",
  uploadPhoto.single("foto_pinjam"),
  controller.tambahPeminjaman,
);
router.get("/cari/:id", controller.cariPeminjaman);
router.patch(
  "/update/:id",
  uploadPhoto.single("foto_kembali"),
  controller.updatePeminjaman,
);
router.delete("/hapus/:id", controller.hapusPeminjaman);

module.exports = router;
