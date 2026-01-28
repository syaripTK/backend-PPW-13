const { cariBuku, duplicateBookName } = require("./services.js");
const { resGagal } = require("../helpers/payload.js");

const checkId = async (req, res, next) => {
  const { id } = req.params;
  const idRegex = /^[0-9]+$/;
  if (id && !idRegex.test(id)) {
    return resGagal(res, 400, "error", "Id harus berupa angka!");
  }
  const found = await cariBuku(id);
  if (found === null) {
    return resGagal(res, 404, "error", "Data buku tidak ditemukan");
  }
  next();
};

const bodyValidate = async (req, res, next) => {
  if (!req.body) {
    return resGagal(res, 400, "error", "Req body tidak boleh kosong!");
  }
  const { judul, jml_halaman, ringkasan, harga, kategoriId, penulisId } =
    req.body;
  const tittleRegex = /^[a-zA-Z0-9_ ]{3,50}$/;
  const numRegex = /^[0-9]+$/;
  const duplicate = await duplicateBookName(judul);
  if (
    judul === "" ||
    jml_halaman === "" ||
    ringkasan === "" ||
    harga === "" ||
    kategoriId === "" ||
    penulisId === ""
  ) {
    return resGagal(
      res,
      400,
      "error",
      "Judul, jml_halaman, ringkasan, harga, kategoriId, dan penulisId tidak boleh kosong!",
    );
  }
  if (judul && !tittleRegex.test(judul)) {
    return resGagal(res, 400, "error", "Judul buku tidak valid!");
  }
  if (jml_halaman && !numRegex.test(jml_halaman)) {
    return resGagal(
      res,
      400,
      "error",
      "Input jumlah halaman harus berupa angka!",
    );
  }
  if (harga && !numRegex.test(harga)) {
    return resGagal(res, 400, "error", "Input harga harus berupa angka!");
  }
  if (kategoriId && !numRegex.test(kategoriId)) {
    return resGagal(res, 400, "error", "kategoriId harus berupa angka!");
  }
  if (penulisId && !numRegex.test(penulisId)) {
    return resGagal(res, 400, "error", "penulisId harus berupa angka!");
  }
  if (duplicate != null) {
    return resGagal(res, 400, "error", "Judul buku telah digunakan, silahkan gunakan judul yang lain");
  }
  next();
};

module.exports = { checkId, bodyValidate };
