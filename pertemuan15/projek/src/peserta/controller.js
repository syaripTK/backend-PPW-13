const { Peserta, Jurusan } = require("../db/models");
const respond = require("../jurusan/controller").respond;

const getAllPeserta = async (req, res) => {
  try {
    const data = await Peserta.findAll();
    return respond(res, 200, "success", "Data semua peserta", data);
  } catch (error) {
    return respond(res, 500, "error", error.message);
  }
};

const getPesertaById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Peserta.findByPk(id);
    return respond(res, 200, "success", "Data peserta", data);
  } catch (error) {
    return respond(res, 500, "error", error.message);
  }
};

const addPeserta = async (req, res) => {
  try {
    const { nama_peserta, email, status, jurusanId } = req.body;
    const peserta = await Peserta.create({
      nama_peserta,
      email,
      status,
      jurusanId,
    });
    respond(res, 201, "success", "Data peserta berhasil ditambahkan", peserta);
  } catch (error) {
    return respond(res, 500, "error", error.message);
  }
};

const removePeserta = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Peserta.destroy({
      where: {
        id_peserta: id,
      },
    });
    return respond(res, 200, "success", "Data peserta berhasil dihapus");
  } catch (error) {
    return respond(res, 500, "error", error.message);
  }
};

const updatePeserta = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_peserta, email, status, jurusanId } = req.body;
    const updated = await Peserta.update(
      { nama_peserta, email, status, jurusanId },
      {
        where: { id_peserta: id },
      },
    );
    if (updated[0] === 0) {
      return respond(res, 404, "error", "Jurusan tidak ditemukan");
    }
    const data = await Peserta.findByPk(id);
    return respond(res, 201, "success", "Data peserta berhasil diupdate", data);
  } catch (error) {
    return respond(res, 500, "error", error.message);
  }
};

const getPesertaByJurusan = async (req, res) => {
  try {
    const { id } = req.params;
    const jurusan = await Jurusan.findByPk(id, {
      include: {
        model: Peserta,
        as: "peserta",
      },
    });

    return respond(res, 200, "success", "Detail peserta dan jurusan", jurusan);
  } catch (error) {
    return respond(res, 500, "error", error.message);
  }
};

module.exports = {
  getAllPeserta,
  getPesertaById,
  addPeserta,
  removePeserta,
  updatePeserta,
  getPesertaByJurusan
};
