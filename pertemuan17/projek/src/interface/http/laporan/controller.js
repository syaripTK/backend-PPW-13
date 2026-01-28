const { get, create, getId, edit, remove, search } = require("./service.js");
const {
  errorResponse,
  succesResponse,
  respond,
} = require("../../../shared/helpers/payload.js");

const createLaporan = async (req, res) => {
  try {
    const data = {
      nama_pelapor: req.body.nama_pelapor,
      kelas: req.body.kelas,
      deskripsi: req.body.deskripsi,
      teknisiId: req.body.teknisiId,
      foto_kerusakan: req.file ? req.file.filename : null,
    };

    const result = await create(data);
    const created = await getId(result.id);
    console.log(result);
    return respond(res, 201, "success", "Data berhasil ditambahkan", {
      status: created.status,
      id: created.id,
      nama_pelapor: created.nama_pelapor,
      kelas: created.kelas,
      deskripsi: created.deskripsi,
      foto_kerusakan: created.foto_kerusakan,
      teknisiId: created.teknisiId,
      updatedAt: created.updatedAt,
      createdAt: created.createdAt,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getLaporan = async (req, res) => {
  try {
    const data = await get();
    return respond(res, 200, "success", "Data laporan", data);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const searchLaporan = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await search(id);
    return respond(res, 200, "success", "Data Laporan By Id", found);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const deleteLaporan = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await remove(id);
    return respond(res, 200, "success", "Data laporan berhasil dihapus", null);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const editLaporan = async (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      nama_pelapor: req.body.nama_pelapor ?? undefined,
      kelas: req.body.kelas ?? undefined,
      deskripsi: req.body.deskripsi ?? undefined,
      teknisiId: req.body.teknisiId ?? undefined,
      foto_kerusakan: req.file ? req.file.filename : undefined,
    };

    const updated = await edit(id, data);
    return respond(res, 200, "Data berhasil diubah", updated);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  createLaporan,
  getLaporan,
  searchLaporan,
  deleteLaporan,
  editLaporan,
};
