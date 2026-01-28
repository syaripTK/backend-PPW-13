"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Peminjaman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Peminjaman.belongsTo(models.Alat, {
        foreignKey: "alatId",
        as: "alat",
      });
    }
  }
  Peminjaman.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      alatId: {
        type: DataTypes.INTEGER,
      },
      tgl_pinjam: {
        type: DataTypes.DATE,
      },
      tgl_kembali: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM("dipinjam", "dikembalikan", "hilang"),
      },
      keperluan: {
        type: DataTypes.TEXT,
      },
      kondisi_terbaru: {
        type: DataTypes.ENUM("bagus", "rusakringan", "rusakberat"),
      },
      foto_pinjam: {
        type: DataTypes.STRING,
      },
      foto_kembali: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Peminjaman",
      tableName: "peminjaman",
    },
  );
  return Peminjaman;
};
