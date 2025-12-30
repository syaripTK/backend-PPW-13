const { ask } = require("./core.js");
const { menu } = require("../module/data.js");
const { log } = require("console");

const pesanan = [];

const tampilkanMenu = () => {
  log("--=( Warung BABA CHAN )=--\n");
  log("Daftar Menu :");

  Object.entries(menu).forEach(([kode, item]) => {
    const kodeUpper = kode.toUpperCase();
    const formatHarga = item.harga.toLocaleString("id-ID");
    if (kode === "et") {
      log(`- (${kodeUpper}) ${item.nama} Manis - ${formatHarga}`);
    } else {
      log(`- (${kodeUpper}) ${item.nama} - ${formatHarga}`);
    }
  });
};

const pesanMenu = async () => {
  const kode = await ask("Masukkan kode makanan: ");
  const item = menu[kode.toLowerCase()];

  if (!item) {
    log("Kode makanan tidak ditemukan");
    return;
  }

  pesanan.push(item);

  log("\n----------------------------");
  log("Pesanan Berhasil ditambahkan");
  log("----------------------------");
};

const lihatPesanan = async () => {
  log("\n Daftar Pesanan");

  if (pesanan.length === 0) {
    log(
      "============================\nAnda belum memesan apapun\n============================"
    );
    return;
  }

  let total = 0;

  pesanan.forEach((item, index) => {
    log(`${index + 1}. ${item.nama} - ${item.harga}`);
    total += item.harga;
  });

  log(`\nTotal Bayar : Rp${total.toLocaleString()}`);
};

module.exports = {
  tampilkanMenu,
  pesanMenu,
  lihatPesanan,
};
