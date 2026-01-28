'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Alat.hasOne(models.Peminjaman, {
        foreignKey: "alatId",
        as: "peminjaman"
      })
    }
  }
  Alat.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      kode_alat: {
        type: DataTypes.STRING(10),
      },
      nama_alat: {
        type: DataTypes.STRING(50),
      },
      kategori: {
        type: DataTypes.ENUM("hardware", "olahraga", "kebersihan"),
      },
      kondisi: {
        type: DataTypes.ENUM("bagus", "rusakringan", "rusakberat"),
      },
      foto_barang: {
        type: DataTypes.STRING,
      },
      lokasi: {
        type: DataTypes.STRING,
      },
      stok: {
        type: DataTypes.INTEGER,
      },
     
  }, {
    sequelize,
    modelName: 'Alat',
    tableName: 'alat'
  });
  return Alat;
};