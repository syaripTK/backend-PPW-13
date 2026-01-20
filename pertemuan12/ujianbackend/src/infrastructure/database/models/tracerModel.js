import { koneksi } from "../db.js";

const getTracerId = async (id) => {
  const sql = `SELECT id_tracer, nama_barang, lokasi, deskripsi, status, DATE_FORMAT(tgl_lapor, '%Y-%m-%d') AS tgl_lapor, kontak_pelapor FROM tracer_barang WHERE id_tracer = ${id} `;

  const [data] = await koneksi.query(sql);
  return data;
};

const getAllTracer = async () => {
  const sql =
    "SELECT id_tracer, nama_barang, lokasi, deskripsi, status, DATE_FORMAT(tgl_lapor, '%Y-%m-%d') AS tgl_lapor, kontak_pelapor FROM tracer_barang";

  const [data] = await koneksi.query(sql);
  return data;
};

const insertTracer = async (body) => {
  const sql =
    "INSERT INTO `tracer_barang`(`nama_barang`, `lokasi`, `deskripsi`, `status`, `kontak_pelapor`) VALUES (?, ?, ?, ?, ?)";
  const values = body;
  const [data] = await koneksi.query(sql, values);

  return data;
};

const deleteTracer = async (id) => {
  const sql = `DELETE FROM tracer_barang WHERE id_tracer = ${id}`;

  const [result] = await koneksi.query(sql);
  return result;
};

const changeData = async (body) => {
  const sql =
    "UPDATE tracer_barang SET nama_barang=?, lokasi=?, deskripsi=?, status=?, kontak_pelapor=? WHERE id_tracer=?";

  const [data] = await koneksi.query(sql, body);
  return data;
};

const searchData = async (keywoard) => {
  const sql =
    "SELECT * FROM tracer_barang WHERE nama_barang LIKE ? OR lokasi LIKE ?";
  const [result] = await koneksi.query(sql, [`%${keywoard}%`, `%${keywoard}%`]);
  return result;
};

const statusTracer = async (keywoard) => {
  const sql = "SELECT * FROM tracer_barang WHERE status LIKE ?";
  const [result] = await koneksi.query(sql, [`%${keywoard}%`]);
  return result;
};

const sortingData = async (key1, key2) => {
  const sql = `SELECT id_tracer, nama_barang, lokasi, deskripsi, status, DATE_FORMAT(tgl_lapor, '%Y-%m-%d') AS tgl_lapor, kontak_pelapor FROM tracer_barang ORDER BY ${key1} ${key2}`;

  const [result] = await koneksi.query(sql);
  return result;
};

const lossCount = async () => {
  const sql =
    "SELECT COUNT(status) FROM tracer_barang WHERE status like '%hilang%' ";

  const [data] = await koneksi.query(sql);
  return data;
};

const foundCount = async () => {
  const sql =
    "SELECT COUNT(status) FROM tracer_barang WHERE status like '%ditemukan%' ";

  const [data] = await koneksi.query(sql);
  return data;
};

export {
  getTracerId,
  getAllTracer,
  insertTracer,
  deleteTracer,
  changeData,
  searchData,
  statusTracer,
  sortingData,
  lossCount,
  foundCount,
};
