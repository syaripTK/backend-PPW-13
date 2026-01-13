import express from "express";
// import { getData } from "./controllers/buahController.js";
import routerBuah from "./routes/buahRoute.js";

const app = express();

/**
 * Untuk membuat grouping route
 * bisa menggunakan middleware app.use()
 */

app.use("/api/v1/buah", routerBuah);


// app.get("/buah", getData);
app.listen(5000, () => {
  console.info("Server berjalan di port 5000");
});
