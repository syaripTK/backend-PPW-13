import { koneksi } from "../config/db.js";
import respond from "../payload/response.js";

const cekId = async (req, res, next) => {
  const { id } = req.params;
  const [data] = await koneksi.query("SELECT * FROM user WHERE id_user=?", [
    id,
  ]);
  if (data.length === 0) {
    return respond(res, 404, "Data tidak ditemukan");
  }

  next();
};

const cekInput = (req, res, next) => {
  if (!req.body) {
    return respond(res, 404, "Req body harus diisi");
  }
  const { username, email, status } = req.body;
  if (!username || !email || !status) {
    return res
      .status(404)
      .json({ message: "Username, Email, dan Status harus diisi" });
  }
  next();
};

const checkBeforeDelete = async (req, res, next) => {
  const { id } = req.params;
  const [data] = await koneksi.query("SELECT * FROM user WHERE id_user=?", [
    id,
  ]);
  if (data.length === 0) {
    return respond(res, 404, "Data tidak ditemukan");
  }
  next();
};

const checkBeforeUpdate = async (req, res, next) => {
  if (!req.body) {
    return respond(res, 400, "Req body harus diisi");
  }
  const { id } = req.params;
  const { username, email, status } = req.body;
  const [data] = await koneksi.query("SELECT * FROM user WHERE id_user=?", [
    id,
  ]);
  if (data.length === 0) {
    return respond(res, 404, "Data tidak ditemukan");
  }
  if (!username || !email || !status) {
    return respond(res, 400, "Username, email, status harus diisi");
  }
  next();
};

const validateUpdateUser = (req, res, next) => {
  const { id } = req.params;
  const { username, email, status } = req.body;

  // REGEX
  const idRegex = /^[0-9]+$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const statusRegex = /^(1|0)$/;

  // VALIDASI ID
  if (!idRegex.test(id)) {
    return res.status(400).json({ message: "ID tidak valid" });
  }

  // VALIDASI USERNAME
  if (username && !usernameRegex.test(username)) {
    return res.status(400).json({ message: "Username tidak valid" });
  }

  // VALIDASI EMAIL
  if (email && !emailRegex.test(email)) {
    return res.status(400).json({ message: "Email tidak valid" });
  }

  // VALIDASI STATUS
  if (status && !statusRegex.test(status)) {
    return res.status(400).json({ message: "Status tidak valid" });
  }

  next();
};

export {
  cekId,
  cekInput,
  checkBeforeDelete,
  checkBeforeUpdate,
  validateUpdateUser,
};
