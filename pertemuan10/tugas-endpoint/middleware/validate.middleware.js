import { respond } from "../utils/response.js";
import { acara } from "../models/dataAcara.js";
import { peserta } from "../models/dataPeserta.js";

const cekRole = (req, res, next) => {
  const admin = true;
  if (!admin) return respond(res, 403, "errror", "Access denied");
  next();
};

const validateNewEvent = (req, res, next) => {
  const { nama_acara, tanggal, kuota, peserta = [] } = req.body;
  if (!nama_acara || !tanggal || kuota == null) {
    return respond(
      res,
      400,
      "error",
      "Nama, Tanggal, Kuota tidak boleh kosong"
    );
  }

  next();
};

const validateUpdateEvent = (req, res, next) => {
  const { id } = req.params;
  const { nama_acara, tanggal, kuota } = req.body;

  if (!nama_acara || !tanggal || !kuota) {
    return respond(
      res,
      400,
      "error",
      "Nama, tanggal, kuota tidak boleh kosong!"
    );
  }

  const index = acara.findIndex((e) => e.id === Number(id));

  if (index === -1) {
    return respond(res, 404, "error", "Data tidak ditemukan");
  }

  next();
};

const validateDeleteEvent = (req, res, next) => {
  const { id } = req.params;
  const index = acara.findIndex((e) => e.id === Number(id));

  if (index === -1) {
    return respond(res, 404, "error", "Data tidak ditemukan");
  }
  next();
};

const temukanIdAcara = (req, res, next) => {
  const { id } = req.params;

  const foundAcaraId = acara.find((e) => e.id === Number(id));

  if (!foundAcaraId) {
    return respond(res, 404, "error", "Maaf, data tidak ditemukan");
  }

  next();
};

const temukanIdPeserta = (req, res, next) => {
  const { id } = req.params;
  const { pesertaId } = req.body;

  const foundPesertaId = peserta.find((p) => p.id === Number(pesertaId));
  if (!foundPesertaId) {
    return respond(res, 404, "error", "Maaf, data peserta tidak ditemukan");
  }

  next();
};

const kuotaQuantity = (req, res, next) => {
  const { id } = req.params;
  const foundAcaraId = acara.find((e) => e.id === Number(id));
  if (foundAcaraId.peserta.length >= foundAcaraId.kuota) {
    return respond(res, 400, "error", "Maaf, kuota sudah penuh");
  }

  next();
};

const pesertaTerdaftar = (req, res, next) => {
  const { id } = req.params;
  const { pesertaId } = req.body;
  const foundAcaraId = acara.find((e) => e.id === Number(id));
  if (foundAcaraId.peserta.includes(Number(pesertaId))) {
    return respond(res, 400, "error", "Maaf, peserta sudah terdaftar");
  }
  next();
};

export {
  cekRole,
  validateNewEvent,
  validateUpdateEvent,
  validateDeleteEvent,
  temukanIdAcara,
  temukanIdPeserta,
  pesertaTerdaftar,
  kuotaQuantity
};
