import { respond } from "../utils/response.js";
const cekRole = (req, res, next) => {
  const admin = true;
  if (!admin) return respond(res, 403, "errror", "Access denied");
  next();
};

const validateNewEvent = (req, res, next) => {

  if (!nama_acara || !tanggal || kuota == null) {
    return respond(
      res,
      400,
      "error",
      "Nama, Tanggal, Kuota tidak boleh kosong"
    );
  }

  next();
};

export { cekRole , validateNewEvent};
