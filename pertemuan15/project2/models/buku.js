"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Buku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Di sini kumpulan sintaks untuk relasi table buku
    }
  }
  Buku.init(
    {
      id_buku: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nama_buku: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      penulis: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kategori: {
        type: DataTypes.ENUM("fiksi", "spiritual"),
        defaultValue: "fiksi",
        allowNull: false,
      },
      tahun_terbit: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Buku",
    },
  );
  return Buku;
};
