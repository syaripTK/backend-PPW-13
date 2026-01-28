const { Peminjaman, Alat } = require("../db/models/index.js");

const getAll = async () => {
  return await Peminjaman.findAll({
    include: [
      {
        model: Alat,
        as: "alat",
        attributes: ["nama_alat", "stok"],
      },
    ],
  });
};

const add = async (body) => {
  return await Peminjaman.create(body);
};

const findId = async (id) => {
  return await Peminjaman.findByPk(id, {
    include: [
      {
        model: Alat,
        as: "alat",
        attributes: ["nama_alat", "stok"],
      },
    ],
  });
};

const edit = async (id, body) => {
  const pinjam = await findId(id);
  await pinjam.update(body);
  return pinjam;
};

const drag = async (id) => {
  return await Peminjaman.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  getAll,
  add,
  findId,
  edit,
  drag,
};
