import { connection } from "../config/database.js";

const getAllProduct = async () => {
  const sql = `SELECT * FROM produk`;
  const [data] = await connection.query(sql);
  return data;
};

const getProductById = async (id) => {
  const sql = `SELECT * FROM produk WHERE id = ?`;
  const [data] = await connection.query(sql, [id]);
  return data;
};

export { getAllProduct, getProductById };
