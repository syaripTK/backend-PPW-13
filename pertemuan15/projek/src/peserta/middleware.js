const respond = require("../jurusan/controller.js").respond;
const { Peserta, Sequelize, Jurusan } = require("../db/models");

const checkId = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return respond(res, 400, "error", "Id wajib diisi");
  if (!/^[1-9]\d*$/.test(id)) {
    return respond(res, 400, "error", "Id harus berupa angka!");
  }
  const data = await Peserta.findByPk(id);
  if (data === null) {
    return respond(res, 404, "error", "Data peserta tidak ditemukan");
  }
  next();
};

const validateBodyPeserta = async (req, res, next) => {
  if (!req.body) {
    return respond(res, 400, "error", "Req body wajib diisi!");
  }
  const { nama_peserta, email, status, jurusanId } = req.body;
  const npReg = /^[a-zA-Z_ ]{2,30}$/;
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const statusReg = /^(active|inactive)$/;
  if (nama_peserta && !npReg.test(nama_peserta)) {
    return respond(res, 400, "error", "Nama peserta tidak valid!");
  }
  if (email && !emailReg.test(email)) {
    return respond(res, 400, "error", "Email tidak valid!");
  }
  if (status && !statusReg.test(status)) {
    return respond(res, 400, "error", "Status tidak valid!");
  }
  if (nama_peserta === "" || email === "" || status === "") {
    return respond(
      res,
      400,
      "error",
      "Nama peserta, email, status tidak boleh kosong!",
    );
  }
  const result = await Jurusan.findByPk(jurusanId);
  if (result === null) {
    return respond(res, 400, "error", "jurusanId tidak valid!");
  }
  next();
};

const invalid = async (req, res, next) => {
  const { id } = req.params;
  if (!/^[1-9]\d*$/.test(id)) {
    return respond(res, 400, "error", "Id harus berupa angka!");
  }
  const data = await Jurusan.findByPk(id);
  if (data === null) {
    return respond(
      res,
      404,
      "error",
      `Jurusan dengan id ${id} tidak ditemukan`,
    );
  }
  next();
};
module.exports = {
  checkId,
  validateBodyPeserta,
  invalid,
};
