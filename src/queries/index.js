const db = require("../db/dbConfig");

async function getIndexPage(off, lim) {
  try {
    const page = await db.any(
      `select a.*, b.* from (select * from cars order by id offset $1 limit $2) a, 
    (select count(*) from cars) b`,
      [off, lim]
    );
    return page;
  } catch (e) {
    return e;
  }
}

module.exports = {
  getIndexPage,
};
