"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teknisi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Teknisi.hasMany(models.Laporan, {
        foreignKey: "teknisiId",
        as: "teknisi",
      });
    }
  }
  Teknisi.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nama_teknisi: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      no_hp: {
        type: DataTypes.STRING(15),
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
      },
      spesialisasi: {
        type: DataTypes.ENUM("umum", "jaringan", "programmer"),
        defaultValue: "umum",
      },
    },
    {
      sequelize,
      modelName: "Teknisi",
      tableName: "teknisi",
    },
  );
  return Teknisi;
};
