"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Penulis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Penulis.hasMany(models.Buku, {
        foreignKey: "penulisId",
        as: "penulis",
      });
    }
  }
  Penulis.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nama_penulis: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      alamat: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Penulis",
      tableName: "penulis",
      freezeTableName: true,
      // timestamps: true,
    },
  );
  return Penulis;
};
