import http from "http";
import fs from "fs";

const dataJurusan = fs.readFileSync("../data/jurusan.json", "utf-8");
const parseData = JSON.parse(dataJurusan);
const PORT = 8080;

//Helper function for a response

const sendJSON = (res, statusCode, payload) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
};

//Helper function for get the body

const getRequestBody = (req) => {
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
};

const app = http.createServer(async (req, res) => {
  const { url, method } = req;
  console.info(url, method);

  //Get /data
  if (url === "/data" && method === "GET") {
    return sendJSON(res, 200, {
      success: true,
      message: "Data from server",
      data: parseData,
    });
  }

  //Get /data/:id
  if (url.startsWith("/data/") && method === "GET") {
    const id = Number(url.split("/")[2]);
    const item = parseData.find((k) => k.id === id);

    if (!item) {
      return sendJSON(res, 404, {
        success: false,
        message: "Data not found",
      });
    }

    return sendJSON(res, 200, {
      success: true,
      data: item,
    });
  }

  //Post /data
  if (url === "/data" && method === "POST") {
    try {
      const body = await getRequestBody(req);

      if (!body.prody_name) {
        return sendJSON(res, 400, {
          success: false,
          message: "nama_jurusan wajib diisi",
        });
      }

      const newData = {
        id: parseData.length + 1,
        nama_jurusan: body.prody_name,
      };

      parseData.push(newData);
      fs.writeFileSync("../data/jurusan.json", JSON.stringify(parseData));
      console.info("Data berhasil ditambahkan!");
      return sendJSON(res, 201, {
        success: true,
        message: "Data berhasil ditambahkan",
        data: parseData,
      });
    } catch {
      return sendJSON(res, 400, {
        success: false,
        message: "Invalid JSON body",
      });
    }
  }

  //   Default
  sendJSON(res, 404, {
    success: false,
    message: "Route tidak ditemukan",
  });
});

app.listen(PORT, () => {
  console.info(` Server berjalan di port ${PORT}`);
});
