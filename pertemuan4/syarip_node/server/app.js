import http from "http";

const server = http.createServer((req, res) => {
  console.info(req.url);
  console.info(res.statusCode);
  const { url, method } = req;
  res.setHeader("Content-Type", "application/JSON");

  if (url === "/data" && method === "GET") {
    res.statusCode = 200;
    const kelas = [
      { id: 1, nama_jurusan: "PPW" },
      { id: 2, nama_jurusan: "PPM" },
      { id: 3, nama_jurusan: "PSJ" },
    ];

    res.end(
      JSON.stringify({
        success: true,
        message: "Data from server",
        data: kelas,
      })
    );
  } else {
    res.statusCode = 404;
    res.end("Route tidak ditemukan");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.info(`Server berjalan di port ${PORT}`);
});
