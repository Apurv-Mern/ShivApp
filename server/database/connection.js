const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "shiv",
//   host: "localhost",
//   database: "shiv",
//   password: "shiv",
//   port: 5431,
// });
const pool = new Pool({
  user: "shivappdev",
  host: "115.245.68.141",
  database: "shivappdev",
  password: "CMzYrKspALTtqj",
  port: 5433,
  idleTimeoutMillis: 300000,
});

pool.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = { pool };
