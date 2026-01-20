import express from "express";
// import { getData } from "./controllers/buahController.js";
import routerBuah from "./routes/buahRoute.js";

const app = express();

/**
 * Untuk membuat grouping route
 * bisa menggunakan middleware app.use()
 */

//Ini aplication level middleware
app.use((req, res, next) => {
  console.info("Ini dari middleware yang pertama", req.url, new Date());
  next();
});

app.use("/api/v1/buah", routerBuah);

// app.get("/buah", getData);
app.listen(5000, () => {
  console.info("Server berjalan di port 5000");
});
