import express from "express";
import {
  getAllPeserta,
  getAllEvent,
  createNewEvent,
  updateAcara,
  deleteAcara,
  addPeserta,
  detailAcaraById,
} from "./controller/index.js";

const app = express();
app.use(express.json());

app.get("/peserta", getAllPeserta);

app.get("/acara", getAllEvent);

app.post("/acara/create", createNewEvent);

app.patch("/acara/update/:id", updateAcara);

app.delete("/acara/delete/:id", deleteAcara);

app.post("/acara/join/:id", addPeserta);

app.get("/acara/detail/:id", detailAcaraById);
app.listen(3001, () => {
  console.info("Server was running");
});
