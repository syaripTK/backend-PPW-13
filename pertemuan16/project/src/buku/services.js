const { Buku } = require("../db/models/index.js");
const { Op } = require("@sequelize/core");

const tampilBuku = async () => {
  return await Buku.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
};
const cariBuku = async (id) => {
  return await Buku.findByPk(id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
};

const tambahBuku = async (body) => {
  return await Buku.create(body);
};

const hapusBuku = async (id) => {
  return await Buku.destroy({
    where: {
      id: id,
    },
  });
};

const ubahBuku = async (id, body) => {
  const data = await Buku.findByPk(id);
  await data.update(body);
  return data;
};

const hargaBuku = async (key1, key2) => {
  return await Buku.findAll(
    {
      where: {
        harga: {
          [Op.gt]: key1,
          [Op.lte]: key2,
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },
  );
};

const duplicateBookName = async (name) => {
  return await Buku.findOne({
    where: {
      judul: name,
    },
  });
};

module.exports = {
  tampilBuku,
  cariBuku,
  tambahBuku,
  hapusBuku,
  ubahBuku,
  hargaBuku,
  duplicateBookName,
};
