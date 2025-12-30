// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Siapa nama anda?", (answer) => {
//   console.log("Hallo", answer);
//   rl.close();
// });

// const ask = (question) => {
//   return new Promise((resolve) => {
//     rl.question(question, (answer) => {
//       resolve(answer);
//     });
//   });
// };

// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

/* =======================
   HELPER
======================= */

// const ask = (question) => {
//   return new Promise((resolve) => {
//     rl.question(question, (answer) => {
//       resolve(answer);
//     });
//   });
// };
const req = require("./core.js");
const read = require("./readline.js");
/* =======================
   DATA
======================= */

const menu = {
  ng: { nama: "Nasi Goreng", harga: 15000 },
  ag: { nama: "Ayam Geprek", harga: 10000 },
  ab: { nama: "Ayam Bakar", harga: 12000 },
  et: { nama: "Es Teh Manis", harga: 5000 },
  ej: { nama: "Es Jeruk Peras", harga: 8000 },
};

const pesanan = [];

/* =======================
   FITUR
======================= */

// const data = Object.values(menu).forEach((e) => console.log(e.nama));
// const item = Object.keys(menu).forEach((e) => console.log(e));
// const tampilkanMenu = () => {
//   console.log(`--=( Warung BABA CHAN)=-- \n \n`);
//   const data = Object.values(menu).forEach((e) => {
//     console.log(item, e);
    
//   });
// };
// tampilkanMenu()

function tampilkanMenu(menu) {
  console.log("--=( Warung BABA CHAN )=--\n");
  console.log("Daftar Menu :");

  Object.entries(menu).forEach(([kode, item]) => {
    const kodeUpper = kode.toUpperCase();
    const hargaFormat = item.harga.toLocaleString("id-ID");

    console.log(`- (${kodeUpper}) ${item.nama} - ${hargaFormat}`);
  });
}

async function pesanMenu() {
  const kode = await req.ask("Masukkan kode makanan: ");
  const item = menu[kode];

  if (!item) {
    console.log("Kode makanan tidak ditemukan");
    return;
  }

  pesanan.push(item);

  console.log("\n--------------------------");
  console.log("Pesanan berhasil ditambahkan");
  console.log("--------------------------");
}

async function lihatPesanan() {
  console.log("\nDaftar Pesanan");

  if (pesanan.length === 0) {
    console.log("Belum ada pesanan");
    return;
  }

  let total = 0;

  pesanan.forEach((item, index) => {
    console.log(`${index + 1}. ${item.nama} - ${item.harga}`);
    total += item.harga;
  });

  console.log(`\nTotal Bayar : Rp${total.toLocaleString()}`);
}

/* =======================
   MENU UTAMA
======================= */

async function mainMenu() {
  while (true) {
    console.log("\nOpsi :");
    console.log("1. Pesan");
    console.log("2. Daftar pesanan saya");
    console.log("3. Keluar");

    const pilihan = await req.ask("Pilih (1/2/3): ");

    if (pilihan === "1") {
      await pesanMenu();
    } else if (pilihan === "2") {
      await lihatPesanan();
    } else if (pilihan === "3") {
      break;
    } else {
      console.log("Pilihan tidak valid");
    }
  }

  console.log("\nTerima kasih sudah berkunjung ke warung kami..");
  read.rl.close();
}

/* =======================
   START
======================= */
// console.log(menu.ng.nama);


tampilkanMenu(menu)
mainMenu();
