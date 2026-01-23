const express = require("express");
const controll = require("./controller.js");
const {
  checkId,
  validatePostJurusan,
  validateBody,
} = require("./middleware.js");

const router = express.Router();

router.get("/", controll.lookJurusan);
router.get("/search/:id", checkId, controll.searchJurusan);
router.patch("/update/:id", checkId, validateBody, controll.updateJurusan);
router.post("/add", validateBody, validatePostJurusan, controll.createJurusan);
router.delete("/remove/:id", checkId, controll.deleteJurusan);
router.get("/statistik", controll.statistikPeserta);

module.exports = router;
