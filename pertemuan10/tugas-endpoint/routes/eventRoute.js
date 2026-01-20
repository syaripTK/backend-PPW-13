import express from "express";
import {
  getAllEvent,
  createNewEvent,
  updateAcara,
  deleteAcara,
  addPeserta,
  detailAcaraById,
} from "../controller/index.js";
import {
  cekRole,
  validateNewEvent,
  validateUpdateEvent,
  validateDeleteEvent,
  temukanIdAcara,
  temukanIdPeserta,
  kuotaQuantity,
  pesertaTerdaftar,
} from "../middleware/validate.middleware.js";

const router = express.Router();

router.get("/", cekRole, getAllEvent);
router.post("/create", validateNewEvent, createNewEvent);
router.patch("/update/:id", validateUpdateEvent, updateAcara);
router.delete("/delete/:id", validateDeleteEvent, deleteAcara);
router.post(
  "/join/:id",
  temukanIdAcara,
  temukanIdPeserta,
  kuotaQuantity,
  pesertaTerdaftar,
  addPeserta
);
router.get("/detail/:id", temukanIdAcara, detailAcaraById);

export default router;
