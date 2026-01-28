"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("alat", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      kode_alat: {
        type: Sequelize.STRING(10),
      },
      nama_alat: {
        type: Sequelize.STRING(50),
      },
      kategori: {
        type: Sequelize.ENUM("hardware", "olahraga", "kebersihan"),
      },
      kondisi: {
        type: Sequelize.ENUM("bagus", "rusakringan", "rusakberat"),
      },
      foto_barang: {
        type: Sequelize.STRING,
      },
      lokasi: {
        type: Sequelize.STRING,
      },
      stok: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("alat");
  },
};
