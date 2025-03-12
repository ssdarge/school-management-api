import "dotenv/config";
import fs from "fs";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 28805,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    ca: fs.readFileSync("ca-certificate.pem"),
    rejectUnauthorized: true,
  },
});

console.log("MySQL connection pool created successfully with SSL");

export default pool;
