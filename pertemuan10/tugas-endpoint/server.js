import express from "express";
import pesertaRoute from "./routes/memberRoute.js";
import acaraRoute from "./routes/eventRoute.js";

const app = express();
app.use(express.json())
const PORT = 3001;

app.use((req, res, next) => {
  console.info(req.url, new Date().getFullYear());
  next();
});

app.use("/peserta", pesertaRoute);
app.use("/acara", acaraRoute);


app.listen(PORT, () => {
  console.info(`Server was running in port ${PORT}`);
});
