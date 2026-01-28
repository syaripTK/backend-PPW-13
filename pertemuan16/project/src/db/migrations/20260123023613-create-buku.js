"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("buku", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      judul: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      jml_halaman: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ringkasan: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      harga: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      kategoriId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "kategori", //nama tabel
          key: "id", //primary key tabel tersebut
        },
      },
      penulisId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "penulis", //nama tabel
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
    await queryInterface.dropTable("buku");
  },
};
