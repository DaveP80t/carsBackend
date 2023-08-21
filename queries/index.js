const db = require("../db/dbConfig");

async function getIndexPage(num) {
  try {
    const page = await db.any(`select * from cars order by id offset $1`, num);
    return page;
  } catch (e) {
    return e;
  }
}

module.exports = {
  getIndexPage,
};
