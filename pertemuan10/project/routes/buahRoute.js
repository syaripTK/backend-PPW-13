import express from "express";
import { getData, apalah } from "../controllers/buahController.js";
//Import ini wajib jika kita ingin membuat project dengan konsep express routes

const router = express.Router();

router.get("/", getData);
router.get("/apalah", apalah);

export default router;
