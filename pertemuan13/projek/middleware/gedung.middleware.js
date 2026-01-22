import { responError } from "../payload/payload.js";
import {
  duplicateGedung,
  filterByCollumn,
  getGedungId,
} from "../models/gedung.model.js";
import { checkAvailability } from "../models/sewa.model.js";

const checkId = async (req, res, next) => {
  const { id } = req.params;
  if (id === "") {
    return responError(res, 400, "error", "Id params wajib diisi!");
  }
  const result = await getGedungId(id);
  if (result.length === 0) {
    return responError(res, 404, "error", "Data tidak ditemukan");
  }
  next();
};

const checkDuplicateName = async (req, res, next) => {
  const { nama_gedung } = req.body;
  const datas = await duplicateGedung(nama_gedung);
  if (datas.length != 0) {
    return responError(
      res,
      409,
      "error",
      "Nama gedung telah digunakan data yang lain",
    );
  }
  next();
};

const checkInput = async (req, res, next) => {
  if (!req.body) {
    return responError(res, 400, "error", "Req body wajib diisi");
  }
  const { nama_pj, nama_gedung, lokasi, kategori, harga } = req.body;
  if (
    nama_pj === "" ||
    nama_gedung === "" ||
    lokasi === "" ||
    kategori === "" ||
    harga === ""
  ) {
    return responError(
      res,
      400,
      "error",
      "Nama penanggung jawab, nama gedung, lokasi, kategori, harga tidak boleh koseng!",
    );
  }
  next();
};

const validateBooking = async (req, res, next) => {
  if (!req.body) {
    return responError(res, 400, "error", "Req body wajib diisi");
  }
  const data = req.body;
  if (
    data.nama_penyewa === "" ||
    data.checkin === "" ||
    data.checkout === "" ||
    data.gedung_id === ""
  ) {
    return responError(
      res,
      400,
      "error",
      "Nama penyewa, tanggal checkin, tanggak checkout, gedung id tidak boleh kosong!",
    );
  }
  const result = await checkAvailability(
    data.gedung_id,
    data.checkin,
    data.checkout,
  );
  if (result.length != 0) {
    return responError(
      res,
      409,
      "error",
      "Mohon maaf gedung ini telah dibooking, coba gedung yang lain",
    );
  }
  next();
};

const validateCollumn = async (req, res, next) => {
  const body = req.query.body;
  if (!body) {
    return responError(res, 400, "error", "Req query harus diisi");
  }

  const data = await filterByCollumn(body);
  if (data.length === 0)
    return responError(res, 404, "error", "Data tidak ditemukan");
  next();
};

export {
  checkId,
  checkDuplicateName,
  checkInput,
  validateBooking,
  validateCollumn,
};
