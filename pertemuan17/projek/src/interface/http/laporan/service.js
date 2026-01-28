const { Laporan, Teknisi } = require("../../db/models/index.js");
const fs = require("fs")
const path = require("path")

const get = async () => {
  return await Laporan.findAll({
    include: [
      {
        model: Teknisi,
        as: "teknisi",
        attributes: ["nama_teknisi", "spesialisasi"],
      },
    ],
  });
};

const create = async (body) => {
  return await Laporan.create(body);
};

const getId = async (id) => {
  return await Laporan.findByPk(id, {
    attributes: {
      exclude: ["tgl_lapor"],
    },
  });
};

const remove = async (id) => {
  return await Laporan.destroy({
    where: {
      id: id,
    },
  });
};

const edit = async (id, data) => {
  const laporan = await Laporan.findByPk(id);
  if (!laporan) throw new Error("Laporan tidak ditemukan");
  if (data.foto_kerusakan && laporan.foto_kerusakan) {
    const oldPath = path.join(
      process.cwd(),
      "src",
      "upload",
      laporan.foto_kerusakan,
    );
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  }
  await laporan.update(data);
  return laporan;
};

const search = async (id) => {
  return await Laporan.findByPk(id, {
    attributes: {
      exclude: [
        "foto_kerusakan",
        "status",
        "deskripsi",
        "kelas",
        "createdAt",
        "updatedAt",
      ],
    },
    include: [
      {
        model: Teknisi,
        as: "teknisi",
        attributes: ["nama_teknisi", "spesialisasi"],
      },
    ],
  });
};

module.exports = {
  get,
  create,
  getId,
  edit,
  remove,
  search
};
