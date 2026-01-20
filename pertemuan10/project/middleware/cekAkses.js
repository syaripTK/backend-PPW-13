// Buat fungsi untuk mengecek kondisi sebelum menjalankan route-nya

const cekRole = (req, res, next) => {
  const user = true;
  if (!user) res.status(403).json({ message: "Access denied" });

  next();
};

export { cekRole };
