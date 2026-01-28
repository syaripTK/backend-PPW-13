/**
 * Di sini tempat kita menulis semua query
 */

const { Kategori } = require("../db/models/index.js");

const tampilKategori = async () => {
  return await Kategori.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
};

const tambahKategori = async (body) => {
  return await Kategori.create(body);
};

const cariKategori = async (id) => {
  return await Kategori.findByPk(id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
};

const ubahKategori = async (id, body) => {
  const data = await Kategori.findByPk(id);
  await data.update(body);
  return data;
};

const hapusKategori = async (id) => {
  return await Kategori.destroy({
    where: {
      id: id,
    },
  });
};

const duplikatKategori = async (name) => {
  return await Kategori.findOne({
    where: {
      nama_kategori: name,
    },
  });
};

module.exports = {
  tampilKategori,
  tambahKategori,
  cariKategori,
  ubahKategori,
  hapusKategori,
  duplikatKategori,
};
