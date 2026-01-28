"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Laporan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Laporan.belongsTo(models.Teknisi, {
        foreignKey: "teknisiId",
        as: "teknisi",
      });
    }
  }
  Laporan.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nama_pelapor: {
        type: DataTypes.STRING(50),
      },
      kelas: {
        type: DataTypes.ENUM("ppw", "ppm", "psj"),
        allowNull: false,
      },
      deskripsi: {
        type: DataTypes.TEXT,
      },
      foto_kerusakan: {
        type: DataTypes.STRING,
      },
      tgl_lapor: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      status: {
        type: DataTypes.ENUM("menunggu", "diproses", "selesai"),
        defaultValue: "menunggu",
      },
      teknisiId: {
        type: DataTypes.INTEGER,
        references: {
          model: "teknisi", //nama tabel
          key: "id", //primary key tabel tersebut
        },
      },
    },
    {
      sequelize,
      modelName: "Laporan",
      tableName: "laporan",
    },
  );
  return Laporan;
};
