const { errorResponse } = require("../helpers/payload.js");

const validateCreate = async (req, res, next) => {
  const { nama_pelapor, kelas, deskripsi, teknisiId } = req.body;

  if (!req.body || Object.keys(req.body).length === 0) {
  }

  if (!nama_pelapor || nama_pelapor.trim().length < 3) {
    return errorResponse(res, 400, "Nama pelapor minimal 3 karakter");
  }

  if (!nama_pelapor || nama_pelapor.trim().length > 50) {
    return errorResponse(res, 400, "Nama pelapor terlalu panjang");
  }

  if (!kelas || !["ppw", "ppm", "psj"].includes(kelas)) {
    return errorResponse(res, 400, "Nama kelas tidak valid");
  }

  if (!deskripsi || deskripsi.trim().length < 5) {
    return errorResponse(res, 400, "Deskripsi minimal 5 karakter");
  }

  if (!teknisiId || isNaN(teknisiId)) {
    return errorResponse(res, 400, "TeknisiId harus berupa angka!");
  }

  next();
};

module.exports = { validateCreate };
