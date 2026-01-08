import data from "../models/data.js";
import { respond } from "../responses/res.js";

/**
 * Ini nanti isinya adalah berbagai macam fungsi yang digunakan untuk mengelola logika proses.
 * Dalam kasus ini berarti kita akan membuat fungsi:
 * 1. Nampilin data
 * 2. Get Id
 * 3. Update Data
 * 4. Delete
 */

const getAllData = (req, res) => {
  return respond(res, 200, "Data santri from server", data);
};

const getDataById = (req, res) => {
  const { id } = req.params;
  const result = data.find((s) => s.id === parseInt(id));

  if (!result) {
    return respond(res, 404, "Data santri tidak ditemukan");
  }
  respond(res, 200, "Data santri from server", result);
};

const searchByName = (req, res) => {
  const cekNama = req.query.nama;

  if (!cekNama) {
    return respond(res, 200, "Data santri from server", data);
  } else {
    const result = data.filter((s) => s.nama === cekNama);
    if (result) {
      return respond(res, 200, "Data santri from server", result);
    } else {
      return respond(res, 404, "Data tidak ditemukan");
    }
  }
};

const deleteData = (req, res) => {
  const { id } = req.params;

  const index = data.findIndex((e) => e.id === parseInt(id));

  if (index === -1) {
    return respond(res, 404, "Id tidak ditemukan");
  }

  data.splice(index, 1);
  return respond(res, 200, "Data berhasil dihapus", data);
};

const tambahData = (req, res) => {
  const nama = req.body.nama;
  const nilai = req.body.nilai;
  const newData = { id: data.length + 1, nama, nilai };
  console.log(req.body);

  if (!nama || !nilai) {
    return respond(res, 400, "Data wajib diisi");
  }
  data.push(newData);
  respond(res, 201, "Data berhasil ditambahkan", data);
};

const updateData = (req, res) => {
  const { id } = req.params;
  const { nama, nilai } = req.body;

  if (!nama || !nilai) {
    return respond(res, 400, "Data wajib diisi");
  }

  const index = data.findIndex((e) => e.id === Number(id));

  if (index === -1) {
    return respond(res, 404, "Id tidak ditemukan");
  }
  data[index] = {
    id: parseInt(id),
    nama,
    nilai,
  };

  respond(res, 200, "Data berhasil diupdate", data);
};

const showUpStatistic = (req, res) => {
  const total = data.length;
  const totalNilai = data.reduce((acc, curr) => acc + curr.nilai, 0);
  const average = totalNilai / total;

  const highestValue = Math.max(...data.map((s) => s.nilai));
  const worstValue = Math.min(...data.map((s) => s.nilai));

  respond(res, 200, "Statistic santri", {
    total,
    ratarata: Math.round(average),
    nilaiTertinggi: highestValue,
    nilaiTerendah: worstValue,
  });
};

const santriLulus = (req, res) => {
  const lulus = data.filter((s) => s.nilai >= 80);
  if (lulus.length === 0) {
    return respond(res, 404, "Tidak ada santri yang lulus");
  }
  respond(res, 200, "Data santri yang lulus", lulus);
};

const santriTidakLulus = (req, res) => {
  const tidakLulus = data.filter((s) => s.nilai < 80);

  if (tidakLulus.length === 0) {
    return respond(res, 404, "Semua santri lulus");
  }

  respond(res, 200, "Data santri yang tidak lulus", tidakLulus);
};

const deleteAllData = (req, res) => {
  const { confirm } = req.query;
  if (confirm != "true") {
    return respond(
      res,
      400,
      "Tambahkan confirm=true untuk menghapus seluruh data"
    );
  }
  data.length = 0;
  respond(res, 204, "Semua data santri berhasil dihapus", []);
};
export {
  getAllData,
  getDataById,
  searchByName,
  deleteData,
  tambahData,
  updateData,
  showUpStatistic,
  santriLulus,
  santriTidakLulus,
  deleteAllData,
};
