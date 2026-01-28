const { get, create, getId, edit, remove } = require("./service.js");
const {
  errorResponse,
  succesResponse,
} = require("../../../shared/helpers/payload.js");

const tampilTeknisi = async (req, res) => {
  try {
    const people = await get();
    succesResponse(res, 200, "Data semua teknisi", people);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

const tambahTeknisi = async (req, res) => {
  try {
    const { nama_teknisi, no_hp, email, spesialisasi } = req.body;
    const body = { nama_teknisi, no_hp, email, spesialisasi };
    const created = await create(body);
    succesResponse(res, 201, "Data teknisi berhasil ditambahkan");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

const cariTeknisi = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await getId(id);
    console.log(found);
    succesResponse(res, 200, "Data berhasil ditemukan", found);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

const singkirkanTeknisi = async (req, res) => {
  try {
    const { id } = req.params;
    const enyah = await remove(id);
    return succesResponse(res, 200, "Data berhasil dihapus");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const gantiTeknisi = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_teknisi, no_hp, email, spesialisasi } = req.body;
    const body = { nama_teknisi, no_hp, email, spesialisasi };

    const ganti = await edit(id, body);
    return succesResponse(res, 200, "Data teknisi berhasil diubah");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
module.exports = {
  tampilTeknisi,
  cariTeknisi,
  tambahTeknisi,
  singkirkanTeknisi,
  gantiTeknisi,
};
