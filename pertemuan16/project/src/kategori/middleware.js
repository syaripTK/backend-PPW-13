const { resGagal } = require("../helpers/payload.js");
const { cariKategori, duplikatKategori } = require("./services.js");

const checkId = async (req, res, next) => {
  const { id } = req.params;
  const idRegex = /^[0-9]+$/;
  if (id && !idRegex.test(id)) {
    return resGagal(res, 400, "error", "Id harus berupa angka!");
  }
  const found = await cariKategori(id);
  if (found === null) {
    return resGagal(res, 404, "error", "Data kategori tidak ditemukan");
  }
  next();
};

const validBody = async (req, res, next) => {
  if (!req.body) {
    return resGagal(res, 400, "error", "Req body wajib diisi!");
  }

  const { nama_kategori } = req.body;
  const chategoryNameRegex = /^[a-zA-Z\s]{3,50}$/;
  const duplicate = await duplikatKategori(nama_kategori);

  if (nama_kategori && !chategoryNameRegex.test(nama_kategori)) {
    return resGagal(res, 400, "error", "Nama kategori tidak valid!");
  }
  if (nama_kategori === "") {
    return resGagal(res, 400, "error", "Nama kategori tidak boleh kosong!");
  }
  if (duplicate != null) {
    return resGagal(res, 400, "error", "Nama kategori sudah tersedia!");
  }
  next();
};

module.exports = {
  checkId,
  validBody,
};
