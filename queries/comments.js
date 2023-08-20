const db = require("../db/dbConfig");

async function getComments() {
  const somecomm = await db
    .any("select * from car_comments ORDER BY id")
    .then((res) => res)
    .catch((e) => {
      return e;
    });
  return somecomm;
}
//get comments by id
async function getCommById(id) {
  const comm = await db
    .any("select * from car_comments where id = $1", id)
    .then((res) => res)
    .catch((e) => {
      return e;
    });
  return comm;
}
//creating a new comment entry
async function addComm(args) {
  let vals = Object.values(args);
  try {
    const Row = await db.any(
      `INSERT INTO car_comments (${Object.keys(args).join(",")}) 
        VALUES (${vals
          .map((item, i) => {
            return `$${i + 1}`;
          })
          .join(",")}) RETURNING *`,
      vals
    );
    return Row;
  } catch (e) {
    return e;
  }
}
//deleting a comment entry
async function deleteCommRow(args) {
  try {
    const Del = await db.any(
      `DELETE FROM car_comments where id = ${args} RETURNING *`
    );
    return Del;
  } catch (e) {
    return e;
  }
}
//update a car_comment
async function updateComment(args, id) {
  let arr = Object.keys(args);
  let vals = [...Object.values(args), id];
  try {
    const Row = await db.any(
      `UPDATE car_comments SET ${arr
        .map((item, i) => {
          return `${item} = $${i + 1}`;
        })
        .join(", ")} where
        id = $${vals.length} RETURNING *`,
      vals
    );
    return Row;
  } catch (e) {
    return e;
  }
}

module.exports = {
  getComments,
  getCommById,
  addComm,
  deleteCommRow,
  updateComment,
};
