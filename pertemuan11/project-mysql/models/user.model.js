import { koneksi } from "../config/db.js";

// export const updateUserById = async (id, data) => {
//   const { username, email, status } = data;
//   const [result] = await koneksi.query(
//     "UPDATE user SET username=?, email=?, status=? WHERE id_user=?",
//     [username, email, status, id]
//   );

//   return result;
// };

export const updateUserById = async (id, data) => {
  const fields = [];
  const values = [];

  if (data.username) {
    fields.push("username=?");
    values.push(data.username);
  }

  if (data.email) {
    fields.push("email=?");
    values.push(data.email);
  }

  if (data.status) {
    fields.push("status=?");
    values.push(data.status);
  }

  if (fields.length === 0) return null;

  values.push(id);

  const sql = `UPDATE user SET ${fields.join(", ")} WHERE id_user=?`;

  const [result] = await koneksi.query(sql, values);

  return result;
};
