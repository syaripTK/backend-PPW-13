const express = require("express");
const {
  tampilTeknisi,
  cariTeknisi,
  tambahTeknisi,
  singkirkanTeknisi,
  gantiTeknisi,
} = require("./controller.js");

const router = express.Router();

router.get("/", tampilTeknisi);
router.get("/search/:id", cariTeknisi);
router.post("/create", tambahTeknisi);
router.patch("/edit/:id", gantiTeknisi);
router.delete("/drop/:id", singkirkanTeknisi);

module.exports = router;
