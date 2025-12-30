import http from "http";

const clientRequest = http.request("http://localhost:3000/data", (res) => {
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    const result = JSON.parse(data);
    console.info(result.data);
  });
});

clientRequest.on("error", (err) => {
  console.error(err.message);
});

clientRequest.end();
