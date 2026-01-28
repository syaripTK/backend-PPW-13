"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("peminjaman", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      alatId: {
        type: Sequelize.INTEGER,
        references: {
          model: "alat",
          key: "id",
        },
      },
      tgl_pinjam: {
        type: Sequelize.DATE,
      },
      tgl_kembali: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM("dipinjam", "dikembalikan", "hilang"),
      },
      keperluan: {
        type: Sequelize.TEXT,
      },
      kondisi_terbaru: {
        type: Sequelize.ENUM("bagus", "rusakringan", "rusakberat"),
      },
      foto_pinjam: {
        type: Sequelize.STRING,
      },
      foto_kembali: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("peminjaman");
  },
};
