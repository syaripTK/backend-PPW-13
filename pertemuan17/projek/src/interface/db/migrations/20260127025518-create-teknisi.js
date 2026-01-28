"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("teknisi", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_teknisi: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      no_hp: {
        type: Sequelize.STRING(15),
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
      },
      spesialisasi: {
        type: Sequelize.ENUM("umum", "jaringan", "programmer"),
        defaultValue: "umum",
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
    await queryInterface.dropTable("teknisi");
  },
};
