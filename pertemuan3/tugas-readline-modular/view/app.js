const { ask, rl } = require("../controller/core.js");
const {
  pesanMenu,
  tampilkanMenu,
  lihatPesanan,
} = require("../controller/utils.js");
const { menu } = require("../module/data.js");
const { log } = require("console");

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
