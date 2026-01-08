import express from "express";
import {
  getAllData,
  getDataById,
  searchByName,
  deleteData,
  tambahData,
  updateData,
  showUpStatistic,
  santriLulus,
  santriTidakLulus,
  deleteAllData,
} from "./controllers/santriController.js";

const app = express();
app.use(express.json());

app.get("/santri", getAllData);

app.get("/santri/search", searchByName);

app.get("/santri/statistik/", showUpStatistic);

app.get("/santri/lulus/", santriLulus);

app.get("/santri/tidaklulus", santriTidakLulus);

app.get("/santri/:id", getDataById);

app.delete("/santri/:id", deleteData);

app.delete("/santri", deleteAllData);

app.put("/santri/:id", updateData);

app.post("/santri", tambahData);
const PORT = 3000;
app.listen(PORT, () => {
  console.info(`Server dijalankan di port ${PORT}`);
});
