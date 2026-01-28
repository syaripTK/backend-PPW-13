const express = require("express");
const sequelize = require("./src/config/koneksi.js");
const routerKategori = require("./src/kategori/router.js");
const routerPenulis = require("./src/penulis/router.js");
const routerBuku = require("./src/buku/router.js");

const app = express();
app.use(express.json());
const PORT = 3000;
app.use("/api/kategori", routerKategori);
app.use("/api/penulis", routerPenulis);
app.use("/api/buku", routerBuku);

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
