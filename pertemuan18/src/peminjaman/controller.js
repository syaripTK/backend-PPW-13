const { getAll, add, findId, edit, drag } = require("./services.js");
const { succesResponse, errorResponse } = require("../utils/response.js");
const fs = require("fs");
const path = require("path");

const tampilPeminjaman = async (req, res) => {
  try {
    const data = await getAll();
    return succesResponse(res, 200, "Data peminjaman", data);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const tambahPeminjaman = async (req, res) => {
  try {
    const { alatId, keperluan, kondisi_terbaru } = req.body;
    let foto_pinjam = null;
    if (req.file) {
      foto_pinjam = req.file.filename;
    }
    const tgl_pinjam = new Date();
    const status = "dipinjam";
    const body = {
      alatId,
      tgl_pinjam,
      status,
      keperluan,
      kondisi_terbaru,
      foto_pinjam,
    };
    await add(body);
    return succesResponse(res, 200, "Data berhasil ditambahkan");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const cariPeminjaman = async (req, res) => {
  try {
    const { id } = req.params;
    if (id && isNaN(id)) {
      return errorResponse(res, 400, "Id harus berupa angka");
    }
    const found = await findId(id);
    if (found === null) {
      return errorResponse(res, 404, "Data tidak ditemukan");
    }
    return succesResponse(
      res,
      200,
      "Data peminjaman berhasil ditemukan",
      found,
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const updatePeminjaman = async (req, res) => {
  try {
    const { id } = req.params;
    if (id && isNaN(id)) {
      return errorResponse(res, 400, "Id harus berupa angka");
    }
    const found = await findId(id);
    if (found === null) {
      return errorResponse(res, 404, "Data tidak ditemukan");
    }
    let foto_kembali = null;
    const tgl_kembali = new Date();
    const status = "dikembalikan";
    if (req.file) {
      foto_kembali = req.file.filename;
    }
    const body = { foto_kembali, status, tgl_kembali };
    await edit(id, body);

    return succesResponse(res, 200, "Data peminjaman berhasil diupdate");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const hapusPeminjaman = async (req, res) => {
  try {
    const { id } = req.params;
    if (id && isNaN(id)) {
      return errorResponse(res, 400, "Id harus berupa angka");
    }
    const found = await findId(id);
    if (found === null) {
      return errorResponse(res, 404, "Data tidak ditemukan");
    }
    const oldFile = found.foto_pinjam;
    if (oldFile) {
      const pathOldFile = path.join(__dirname, "..", "uploads", oldFile);
      fs.unlink(pathOldFile, (err) => {
        if (err) console.error("Gagal menghapus file", err.message);
      });
    }
    const newFile = found.foto_kembali;
    if (newFile) {
      const pathNewFile = path.join(__dirname, "..", "uploads", newFile);
      fs.unlink(pathNewFile, (err) => {
        if (err) console.error("Gagal menghapus file", err.message);
      });
    }
    await drag(id);
    return succesResponse(res, 200, "Data peminjaman berhasil dihapus")
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  tampilPeminjaman,
  tambahPeminjaman,
  cariPeminjaman,
  updatePeminjaman,
  hapusPeminjaman
};
