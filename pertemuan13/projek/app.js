import express from "express";
import routeGedung from "./router/gedung.route.js";

const app = express();
const PORT = 8080;
app.use(express.json());

app.use("/api/gedung", routeGedung);

app.listen(PORT, () => {
  console.log(`Server was running in port ${PORT}`);
});
