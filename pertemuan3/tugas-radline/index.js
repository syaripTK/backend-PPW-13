const { log } = require("console");
const { createInterface } = require("readline");

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (tanya) => {
  return new Promise((resolve) => {
    rl.question(tanya, (jawab) => {
      resolve(jawab);
    });
  });
};

const menu = {
  ng: { nama: "Nasi Goreng", harga: 15000 },
  ag: { nama: "Ayam Geprek", harga: 10000 },
  ab: { nama: "Ayam Bakar", harga: 12000 },
  et: { nama: "Es Teh", harga: 5000 },
  ej: { nama: "Es Jeruk Peras", harga: 8000 },
};

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
  const item = menu[kode];

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

const mainMenu = async () => {
  try {
    while (true) {
      log("\nOpsi :");
      log("1. Pesan");
      log("2. Daftar pesanan saya");
      log("3. Keluar");

      const pilihan = await ask("Pilih (1/2/3): ");

      if (pilihan === "1") {
        await pesanMenu();
      } else if (pilihan === "2") {
        await lihatPesanan();
      } else if (pilihan === "3") {
        break;
      } else {
        log("Pilihan tidak valid");
      }
    }
  } catch (error) {
    log("Terjadi kesalahan,", error);
  } finally {
    log("\nTerima kasih sudah berkunjung ke warung kami..");
    rl.close();
  }
};

tampilkanMenu(menu);
mainMenu();
