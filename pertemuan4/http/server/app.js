import http from "http";

const server = http.createServer((req, res) => {
  console.log(req.url);
  //   Ini buat cek statusCode  
  console.log(res.statusCode);

  //   kirim data ke client
  res.setHeader("Content-Type", "text/plain");
  res.end("Ini data yang dikirim dari server untuk client");
});

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
