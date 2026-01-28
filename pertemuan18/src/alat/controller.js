const {
  tambahAlat,
  cariId,
  ubahAlat,
  hapusAlat,
  tampilAlat,
} = require("./service.js");
const { succesResponse, errorResponse } = require("../utils/response.js");
const fs = require("fs");
const path = require("path");

const createAlat = async (req, res) => {
  try {
    const { kode_alat, nama_alat, kategori, kondisi, lokasi, stok } = req.body;
    let foto_barang = null;
    if (req.file) {
      //   console.info(req.file);
      foto_barang = path.basename(req.file.path);
    }
    const body = {
      kode_alat,
      nama_alat,
      kategori,
      kondisi,
      foto_barang,
      lokasi,
      stok,
    };
    await tambahAlat(body);
    return res.status(201).json({
      message: "Data berhasil ditambahkan",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAlat = async (req, res) => {
  try {
    const data = await tampilAlat();
    return succesResponse(res, 200, "Data Alat", data);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

const searchAlat = async (req, res) => {
  try {
    const { id } = req.params;
    if (id && isNaN(id)) {
      return errorResponse(res, 400, "Id harus berupa angka");
    }
    const found = await cariId(id);
    if (found === null) {
      return errorResponse(res, 404, "Data tidak ditemukan");
    }
    return succesResponse(res, 200, "Data alat berhasil ditemukan", found);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

const removeAlat = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await cariId(id);
    if (found === null) {
      return errorResponse(res, 404, "Data tidak ditemukan");
    }

    const filePath = found.foto_barang;
    if (filePath) {
      const fullPath = path.join(__dirname, "..", "uploads", filePath);
      fs.unlink(fullPath, (err) => {
        if (err) console.error("Gagal menghapus file", err.message);
      });
    }
    await hapusAlat(id);
    return succesResponse(res, 200, "Data berhasil dihapus");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

const updateAlat = async (req, res) => {
  try {
    const { id } = req.params;
    const { kode_alat, nama_alat, kategori, kondisi, lokasi, stok } = req.body;
    if (id && isNaN(id)) {
      return errorResponse(res, 400, "Id harus berupa angka");
    }
    const found = await cariId(id);
    if (found === null) {
      return errorResponse(res, 404, "Data tidak ditemukan");
    }
    let oldPhoto = found.foto_barang;
    let foto_barang = null;
    if (req.file && oldPhoto) {
      const fullPath = path.join(__dirname, "..", "uploads", oldPhoto);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
      foto_barang = req.file.filename;
    }
    const body = {
      kode_alat,
      nama_alat,
      kategori,
      kondisi,
      foto_barang,
      lokasi,
      stok,
    };
    await ubahAlat(id, body);
    return succesResponse(res, 200, "Data berhasil diupdate");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

module.exports = { createAlat, getAlat, searchAlat, removeAlat, updateAlat };
