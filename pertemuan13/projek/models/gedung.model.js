import { koneksi } from "../config/db.js";

const getAll = async () => {
  const sql = "SELECT * FROM tbl_gedung";

  const [data] = await koneksi.query(sql);
  return data;
};

const filterByCollumn = async (body) => {
  const sql = "SELECT * FROM tbl_gedung WHERE kategori LIKE ? OR lokasi LIKE ?";

  const [data] = await koneksi.query(sql, [`%${body}%`, `%${body}%`]);
  return data;
};

const filterByHarga = async (body1, body2) => {
  const sql = "SELECT * FROM tbl_gedung WHERE harga BETWEEN ? AND ?";

  const [data] = await koneksi.query(sql, [body1, body2]);
  return data;
};

const tambahGedung = async (pj, gd, lok, kat, harga) => {
  const sql =
    "INSERT INTO tbl_gedung (nama_pj, nama_gedung, lokasi, kategori, harga) VALUES (?, ?, ?, ?, ?)";

  const [data] = await koneksi.query(sql, [pj, gd, lok, kat, harga]);
  return data;
};

const deleteGedung = async (id) => {
  const sql = "DELETE from tbl_gedung WHERE id = ?";

  const [data] = await koneksi.query(sql, [id]);
  return data;
};

const updateGedung = async (id, gd, pj, lok, kat, harga) => {
  const sql =
    "UPDATE  tbl_gedung SET nama_gedung = ?, nama_pj = ? ,lokasi = ?, kategori = ?, harga =? WHERE id = ?";
  const [data] = await koneksi.query(sql, [gd, pj, lok, kat, harga, id]);
  return data;
};

const getGedungId = async (id) => {
  const sql = "SELECT * FROM tbl_gedung WHERE id =?";
  const [data] = await koneksi.query(sql, [id]);
  return data;
};

const duplicateGedung = async (name) => {
  const sql = `SELECT * FROM tbl_gedung WHERE nama_gedung = ?`
  const [data] = await koneksi.query(sql, [name]) 
  return data
}

export {
  getAll,
  getGedungId,
  filterByCollumn,
  filterByHarga,
  tambahGedung,
  deleteGedung,
  updateGedung,
  duplicateGedung
};
