const {
  tampilKategori,
  tambahKategori,
  cariKategori,
  ubahKategori,
  hapusKategori,
} = require("./services.js");
const { resSukses, resGagal } = require("../helpers/payload.js");

const getKategori = async (req, res) => {
  try {
    const data = await tampilKategori();
    return resSukses(res, 200, "success", "Data kategori", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cariKategori(id);
    return resSukses(res, 200, "success", "Data kategori berdasarkan Id", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const createKategori = async (req, res) => {
  try {
    const { nama_kategori } = req.body;
    const data = await tambahKategori({nama_kategori});
    return resSukses(res, 201, "success", "Data berhasil ditambahkan", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const deleteKategori = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await hapusKategori(id);
    return resSukses(res, 200, "success", "Data berhasil dihapus");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const updateKategori = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_kategori } = req.body;
    const data = await ubahKategori(id, {nama_kategori});
    return resSukses(res, 200, "success", "Data berhasil diupdate", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

module.exports = {
  getKategori,
  getById,
  createKategori,
  updateKategori,
  deleteKategori,
};
