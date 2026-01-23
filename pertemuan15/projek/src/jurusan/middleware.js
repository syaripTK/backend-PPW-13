const respond = require("./controller.js").respond;
const { Jurusan, Sequelize } = require("../db/models");

const checkId = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return respond(res, 400, "error", "Id wajib diisi");
  if (!/^[1-9]\d*$/.test(id)) {
    return respond(res, 400, "error", "Id harus berupa angka!");
  }
  const data = await Jurusan.findByPk(id);
  if (data === null) {
    return respond(res, 404, "error", "Data jurusan tidak ditemukan");
  }
  next();
};

const validatePostJurusan = async (req, res, next) => {
  const { nama_jurusan } = req.body;
  const duplicate = await Jurusan.findOne({
    where: {
      nama_jurusan: nama_jurusan,
    },
  });
  if (duplicate.length != 0)
    return respond(
      res,
      409,
      "error",
      "Nama jurusan telah digunakan, silahkan gunakan nama yang lain",
    );
  if (nama_jurusan === "") {
    return respond(res, 400, "error", "Nama jurusan wajib diisi!");
  }
  next();
};

const validateBody = async (req, res, next) => {
  if (!req.body) {
    return respond(res, 400, "error", "Req body wajib diisi");
  }
  next();
};

module.exports = {
  checkId,
  validatePostJurusan,
  validateBody,
};
