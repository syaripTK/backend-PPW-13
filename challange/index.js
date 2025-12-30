// import { siswa, daftar } from "./module.js";

const data = require("./module.js");

function tampilkan() {
  return console.log(
    `Total = ${data.daftar().total} \nLaki-laki = ${
      data.daftar().guyName.length
    } \n- ${data.daftar().guyName[0]} \n- ${
      data.daftar().guyName[1]
    } \nPerempuan = ${data.daftar().womanName.length} \n- ${
      data.daftar().womanName[0]
    } \n- ${data.daftar().womanName[1]}`
  );
}

tampilkan();
