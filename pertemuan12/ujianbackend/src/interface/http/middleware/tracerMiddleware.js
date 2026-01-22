import { getTracerId } from "../../../infrastructure/database/models/tracerModel.js";
import { responError } from "../../../shared/helpers/payload.js";
import { koneksi } from "../../../infrastructure/database/db.js";

const checkId = async (req, res, next) => {
  const id = req.params.id;
  const [data] = await getTracerId(id);

  if (data === undefined) {
    return responError(res, 404, "error", "Maaf, data tracer tidak ditemukan");
  }
  next();
};

const validateInsertBody = (req, res, next) => {
  if (!req.body) {
    return responError(res, 400, "error", "Req body harus diisi!");
  }
  const { nama_barang, lokasi, deskripsi, status, kontak_pelapor } = req.body;
  if (!nama_barang || !lokasi || !deskripsi || !status || !kontak_pelapor) {
    return responError(
      res,
      400,
      "error",
      "Nama barang, lokasi, deskripsi, status, kontak pelapor wajib diisi",
    );
  }
  next();
};

const validateVarchar = (req, res, next) => {
  const { nama_barang } = req.body;
  if (nama_barang && !/^.{1,50}$/.test(nama_barang)) {
    return responError(
      res,
      400,
      "error",
      "Maaf, data nama barang terlalu panjang. Maksimal 50 karakter",
    );
  }
  next();
};

const duplicateName = async (req, res, next) => {
  const { nama_barang } = req.body;
  const sql = `SELECT nama_barang FROM tracer_barang WHERE nama_barang like ? `;

  const [data] = await koneksi.query(sql, [`%${nama_barang}%`]);
  if (data.length != 0) {
    return responError(
      res,
      409,
      "error",
      "Nama barang sudah ada, silahkan gunakan yang lain",
    );
  }
  next();
};

const duplicateUpdate = async (req, res, next) => {
  const { nama_barang } = req.body;
  const sql = `SELECT nama_barang FROM tracer_barang WHERE nama_barang like ? `;
  const [data] = await koneksi.query(sql, [`%${nama_barang}%`]);
  if (data.length != 0) {
    return responError(
      res,
      409,
      "error",
      `Nama barang (${nama_barang}) sudah digunakan oleh data lain`,
    );
  }

  next();
};

const validateSearch = (req, res, next) => {
  const { key } = req.query;
  if (!key)
    return responError(res, 400, "error", "Maaf, key tidak boleh kosong");
  next();
};

const validateSort = (req, res, next) => {
  const { by, order } = req.query;
  if (!by || !order)
    return responError(res, 400, "error", "By dan order tidak boleh kosong");
  const byRegex =
    /^(nama_barang|id_tracer|lokasi|deskripsi|status|tgl_lapor|kontak_pelapor)$/;

  const orderRegex = /^(asc|desc|ASC|DESC)$/;

  if (by && !byRegex.test(by)) {
    return responError(res, 400, "error", "Nama kolom tidak valid!");
  }

  if (order && !orderRegex.test(order)) {
    responError(
      res,
      400,
      "error",
      "Order hanya boleh diisi dengan DESC atau ASC",
    );
  }

  next();
};

export {
  checkId,
  validateInsertBody,
  validateVarchar,
  duplicateName,
  duplicateUpdate,
  validateSearch,
  validateSort,
};
