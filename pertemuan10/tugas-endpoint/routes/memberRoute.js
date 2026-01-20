import express from "express";
import { getAllPeserta } from "../controller/index.js";
import { cekRole } from "../middleware/validate.middleware.js";

const router = express.Router();

router.get("/", cekRole, getAllPeserta);

export default router;
