import { koneksi } from "../config/db.js";

const bookingGedung = async (data) => {
  const sql =
    "INSERT INTO tbl_sewa (nama_penyewa, checkin, checkout, gedung_id) VALUES (?, ?, ?, ?)";

  const [result] = await koneksi.query(sql, [
    data.nama_penyewa,
    data.checkin,
    data.checkout,
    data.gedung_id,
  ]);
  return result;
};

const selectById = async (id) => {
  const sql =
    "SELECT id, nama_penyewa,  DATE_FORMAT(checkin, '%Y-%m-%d') AS checkin, DATE_FORMAT(checkout, '%Y-%m-%d') AS chekout, gedung_id FROM tbl_sewa WHERE id = ?";
  const [data] = await koneksi.query(sql, [id]);
  return data;
};

const joinGedung = async () => {
  const sql = `
  SELECT 
    s.id, s.nama_penyewa, DATE_FORMAT(s.checkin, '%Y-%m-%d') AS checkin, DATE_FORMAT(s.checkout, '%Y-%m-%d') AS checkout, g.nama_gedung
  FROM tbl_sewa s
  INNER JOIN tbl_gedung g ON g.id = s.gedung_id
`;

  const [data] = await koneksi.query(sql);
  return data;
};

const getDay = async (date) => {
  const sql = "SELECT DAY(?)";
  const [data] = await koneksi.query(sql, [date]);
  return data;
};

const checkAvailability = async (gedungId, checkin, checkout) => {
  const sql =
    "SELECT id FROM tbl_sewa WHERE gedung_id = ? AND checkin = ? AND checkout =?";

  const [data] = await koneksi.query(sql, [gedungId, checkin, checkout]);
  return data;
};

const getGedungAvailable = async (checkin, checkout) => {
  const sql = `
    SELECT g.*
    FROM tbl_gedung g
    WHERE g.id NOT IN (
      SELECT gedung_id
      FROM tbl_sewa
      WHERE checkin < ?
        AND checkout > ?
    )
  `;
  const [data] = await koneksi.query(sql, [checkin, checkout]);
  return data;
};
export { bookingGedung, selectById, joinGedung, checkAvailability, getGedungAvailable, getDay };
