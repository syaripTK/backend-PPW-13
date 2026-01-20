import express from "express";
import { cekKoneksi } from "./src/infrastructure/database/db.js";
import routeTracer from "./src/interface/http/routes/tracerRoutes.js";
const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/api/tracer", routeTracer)

app.listen(PORT, () => {
  console.log("server berjalan...");
});
