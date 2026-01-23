"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Peserta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Peserta.belongsTo(models.Jurusan, {
        foreignKey: "jurusanId",
        as: "jurusan",
      });
    }
  }
  Peserta.init(
    {
      id_peserta: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nama_peserta: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
        allowNull: false,
      },
      jurusanId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Peserta",
      tableName: "peserta",
      freezeTableName: true,
      timestamps: true,
    },
  );
  return Peserta;
};
