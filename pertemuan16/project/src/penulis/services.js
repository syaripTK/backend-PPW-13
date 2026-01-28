const { Penulis } = require("../db/models/index.js");

const tampilPenulis = async () => {
  return await Penulis.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
};

const cariPenulis = async (id) => {
  return await Penulis.findByPk(id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
};

const tambahPenulis = async (body) => {
  return await Penulis.create(body);
};

const hapusPenulis = async (id) => {
  return await Penulis.destroy({
    where: {
      id: id,
    },
  });
};

const ubahPenulis = async (id, body) => {
  return await Penulis.update(body, {
    where: { id: id },
  });
};

const duplicateWriterName = async (name) => {
  return await Penulis.findOne({
    where: {
      nama_penulis: name,
    },
  });
};

module.exports = {
  tampilPenulis,
  cariPenulis,
  tambahPenulis,
  hapusPenulis,
  ubahPenulis,
  duplicateWriterName,
};
