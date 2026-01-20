import express from "express";
import { getAllPeserta } from "../controller/index.js";
import { cekRole } from "../middleware/validate.js";

const router = express.Router();

router.get("/", cekRole, getAllPeserta);

export default router;
