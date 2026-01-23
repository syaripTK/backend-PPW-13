const express = require("express");
const controll = require("./controller.js");
const { checkId, validateBodyPeserta, invalid } = require("./middleware.js");

const route = express.Router();

route.get("/", controll.getAllPeserta);
route.get("/search/:id", checkId, controll.getPesertaById);
route.post("/add", validateBodyPeserta, controll.addPeserta);
route.delete("/delete/:id", checkId, controll.removePeserta);
route.patch("/edit/:id", checkId, validateBodyPeserta, controll.updatePeserta);
route.get("/byjurusan/:id", invalid, controll.getPesertaByJurusan);

module.exports = route;
