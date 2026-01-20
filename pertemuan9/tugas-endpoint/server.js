import express from "express";
import pesertaRoute from "./routes/memberRoute.js";
import acaraRoute from "./routes/eventRoute.js";

const app = express();
const PORT = 3001;

app.use((req, res, next) => {
  console.info("Ini dari middleware yang pertama", req.url, new Date());
  next();
});

app.use("/peserta", pesertaRoute);
app.use("/acara", acaraRoute);

// app.use(express.json());

// app.get("/peserta", getAllPeserta);

// app.get("/acara", getAllEvent);

// app.post("/acara/create", createNewEvent);

// app.patch("/acara/update/:id", updateAcara);

// app.delete("/acara/delete/:id", deleteAcara);

// app.post("/acara/join/:id", addPeserta);

// app.get("/acara/detail/:id", detailAcaraById);
app.listen(PORT, () => {
  console.info(`Server was running in port ${PORT}`);
});
