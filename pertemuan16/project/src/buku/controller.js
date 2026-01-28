const {
  tampilBuku,
  cariBuku,
  tambahBuku,
  hapusBuku,
  ubahBuku,
  hargaBuku,
} = require("./services.js");
const { resSukses, resGagal } = require("../helpers/payload.js");

const getBooks = async (req, res) => {
  try {
    const books = await tampilBuku();
    return resSukses(res, 200, "success", "Data semua buku", books);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const searchBook = async (req, res) => {
  try {
    const { id } = req.params;
    const bookFound = await cariBuku(id);
    return resSukses(
      res,
      200,
      "success",
      "Data buku berhasil ditemukan",
      bookFound,
    );
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const createBook = async (req, res) => {
  try {
    const { judul, jml_halaman, ringkasan, harga, kategoriId, penulisId } =
      req.body;
    const body = {
      judul,
      jml_halaman,
      ringkasan,
      harga,
      kategoriId,
      penulisId,
    };
    const created = await tambahBuku(body);
    return resSukses(res, 201, "success", "Buku berhasil ditambahkan");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const burnBook = async (req, res) => {
  try {
    const { id } = req.params;
    const burned = await hapusBuku(id);
    return resSukses(res, 200, "success", "Data buku berhasil dihapus");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const manipulateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, jml_halaman, ringkasan, harga, kategoriId, penulisId } =
      req.body;
    const body = {
      judul,
      jml_halaman,
      ringkasan,
      harga,
      kategoriId,
      penulisId,
    };
    const manipulated = await ubahBuku(id, body);
    return resSukses(
      res,
      200,
      "success",
      "Data buku berhasil diubah",
      manipulated,
    );
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const searchBookByPrice = async (req, res) => {
  try {
    const { min, max } = req.query;
    const found = await hargaBuku(min, max);
    return resSukses(
      res,
      200,
      "success",
      "Data buku berhasil ditemukan",
      found,
    );
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

module.exports = {
  getBooks,
  searchBook,
  createBook,
  burnBook,
  manipulateBook,
  searchBookByPrice,
};
