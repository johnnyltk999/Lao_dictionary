const mysql = require("mysql2");
export const mysqlPool = mysql.createPool({
  host: process.env.MYSQL_HOST || "",
  port: parseInt(process.env.MYSQL_PORT || ""),
  database: process.env.MYSQL_DATABASE || "",
  user: process.env.MYSQL_USER || "",
  password: process.env.MYSQL_PASSWORD || "",
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
});
