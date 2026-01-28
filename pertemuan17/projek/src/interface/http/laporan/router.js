const express = require("express");
const router = express.Router();
const uploadImage = require("../../../shared/middlewares/uploadImage.js");
const controller = require("./controller");
const { validateCreate } = require("../../../shared/middlewares/laporan.middleware.js");

router.post(
  "/tambah",
  uploadImage.single("foto_kerusakan"),
  validateCreate,
  controller.createLaporan,
);
router.get("/", controller.getLaporan);
router.get("/cari/:id", controller.searchLaporan);
router.delete("/hapus/:id", controller.deleteLaporan);
router.patch(
  "/ubah/:id",
  uploadImage.single("foto_kerusakan"),
  controller.editLaporan,
);

module.exports = router;
