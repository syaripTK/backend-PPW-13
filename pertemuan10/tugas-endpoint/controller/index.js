import { respond } from "../utils/response.js";
import { acara } from "../models/dataAcara.js";
import { peserta } from "../models/dataPeserta.js";

const getAllPeserta = (req, res) => {
  respond(res, 200, "success", "Data peserta", peserta);
};

const getAllEvent = (req, res) => {
  respond(res, 200, "success", "Data acara", acara);
};

const createNewEvent = (req, res) => {
  const { nama_acara, tanggal, kuota, peserta = [] } = req.body;

  const newEvent = {
    id: acara.length + 1,
    nama_acara,
    tanggal,
    kuota,
    peserta,
  };

  const duplicateName = acara.find((e) => e.nama_acara === newEvent.nama_acara);

  if (duplicateName) {
    return respond(res, 400, "error", "Acara sudah ada");
  }

  acara.push(newEvent);

  respond(res, 201, "success", "Data acara berhasil dibuat", newEvent);
};

const updateAcara = (req, res) => {
  const { id } = req.params;
  const { nama_acara, tanggal, kuota } = req.body;

 

  const index = acara.findIndex((e) => e.id === Number(id));


  acara[index] = {
    id: Number(id),
    nama_acara,
    tanggal,
    kuota,
    peserta: acara[index].peserta,
  };
  respond(res, 200, "success", "Data berhasil diupdate");
};

const deleteAcara = (req, res) => {
  const { id } = req.params;
  const index = acara.findIndex((e) => e.id === Number(id));
  acara.splice(index, 1);
  respond(res, 200, "success", "Data berhasil dihapus");
};

const addPeserta = (req, res) => {
  const { id } = req.params;
  const { pesertaId } = req.body;

  const foundPesertaId = peserta.find((p) => p.id === Number(pesertaId));
  const foundAcaraId = acara.find((e) => e.id === Number(id));

  foundAcaraId.peserta.push(foundPesertaId.id);
  respond(res, 201, "success", "Peserta berhasil ditambahkan", acara);
};

const detailAcaraById = (req, res) => {
  const { id } = req.params;
  const foundAcaraId = acara.find((e) => e.id === Number(id));

  const cloneAcara = { ...foundAcaraId };
  
  const pesertaDetail = peserta.filter((p) =>
    cloneAcara.peserta.includes(p.id)
  );

  cloneAcara.peserta = pesertaDetail;

  respond(res, 200, "success", "Detail acara", cloneAcara);
};

export {
  getAllPeserta,
  getAllEvent,
  createNewEvent,
  updateAcara,
  deleteAcara,
  addPeserta,
  detailAcaraById,
};
