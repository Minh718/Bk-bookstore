import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ebookstore_system",
});

export default db;
