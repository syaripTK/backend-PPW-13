import express from "express";
import {
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
} from "../controller/tracerController.js";
import {
  checkId,
  validateInsertBody,
  validateVarchar,
  duplicateName,
  duplicateUpdate,
  validateSearch,
  validateSort,
} from "../middleware/tracerMiddleware.js";

const router = express.Router();

router.get("/", getTracers);
router.get("/cari/:id", checkId, getId);
router.post(
  "/tambah",
  validateInsertBody,
  validateVarchar,
  duplicateName,
  addTracer
);
router.delete("/hapus/:id", checkId, deleteData);
router.patch(
  "/ubah/:id",
  validateInsertBody,
  validateVarchar,
  duplicateUpdate,
  updateTracer
);
router.get("/search", validateSearch, searchTracer);
router.get("/status", validateSearch, searchStatus);
router.get("/sort", validateSort, sortTracer);
router.get("/statistik", getStatistic);
router.get("/dashboard", dashboardTracer);
router.get("/statistik/presentase", percentaceTracer);

export default router;
