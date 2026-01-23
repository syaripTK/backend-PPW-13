"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "jurusan",
      [
        {
          id_jurusan: 1,
          nama_jurusan: "PPW",
        },
        {
          id_jurusan: 2,
          nama_jurusan: "PPM",
        },
        {
          id_jurusan: 3,
          nama_jurusan: "PSSI",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("jurusan", null, {});
  },
};
