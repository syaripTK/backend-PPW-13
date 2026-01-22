import express from "express";
import routeProject from "./routes/product.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/product", routeProject);

const PORT = 3307;

app.listen(PORT, () => {
  console.info(`Server was running on port ${PORT}`);
});
