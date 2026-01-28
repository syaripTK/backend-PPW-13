const express = require("express");
const {
  createAlat,
  getAlat,
  searchAlat,
  removeAlat,
  updateAlat,
} = require("./controller.js");
const uploadAlat = require("../middlewares/uploadFile.js");

const router = express.Router();

router.post("/create", uploadAlat.single("foto_barang"), createAlat);
router.get("/", getAlat);
router.get("/cari/:id", searchAlat);
router.delete("/hapus/:id", removeAlat);
router.patch("/update/:id", uploadAlat.single("foto_barang"), updateAlat);

module.exports = router;
