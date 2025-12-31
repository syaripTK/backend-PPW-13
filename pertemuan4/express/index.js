import express from "express";

const app = express();

const PORT = 8080;

app.get("/home", (req, res) => {
  const users = [
    { id: crypto.randomUUID(), nama: "Ahmad Syangkan Syarip" },
    { id: crypto.randomUUID(), nama: "Ahmad Syam Khan" },
    { id: crypto.randomUUID(), nama: "Syaqib Baharun" },
  ];
  res
    .status(200)
    .json({
      success: true,
      message: "This is data from the server",
      data: users,
    });
});

export { app };
