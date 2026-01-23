const express = require("express");
const sequelize = require("./koneksi.js");

const app = express();
const PORT = 3000;

// Ini untuk mengecheck apakah database sudah terkoneksi atau belum
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
