"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "teknisi",
      [
        {
          id: 1,
          nama_teknisi: "Adam Zakiri",
          no_hp: "085789517092",
          email: "adamrz@gmail.com",
          spesialisasi: "programmer",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("teknisi", null, {});
  },
};
