const pgp = require("pg-promise")();
require("dotenv").config();

const cn = {
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD
};

const db = pgp(cn);

db.connect()
  .then((obj) => {
    console.log("postgres connection established");
    obj.done(); // success, release the connection
  })
  .catch((error) => {
    console.log("ERROR:", error.message || error);
  });

module.exports = db;
