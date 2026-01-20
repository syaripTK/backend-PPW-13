import mysql from "mysql2/promise";

const connnection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "bismillah",
  database: "produk", //just for test
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const checkConnection = async () => {
  try {
    const result = await connnection.getConnection();
    console.info("Connection to database already work");
    result.release();
    return true;
  } catch (error) {
    console.error("Connection failed", error.message);
  }
};

export { connnection, checkConnection };
