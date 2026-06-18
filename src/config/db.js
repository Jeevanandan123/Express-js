import mysql from "mysql2/promise";
import "dotenv/config";

const pool = mysql.createPool({
  host: process.env.DB_HOST,       // 127.0.0.1
  user: process.env.DB_USER,       // root
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,   // todo_app
  port: 3306,                      // matches your Workbench port
});
console.log("Connecting to DB:", process.env.DB_NAME); 

// Test it on startup
pool.getConnection()
  .then(() => console.log("✅ MySQL connected!"))
  .catch((err) => console.error("❌ MySQL error:", err.message));

export default pool;