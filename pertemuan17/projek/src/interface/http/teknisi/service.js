const { Teknisi } = require("../../db/models/index.js");

const get = async () => {
  return await Teknisi.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
};

const create = async (body) => {
  return await Teknisi.create(body);
};

const getId = async (id) => {
  return await Teknisi.findByPk(id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
};

const remove = async (id) => {
  return await Teknisi.destroy({
    where: {
      id: id,
    },
  });
};

const edit = async (id, body) => {
  const data = await Teknisi.findByPk(id);
  await data.update(body);
  return data;
};

module.exports = {
  get,
  create,
  getId,
  edit,
  remove,
};
