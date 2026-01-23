const { Jurusan, Peserta, Sequelize } = require("../db/models");


const respond = (res, code, status, message, data) => {
  return res.status(code).json({
    status,
    message,
    data,
  });
};

const createJurusan = async (req, res) => {
  try {
    const { nama_jurusan } = req.body;
    const jurusan = await Jurusan.create({
      nama_jurusan,
    });
    respond(res, 201, "success", "Jurusan berhasil ditambahkan", jurusan);
  } catch (error) {
    respond(res, 500, "error", error.message);
  }
};

const lookJurusan = async (req, res) => {
  try {
    const data = await Jurusan.findAll();
    respond(res, 200, "success", "Semua data jurusan", data);
  } catch (error) {
    respond(res, 500, "error", error.message);
  }
};

const searchJurusan = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Jurusan.findByPk(id);
    return respond(
      res,
      200,
      "success",
      "Data jurusan berhasil ditemukan",
      data,
    );
  } catch (error) {
    return respond(res, 500, "error", error.message);
  }
};

const updateJurusan = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Jurusan.update(req.body, {
      where: { id_jurusan: id },
    });
    if (updated[0] === 0) {
      return respond(res, 404, "error", "Jurusan tidak ditemukan");
    }
    const data = await Jurusan.findByPk(id);
    return respond(res, 201, "success", "Data jurusan berhasil diupdate", data);
  } catch (error) {
    respond(res, 500, "error", error.message);
  }
};

const deleteJurusan = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Jurusan.destroy({
      where: {
        id_jurusan: id,
      },
    });
    return respond(res, 200, "success", "Data berhasil dihapus", null);
  } catch (error) {
    return respond(res, 500, "error", error.message);
  }
};

const statistikPeserta = async (req, res) => {
  try {
    const data = await Jurusan.findAll({
      attributes: [
        "id_jurusan",
        "nama_jurusan",
        [
          Sequelize.fn("COUNT", Sequelize.col("peserta.id_peserta")),
          "total_peserta",
        ],
      ],
      include: [
        {
          model: Peserta,
          as: "peserta",
          attributes: [],
        },
      ],
      group: ["Jurusan.id_jurusan"],
    });

    return respond(res, 200, "success", "Data statistik per-jurusan", data);
  } catch (error) {
    return respond(res, 500, "error", error.message);
  }
};

module.exports = {
  createJurusan,
  lookJurusan,
  searchJurusan,
  updateJurusan,
  deleteJurusan,
  statistikPeserta,
  respond,
};
