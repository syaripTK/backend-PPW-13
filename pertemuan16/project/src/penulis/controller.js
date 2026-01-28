const {
  tampilPenulis,
  cariPenulis,
  tambahPenulis,
  hapusPenulis,
  ubahPenulis,
} = require("./services.js");
const { resSukses, resGagal } = require("../helpers/payload.js");

const getWriter = async (req, res) => {
  try {
    const data = await tampilPenulis();
    return resSukses(res, 200, "success", "Data penulis", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const searchWriter = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cariPenulis(id);
    return resSukses(res, 200, "Data penulis berhasil ditemukan", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const addWriter = async (req, res) => {
  try {
    const { nama_penulis, alamat } = req.body;
    const body = { nama_penulis, alamat };
    const result = await tambahPenulis(body);
    return resSukses(res, 201, "success", "Data penulis berhasil ditambahkan");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const deleteWriter = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await hapusPenulis(id);
    return resSukses(res, 200, "success", "Data penulis berhasil dihapus");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const editWriter = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_penulis, alamat } = req.body;
    const body = { nama_penulis, alamat };
    const result = await ubahPenulis(id, body);
    return resSukses(res, 200, "success", "Data penulis berhasil diupdate");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

module.exports = {
  getWriter,
  searchWriter,
  addWriter,
  editWriter,
  deleteWriter,
};
