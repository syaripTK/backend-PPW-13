import http from "http";

const server = http.createServer((req, res) => {
  console.log(req.url);
  //   Ini buat cek statusCode
  console.log(res.statusCode);

  const { url, method } = req;
  //   Kirim data ke client
  res.setHeader("Content-Type", "application/JSON");

  if (url === "/data" && method === "GET") {
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        success: true,
        message: "Data sari server",
        data: [
          { nama: "Dadang", kelas: "PPW" },
          { nama: "Usep", kelas: "PSJ" },
          { nama: "Dadun", kelas: "PPM" },
        ],
      })
    );
  } else if (url === "/json" && method === "GET") {
    res.statusCode = 200;
    let users = [];
    users.push(
      { name: "Ahmad", Umur: 32 },
      { name: "Pragos", Umur: 22 },
    );
    res.end(JSON.stringify({
      success: true,
      message: "Data dari server",
      data : users
    }));
  } else {
    res.statusCode = 404;
    res.end("Route tidak ditemukan");
  }
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
