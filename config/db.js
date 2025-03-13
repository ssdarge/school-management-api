import "dotenv/config";
import mysql from "mysql2/promise";

const sslCaCert = process.env.SSL_CA_CERT
  ? process.env.SSL_CA_CERT.replace(/\\n/g, "\n")
  : null;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 28805,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: sslCaCert ? { ca: sslCaCert, rejectUnauthorized: true } : undefined,
});

console.log("MySQL connection pool created successfully");
export default pool;
