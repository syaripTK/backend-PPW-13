const siswa = [
  { nama: "Kusno", gender: "l" },
  { nama: "Andini Gandasari", gender: "p" },
  { nama: "Diah Pitaloka", gender: "p" },
  { nama: "Maridjan Kartosuwiryo", gender: "l" },
];


const daftar = () => {
  const guy = [];
  const woman = [];

  siswa.forEach((e) => {
    if (e.gender === "l") {
      guy.push(e);
    } else {
      woman.push(e);
    }
  });

  const guyName = guy.map(e => e.nama)
  const womanName = woman.map(e => e.nama)
  const total = siswa.length

  return { total, guyName, womanName };
};




module.exports = {
  daftar,
};
