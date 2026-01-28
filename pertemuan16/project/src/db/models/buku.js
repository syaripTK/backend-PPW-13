"use strict";
const { Model } = require("sequelize");
const kategori = require("./kategori");
module.exports = (sequelize, DataTypes) => {
  class Buku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Buku.belongsTo(models.Kategori, {
        foreignKey: "kategoriId",
        as: "kategori",
      });
      Buku.belongsTo(models.Penulis, {
        foreignKey: "penulisId",
        as: "penulis",
      });
    }
  }
  Buku.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      judul: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      jml_halaman: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ringkasan: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      harga: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kategoriId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "kategori", //nama tabel
          key: "id", //primary key tabel tersebut
        },
      },
      penulisId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "penulis", //nama tabel
          key: "id", //primary key tabel tersebut
        },
      },
    },
    {
      sequelize,
      modelName: "Buku",
      tableName: "buku",
      freezeTableName: true,
      // timestamps: true,
    },
  );
  return Buku;
};
