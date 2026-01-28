"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("laporan", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_pelapor: {
        type: Sequelize.STRING(50),
      },
      kelas: {
        type: Sequelize.ENUM("ppw", "ppm", "psj"),
        allowNull: false,
      },
      deskripsi: {
        type: Sequelize.TEXT,
      },
      foto_kerusakan: {
        type: Sequelize.STRING,
      },
      tgl_lapor: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      status: {
        type: Sequelize.ENUM("menunggu", "diproses", "selesai"),
        defaultValue: "menunggu",
      },
      teknisiId: {
        type: Sequelize.INTEGER,
        references: {
          model: "teknisi", //nama tabel
          key: "id", //primary key tabel tersebut
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("laporan");
  },
};
