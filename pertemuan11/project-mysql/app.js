import express from "express";
// import { koneksi, cekKoneksi } from "./config/db.js";
// import { getUsers } from "./controllers/user.controller.js";
import userRoute from "./routes/user.route.js";

const app = express();
app.use(express.json());
const PORT = 8080;

//Buatkan endpoint untuk cek hasil dari koneksi
// app.get("/cekdb", async (req, res) => {
//   const result = await cekKoneksi;
//   if (result) {
//     return res.status(200).json({
//       message: "Connection success",
//     });
//   }

//   return res.status(500).json({ message: "Connection failed" });
// });

// app.get("/users", getUsers);

app.use("/users", userRoute);

app.listen(PORT, () => {
  console.info(`Server berjalan di port ${PORT}`);
});
