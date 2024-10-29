import pg from "pg";
import env from "dotenv";
env.config({
  path: "./.env",
});
const db = new pg.Client({
  connectionString: process.env.CONSTRING,
});

db.connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Database connection error:", err));

export default db;
