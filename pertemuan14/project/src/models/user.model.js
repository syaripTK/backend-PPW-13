/**Ini adalah praktik bagaimana cara membuat table menggunakan ORM dengan konsep code first.
 * Artinya, bikin table tidak bikin php my admin
 * tapi lewat sintaks javascript
 *
 * Rekomendasi tools:
 * -Gitbook
 * -Notion
 * -Trello
 */

//Sekarang praktik bikin table di ORM sequelize
const { DataTypes } = require("sequelize");
//Masukin file config databasenya
const sequelize = require("../../koneksi.js");

//Masukkan sequelizenya untuk mendefine table yang mau kita buat
const User = sequelize.define(
  "data", //data ini nama model bukan untuk nama table
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false, //Allownull itu defaultnya adalah true
    },
    lastName: {
      type: DataTypes.STRING,
    },
    tambahan: {
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "dosen" }, // Tambahkan tableName di akhir untuk mensfesikijasi agar tidak autogenerate dari define(model)
);

/**
 * sync() ini akan membuat table baru jika belum ada
 *
 * Jika mau menambahkan collumn / field, maka di sync nya ditambahin {alter:true}
 *
 * jika kita mau ngehapus tabel yang udah pernah dbuat , lalu dibikin ulang fieldnya maka tambahkan {force:true}
 */
sequelize.sync({ alter: true });

module.exports = User;
