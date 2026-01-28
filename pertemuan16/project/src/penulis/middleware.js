const { cariPenulis, duplicateWriterName } = require("./services.js");
const { resGagal } = require("../helpers/payload.js");

const checkId = async (req, res, next) => {
  const { id } = req.params;
  const idRegex = /^[0-9]+$/;
  if (id && !idRegex.test(id)) {
    return resGagal(res, 400, "error", "Id harus berupa angka!");
  }
  const found = await cariPenulis(id);
  if (found === null) {
    return resGagal(res, 404, "error", "Data Penulis tidak ditemukan");
  }
  next();
};

const validBody = async (req, res, next) => {
  if (!req.body) {
    return resGagal(res, 400, "error", "Req body tidak boleh kosong!");
  }
  const { nama_penulis, alamat } = req.body;
  const writerNameRegex = /^[a-zA-Z _]{3,50}$/;
  const used = await duplicateWriterName(nama_penulis);
  if (nama_penulis === "" || alamat === "") {
    return resGagal(
      res,
      400,
      "error",
      "Nama penulis, alamat tidak boleh kosong!",
    );
  }
  if (nama_penulis && !writerNameRegex.test(nama_penulis)) {
    return resGagal(res, 400, "error", "Nama penulis tidak valid!");
  }
  if (used != null) {
    return resGagal(
      res,
      409,
      "error",
      "Nama penulis telah terdaftar, silahkan gunakan nama lain.",
    );
  }

  next();
};

module.exports = {
  validBody,
  checkId,
};
