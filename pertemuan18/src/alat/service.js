const { where } = require("sequelize");
const { Alat } = require("../db/models/index.js");

const tampilAlat = async () => {
  return await Alat.findAll();
};

const tambahAlat = async (body) => {
  return await Alat.create(body);
};

const cariId = async (id) => {
  return await Alat.findByPk(id);
};

const ubahAlat = async (id, body) => {
  const alat = await Alat.findByPk(id);
  await alat.update(body);
  return alat;
};

const hapusAlat = async (id) => {
  return await Alat.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  tambahAlat,
  cariId,
  ubahAlat,
  hapusAlat,
  tampilAlat,
};
