"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "peserta",
      [
        {
          nama_peserta: "Budiyono",
          email: "budi@gmail.com",
          status: "inactive",
          jurusanId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_peserta: "Hariyono",
          email: "harry@gmail.com",
          status: "active",
          jurusanId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_peserta: "Adam Malik",
          email: "adam@gmail.com",
          status: "inactive",
          jurusanId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("peserta", null, {});
  },
};
