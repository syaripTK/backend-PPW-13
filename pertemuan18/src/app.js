process.env.TZ = "Asia/Jakarta";
const express = require("express");
// const sequelize = require("./config/koneksi.js");
const routerAlat = require("./alat/routes.js")
const routerPinjam = require("./peminjaman/router.js")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

app.use("/api/alat", routerAlat)
app.use("/api/pinjam", routerPinjam)

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
  console.info(`Server berjalan di port ${PORT} ${new Date()}`);
});
