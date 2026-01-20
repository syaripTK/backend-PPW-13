import { koneksi } from "../config/db.js";
import respond from "../payload/response.js";
import { updateUserById } from "../models/user.model.js";

const getUsers = async (req, res) => {
  try {
    //Jalanin query-nya
    const sql = "SELECT * FROM user";
    /**
     * Jika tidak memakai distructering maka akan menghasilkan 2 array
     * array pertama adalah data dari table database
     * & array ke dua adalah metadata berupa buffer (bisa kita kelola jika ada fitur export data)
     *
     * #SUGGESTION & BEST PRACTIC
     *
     * distruct menjadi [rows, fields]
     */
    // const data = await koneksi.query(sql);

    const [rows, fields] = await koneksi.query(sql);

    return respond(res, 200, "Data user", rows);
  } catch (error) {
    return respond(res, 500, error.message);
  }
};

const getId = async (req, res) => {
  try {
    const { id } = req.params;
    //Ini untuk menghindari sql injection
    const [data] = await koneksi.query("SELECT * FROM user WHERE id_user=?", [
      id,
    ]);
    // return res.status(200).json({ data });
    return respond(res, 200, `Data user dengan id ${id}`, data);
  } catch (error) {
    return respond(res, 500, error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [data] = await koneksi.query("DELETE FROM user WHERE id_user=?", [
      id,
    ]);
    return respond(res, 200, `Data dengan id ${id} berhasil dihapus`);
  } catch (error) {
    respond(res, 400, error.message);
  }
};

const addUser = async (req, res) => {
  try {
    const { username, email, status } = req.body;

    const [result] = await koneksi.query(
      "INSERT INTO user (username, email, status) VALUES (?,?,?)",
      [username, email, status]
    );

    const [namaId] = await koneksi.query("SELECT * FROM user WHERE id_user=?", [
      result.insertId,
    ]);

    return respond(res, 201, "User berhasil ditambahkan", namaId);
  } catch (error) {
    return respond(res, 500, error.message);
  }
};

// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { username, email, status } = req.body;
//     const sql = 'UPDATE `users` SET `age` = 20 WHERE `name` = "Josh" LIMIT 1';

//     const [result, fields] = await koneksi.query(
//       "UPDATE user SET username=?, email=?, status=? WHERE id_user=?",
//       [username, email, status, id]
//     );

//     return respond(res, 200, "Data already updated");
//   } catch (err) {
//     return respond(res, 404, err.message);
//   }
// };

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateUserById(id, req.body);

    if (result.affectedRows === 0) {
      return respond(res, 404, "User tidak ditemukan");
    }

    return respond(res, 200, "User berhasil diupdate");
  } catch (error) {
    return respond(res, 500, error.message);
  }
};

export const getProdukHargaTinggi = async (req, res) => {
  try {
    const [rows] = await koneksi.query(
      "SELECT nama_produk, harga FROM produk WHERE harga > 170000"
    );

    res.json({
      status: "success",
      message: "Sortir Data Produk",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProdukByLatest = async (req, res) => {
  try {
    const [rows] = await koneksi.query(
      "SELECT * FROM produk ORDER BY created_at DESC"
    );

    res.json({
      status: "success",
      message: "Order Data Produk",
      data: rows
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export { getUsers, getId, deleteUser, addUser, updateUser };
