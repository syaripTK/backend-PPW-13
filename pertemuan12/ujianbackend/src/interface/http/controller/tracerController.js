import { responError, responSukses } from "../../../shared/helpers/payload.js";
import {
  getTracerId,
  getAllTracer,
  insertTracer,
  deleteTracer,
  changeData,
  searchData,
  statusTracer,
  sortingData,
  lossCount,
  foundCount,
} from "../../../infrastructure/database/models/tracerModel.js";
import { koneksi } from "../../../infrastructure/database/db.js";
import getTime from "../../../shared/helpers/getTime.js";

const getTracers = async (req, res) => {
  try {
    const result = await getAllTracer();
    return responSukses(res, 200, "success", "Data Tracer", result);
  } catch (error) {
    return responError(res, 400, error.message);
  }
};

const getId = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getTracerId(id);
    return responSukses(res, 200, "success", "Data Tracer Barang", result);
  } catch (error) {
    return responError(res, 500, error.message);
  }
};

const addTracer = async (req, res) => {
  try {
    const { nama_barang, lokasi, deskripsi, status, kontak_pelapor } = req.body;
    const result = await insertTracer([
      nama_barang,
      lokasi,
      deskripsi,
      status,
      kontak_pelapor,
    ]);

    console.log(result);

    return responSukses(res, 200, "success", "Data berhasil ditambahkan", [
      {
        id: result.insertId,
        nama_barang,
        lokasi,
        deskripsi,
        status,
        tgl_lapor: getTime(),
        kontak_pelapor,
      },
    ]);
  } catch (error) {
    return responError(res, 400, error.message);
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteTracer(id);
    console.log(result);

    return responSukses(res, 200, "success", "Data berhasil dihapus");
  } catch (error) {
    return responError(res, 400, error.message);
  }
};

const updateTracer = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_barang, lokasi, deskripsi, status, kontak_pelapor } = req.body;

    const result = await changeData([
      nama_barang,
      lokasi,
      deskripsi,
      status,
      kontak_pelapor,
      id,
    ]);

    return responSukses(res, 200, "success", "Data berhasil diubah", [
      {
        id: id,
        nama_barang,
        lokasi,
        deskripsi,
        status,
        tgl_lapor: getTime(),
        kontak_pelapor,
      },
    ]);
  } catch (error) {
    return responError(res, 400, error.message);
  }
};

const searchTracer = async (req, res) => {
  try {
    const { key } = req.query;
    const data = await searchData(key);

    if (data.length === 0)
      return responError(res, 404, "Maaf, data tracer tidak ditemukan");

    return responSukses(res, 200, "success", "Hasil pencarian tracer", data);
  } catch (error) {
    responError(res, 400, error.message);
  }
};

const searchStatus = async (req, res) => {
  try {
    const { key } = req.query;
    const data = await statusTracer(key);

    if (data.length === 0)
      return responError(
        res,
        404,
        "error",
        "Maaf, data status tracer tidak ditemukan"
      );

    return responSukses(
      res,
      200,
      "success",
      "Hasil pencarian status tracer",
      data
    );
  } catch (error) {
    responError(res, 400, error.message);
  }
};

const sortTracer = async (req, res) => {
  try {
    const { by, order } = req.query;
    const data = await sortingData(by, order);
    return responSukses(res, 200, "succcess", "Data Tracer", data);
  } catch (error) {
    console.error(error.message);
  }
};

const getStatistic = async (req, res) => {
  try {
    const result = await getAllTracer();
    const hasil = await lossCount();
    const husul = await foundCount();

    const hilang = hasil[0]["COUNT(status)"];
    const ditemukan = husul[0]["COUNT(status)"];

    return responSukses(res, 200, "success", "Statistic data tracer", {
      total_laporan: result.length,
      hilang,
      ditemukan,
    });
  } catch (error) {
    console.error(error.message);
  }
};

const dashboardTracer = async (req, res) => {
  try {
    const result = await getAllTracer();
    const hasil = await lossCount();
    const husul = await foundCount();

    const hilang = hasil[0]["COUNT(status)"];
    const ditemukan = husul[0]["COUNT(status)"];
    responSukses(res, 200, "success", "Dashboard Tracer App", [
      {
        data_barang: result,
        statistik: [
          {
            total_laporan: result.length,
            hilang,
            ditemukan,
          },
        ],
      },
    ]);
  } catch (error) {
    console.error(error.message);
  }
};

const percentaceTracer = async (req, res) => {
  try {
    const result = await getAllTracer();
    const hasil = await lossCount();
    const husul = await foundCount();

    const hilang = hasil[0]["COUNT(status)"];
    const ditemukan = husul[0]["COUNT(status)"];
    const lossAverage = (hilang / result.length) * 100;
    const foundedAverage = (ditemukan / result.length) * 100;

    responSukses(res, 200, "success", "Dashboard Tracer App", {
      total_laporan: result.length,
      hilang,
      ditemukan,
      persentase: {
        hilang: `${lossAverage.toFixed(2)}%`,
        ditemukan: `${foundedAverage.toFixed(2)}%`,
      },
    });
  } catch (error) {}
};
export {
  getId,
  getTracers,
  addTracer,
  deleteData,
  updateTracer,
  searchTracer,
  searchStatus,
  sortTracer,
  getStatistic,
  dashboardTracer,
  percentaceTracer,
};
