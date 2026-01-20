import express from "express";
import { getAllEvent } from "../controller/index.js";
import { cekRole } from "../middleware/validate.js";

const router = express.Router();

router.get("/", cekRole, getAllEvent);


export default router;
