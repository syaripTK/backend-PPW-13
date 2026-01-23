const express = require("express");
const sequelize = require("./config/koneksi.js");
const routeJurusan = require("./jurusan/router.js");
const routePeserta = require("./peserta/router.js");

const app = express();
app.use(express.json());
const PORT = 3000;
app.use("/api/jurusan", routeJurusan);
app.use("/api/peserta", routePeserta);

app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    return res.json({
      message: "Database berhasil terkoneksi",
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
});


app.listen(PORT, () => {
  console.info(`Server berjalan di port ${PORT}`);
});
