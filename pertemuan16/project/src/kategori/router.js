const express = require("express");
const {
  getKategori,
  getById,
  createKategori,
  updateKategori,
  deleteKategori,
} = require("./controller.js");
const { checkId, validBody } = require("./middleware.js");
const router = express.Router();

router.get("/", getKategori);
router.get("/cari/:id", checkId, getById);
router.post("/tambah", validBody, createKategori);
router.patch("/ubah/:id", checkId, validBody, updateKategori);
router.delete("/hapus/:id", checkId, deleteKategori);

module.exports = router;
