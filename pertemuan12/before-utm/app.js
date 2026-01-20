import express from "express";
import { checkConnection } from "./config/database.js";

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const PORT = 3307;

app.get("/check", async (req, res) => {
  const result = await checkConnection;
  if (result) {
    return res.status(200).json({
      message: "Connection success",
    });
  }

  return res.status(500).json({ message: "Connection failed" });
});

app.listen(PORT, () => {
  console.info(`Server was running on port ${PORT}`);
});
