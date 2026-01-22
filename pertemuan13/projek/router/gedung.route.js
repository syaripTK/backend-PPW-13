import express from "express";
import {
  gedungAll,
  gedungByCollumn,
  cariByHarga,
  addGedung,
  hapusGedung,
  updateDataGedung,
  bookingGdg,
  getGedungTersedia,
  gedungDisewa,
} from "../controller/gedungControll.js";
import {
  checkDuplicateName,
  checkId,
  checkInput,
  validateBooking,
  validateCollumn,
} from "../middleware/gedung.middleware.js";

const router = express.Router();

router.get("/", gedungAll);
router.get("/cari", validateCollumn, gedungByCollumn);
router.get("/byHarga", cariByHarga);
router.post("/add", checkInput, addGedung);
router.delete("/delete/:id", checkId, hapusGedung);
router.patch(
  "/update/:id",
  checkId,
  checkInput,
  checkDuplicateName,
  updateDataGedung,
);
router.post("/booking", validateBooking, bookingGdg);
router.get("/available", getGedungTersedia);
router.get("/sewa", gedungDisewa);

export default router;
