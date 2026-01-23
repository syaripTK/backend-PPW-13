"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Jurusan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Jurusan.hasMany(models.Peserta, {
        foreignKey: "jurusanId",
        as: "peserta",
      });
    }
  }
  Jurusan.init(
    {
      id_jurusan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nama_jurusan: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Jurusan",
      tableName: "jurusan",
      freezeTableName: true,
      timestamps: false,
    },
  );
  return Jurusan;
};
