// Ini cara pertama

// Mengimport semua module yang ada di file data.js
// const data = require("./data.js");
// console.log(typeof data);
// console.log(data.nama);




// Cara ke 2 
// menggunakan destructering mengekspor yang kita butuhkan saja

const {nama} = require("./data.js")
console.log(nama);
