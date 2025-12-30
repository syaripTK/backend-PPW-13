const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/* =======================
   DATA
======================= */

const menu = {
  ng: { nama: "Nasi Goreng", harga: 15000 },
  ag: { nama: "Ayam Geprek", harga: 10000 },
  ab: { nama: "Ayam Bakar", harga: 12000 },
  et: { nama: "Es Teh Manis", harga: 5000 },
  ej: { nama: "Es Jeruk Peras", harga: 8000 }
};

const pesanan = [];

/* =======================
   FUNGSI UTAMA
======================= */

function showMenu() {
  console.log("\nOpsi :");
  console.log("1. Pesan");
  console.log("2. Daftar pesanan saya");
  console.log("3. Keluar");

  rl.question("Pilih (1/2/3): ", handleMenu);
}

function handleMenu(pilihan) {
  switch (pilihan) {
    case "1":
      pesanMenu();
      break;
    case "2":
      lihatPesanan();
      break;
    case "3":
      keluar();
      break;
    default:
      console.log("Pilihan tidak valid");
      showMenu();
  }
}

/* =======================
   FITUR
======================= */

function pesanMenu() {
  rl.question("Masukkan kode makanan: ", (kode) => {
    const item = menu[kode];

    if (!item) {
      console.log("Kode makanan tidak ditemukan");
      return showMenu();
    }

    pesanan.push(item);

    console.log("\n--------------------------");
    console.log("Pesanan berhasil ditambahkan");
    console.log("--------------------------");

    showMenu();
  });
}

function lihatPesanan() {
  console.log("\nDaftar Pesanan");

  if (pesanan.length === 0) {
    console.log("Belum ada pesanan");
    return showMenu();
  }

  let total = 0;

  pesanan.forEach((item, index) => {
    console.log(`${index + 1}. ${item.nama} - ${item.harga}`);
    total += item.harga;
  });

  console.log(`\nTotal Bayar : Rp${total.toLocaleString()}`);
  showMenu();
}

function keluar() {
  console.log("\nTerima kasih");
  rl.close();
}

/* =======================
   START
======================= */

console.log(typeof menu);

showMenu();
