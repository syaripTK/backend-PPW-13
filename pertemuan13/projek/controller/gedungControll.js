import { responSukses, responError } from "../payload/payload.js";
import {
  getAll,
  filterByCollumn,
  filterByHarga,
  tambahGedung,
  updateGedung,
  deleteGedung,
  getGedungId,
} from "../models/gedung.model.js";
import {
  bookingGedung,
  selectById,
  joinGedung,
  getGedungAvailable,
  getDay,
} from "../models/sewa.model.js";

const gedungAll = async (req, res) => {
  try {
    const hasil = await getAll();
    return responSukses(res, 200, "Success", "Data Gedung", hasil);
  } catch (error) {
    return responError(res, 500, "Error", error.message);
  }
};

const gedungByCollumn = async (req, res) => {
  try {
    const body = req.query.body;
    const result = await filterByCollumn(body);
    return responSukses(res, 200, "Success", "Data Gedung", result);
  } catch (error) {
    return responError(res, 500, "Error", error.message);
  }
};

const cariByHarga = async (req, res) => {
  try {
    const { min, max } = req.query;
    const result = await filterByHarga(min, max);
    return responSukses(res, 200, "success", "Data gedung", result);
  } catch (error) {
    return responError(res, 400, "error", error.message);
  }
};

const addGedung = async (req, res) => {
  try {
    const { nama_pj, nama_gedung, lokasi, kategori, harga } = req.body;
    const result = await tambahGedung(
      nama_pj,
      nama_gedung,
      lokasi,
      kategori,
      harga,
    );

    const data = await getGedungId(result.insertId);
    responSukses(res, 201, "success", "Data gedung berhasil ditambahkan", data);
  } catch (error) {
    return responError(res, 400, "error", error.message);
  }
};

const hapusGedung = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteGedung(id);
    return responSukses(res, 200, "success", "Data berhasil dihapus");
  } catch (error) {
    return responError(res, 400, "error", error.message);
  }
};

const updateDataGedung = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_pj, nama_gedung, lokasi, kategori, harga } = req.body;

    const data = await updateGedung(
      id,
      nama_pj,
      nama_gedung,
      lokasi,
      kategori,
      harga,
    );
    const fufufafa = await getGedungId(id);
    return responSukses(
      res,
      200,
      "success",
      "Data gedung berhasil diupdate",
      fufufafa,
    );
  } catch (error) {
    return responError(res, 400, "error", error.message);
  }
};

const bookingGdg = async (req, res) => {
  try {
    const data = req.body;
    const result = await bookingGedung(data);
    const datas = await selectById(result.insertId);
    const building = await getGedungId(data.gedung_id);
    const dayCheckin = new Date(datas[0].checkin);
    const dayCheckout = new Date(datas[0].chekout);
    const diffTime = dayCheckout - dayCheckin;
    const durasiHari = diffTime / (1000 * 60 * 60 * 24);
    const totalHarga = durasiHari * building[0].harga;

    return responSukses(res, 201, "success", "Gedung berhasil dibooking", {
      booking_id: datas[0].id,
      nama_penyewa: datas[0].nama_penyewa,
      gedung: {
        id: building[0].id,
        nama_gedung: building[0].nama_gedung,
        kategori: building[0].kategori,
        harga: building[0].harga,
      },
      tanggal: {
        checkin: datas[0].checkin,
        checkout: datas[0].chekout,
        durasi_hari: durasiHari,
      },
      total_harga: totalHarga,
    });
  } catch (error) {
    return responError(res, 500, "Error", error.message);
  }
};

const getGedungTersedia = async (req, res) => {
  try {
    const { min, max } = req.query;
    const result = await getGedungAvailable(min, max);
    return responSukses(
      res,
      200,
      "success",
      "Data gedung yang tersedia",
      result,
    );
  } catch (error) {
    return responError(res, 500, "Error", error.message);
  }
};

const gedungDisewa = async (req, res) => {
  try {
    const datas = await joinGedung();
    return responSukses(res, 200, "success", "Data penyewaan gedung", datas);
  } catch (error) {
    return responError(res, 400, "Error", error.message);
  }
};

export {
  gedungAll,
  gedungByCollumn,
  cariByHarga,
  addGedung,
  hapusGedung,
  updateDataGedung,
  bookingGdg,
  getGedungTersedia,
  gedungDisewa
};
