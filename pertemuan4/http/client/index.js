import http from "https";

/**
 * Menentukan jenis request yang akan dieksekusi
 * Bisa GET, POST, DELETE, POST
 */

const request = http.request(
  "https://jsonplaceholder.typicode.com/users",
  (res) => {
    /**
     * Ini adalah versi 1st
     */

    // res.on("data", (data) => console.log(data.toString()));
    // res.on("error", (err) => {
    //   console.log(err.message);
    // });
    // res.on("end", () => {
    //   console.log("end");
    // });

    /**
     * Ini dalah versi ke 2 dalam membaca data
     * data yang di dapat melalui event "data" itu sebenarnya masih dalam bentuk potongan /
     * chunk, oleh karena itu perlu digabungkan secara manual agar datanya menjadi utuh
     */
    let item = "";
    res.on("data", (chunk) => {
      item += chunk;
    });
    // Jika datanya diterima, maka jalankan event end
    res.on("end", () => {
      const result = JSON.parse(item);
      console.log(typeof result);
    });
  }
);

/**
 * Ini digunakan jika ternyata pas ngakses ke srver itu ada error
 * Misal:
 * waktu terlalu lama (timeout)
 * urlnya salah
 */

request.on("error", (err) => {
  console.log(err.message);
});

request.end();
