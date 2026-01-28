const express = require("express");
const sequelize = require("./infrastructure/config/koneksi.js");
const routerTeknisi = require("./interface/http/teknisi/router.js");
const routerLaporan = require("./interface/http/laporan/router.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/upload", express.static("src/upload"));

const PORT = 3000;
app.use("/api/teknisi", routerTeknisi);
app.use("/api/laporan", routerLaporan);

// app.get("/", async (req, res) => {
//   try {
//     await sequelize.authenticate();
//     return res.json({
//       message: "Database berhasil terkoneksi",
//     });
//   } catch (error) {
//     return res.json({ message: error.message });
//   }
// });

app.listen(PORT, () => {
  console.info(`Server berjalan di port ${PORT}`);
});
