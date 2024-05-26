const mysql = require("mysql2");
//why we are using createpool instesd of create connection?
//ans: in create connection we need to  build connection again n again but in createpool  is unlike from it
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "sys",
  password: "Nishant@123",
});

module.exports = pool.promise();
