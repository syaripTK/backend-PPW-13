import express from "express";
import {
  getUsers,
  getId,
  deleteUser,
  addUser,
  updateUser,
} from "../controllers/user.controller.js";
import {
  cekId,
  cekInput,
  checkBeforeDelete,
  checkBeforeUpdate,
  validateUpdateUser,
} from "../middlewares/users.middleware.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/cari/:id", cekId, getId);
router.delete("/delete/:id", checkBeforeDelete, deleteUser);
router.post("/add", cekInput, addUser);
router.patch("/update/:id", checkBeforeUpdate, validateUpdateUser, updateUser);

export default router;
