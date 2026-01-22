const { Sequelize } = require("sequelize");

/**
 * Ini adalah file config ke database
 * Susunan koneksi nya adalah nama database, username, dan password
 */

const sequelize = new Sequelize("orm_sequelize", "root", "bismillah", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
