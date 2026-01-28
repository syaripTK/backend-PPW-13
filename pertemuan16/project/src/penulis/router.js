const express = require("express");
const {
  getWriter,
  searchWriter,
  addWriter,
  editWriter,
  deleteWriter,
} = require("./controller.js");
const { validBody, checkId } = require("./middleware.js");

const router = express.Router();

router.get("/", getWriter);
router.get("/search/:id", checkId, searchWriter);
router.post("/add", validBody, addWriter);
router.patch("/edit/:id", checkId, validBody, editWriter);
router.delete("/delete/:id", checkId, deleteWriter);

module.exports = router;
