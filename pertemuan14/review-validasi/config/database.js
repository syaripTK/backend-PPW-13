import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "bismillah",
  database: "simulasi_utm", //just for test
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

export { connection, checkConnection };
