import data from "../models/data.js";
import { responError, responSukses } from "../response/payload.js";

// Controller butuh req dan res
const getData = (req, res) => {
  return responSukses(res, 200, "succcess", "Data buah", data);
};

const apalah = (req, res) => {
  return res.json({ message: "kelas web" });
};

const addBuah = (req, res) => {
  const { id } = req.params;

  
};

export { getData, apalah };
