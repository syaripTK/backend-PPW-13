
const getTime = () => {
  const timeNow = new Date();

  const tanggal =
    timeNow.getFullYear() +
    "-" +
    String(timeNow.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(timeNow.getDate()).padStart(2, "0");

  return tanggal;
};

export default getTime;
