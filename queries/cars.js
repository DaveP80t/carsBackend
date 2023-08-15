const db = require("../db/dbConfig");
//get all cars
async function getCars() {
    const somecar = await db
        .any("select * from cars ORDER BY id")
        .then((res) => res)
        .catch((e) => {
            return e;
        });
    return somecar;
}

//get cars with num limit
async function getCarsLimit(args) {
    const somecar = await db
        .any(`select * from cars ORDER BY id limit ${args}`)
        .then((res) => res)
        .catch((e) => {
            return e;
        });
    return somecar;
}

async function getcarsLimDesc(args) {
    const somecar = await db
        .any(`select * from cars ORDER BY id desc limit ${args}`)
        .then((res) => res)
        .catch((e) => {
            return e;
        });
    return somecar;
}
//get car by original name and mdoel year, returns array
async function getCarsByND(name, year) {
    const somecar = await db
        .any(
            "select * from cars where name = $1 and model_year = $2",
            [name, year]
        )
        .then((res) => res)
        .catch((e) => {
            return e;
        });
    return somecar;
}

//get car by original name
async function getCarsByName(name) {
    const somecar = await db
        .any(
            "select * from cars where name ILIKE $1 ORDER BY model_year DESC",
            [name]
        )
        .then((res) => res)
        .catch((e) => {
            return e;
        });
    return somecar;
}

//get car by title that contains substring entered
async function getcarsBySubstring(name) {
    const somecar = await db
        .any(
            `select * from cars where name ILIKE '%${name}%' ORDER BY model_year DESC`,
            [name]
        )
        .then((res) => res)
        .catch((e) => {
            return e;
        });
    return somecar;
}

//get car by id
async function getCarsById(id) {
    const car = await db
        .any("select * from cars where id = $1", id)
        .then((res) => res)
        .catch((e) => {
            return e;
        });
    return car;
}

//get car card info with comment
async function getCarCard(id) {
    const car = await db
        .any(
            "select c.*, n.name, n.comment from cars c left join car_comments n on c.id = n.car_id where c.id = $1",
            id
        )
        .then((res) => res)
        .catch((e) => {
            return e;
        });
    return car;
}
//get popular cars, isInterested by car brand name
async function getPopularCars() {
    const data = await db
        .any(
            `select a.id, a.name, b.count from cars a join popularity b on a.id = b.car_id order by count desc`
        )
        .then((res) => res)
        .catch((e) => {
            return e;
        });
    return data;
}

//creating a new car entry
async function addRow(args) {
    let vals = Object.values(args)
    try {
        const Row = await db.any(`INSERT INTO cars (${Object.keys(args).join(
            ","
        )}) 
        VALUES (${vals
                .map((item, i) => {
                    return `$${i + 1}`
                })
                .join(",")}) RETURNING *`, vals);
        return Row;
    } catch (e) {
        return e;
    }
}

//deleting a car entry
async function deleteRow(args) {
    try {
        const Del = await db.any(
            `DELETE FROM cars where id = ${args} RETURNING *`
        );
        return Del;
    } catch (e) {
        return e;
    }
}

//update a car entry
async function updateRow(args, id) {
    let arr = Object.keys(args);
    let vals = [...Object.values(args), id];
    try {
        const Row = await db.any(
            `UPDATE cars SET ${arr
                .map((item, i) => {
                    return `${item} = $${i + 1}`
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
    getCars,
    getCarsByND,
    getCarsByName,
    getcarsBySubstring,
    getCarsLimit,
    getcarsLimDesc,
    getCarsById,
    getCarCard,
    getPopularCars,
    addRow,
    deleteRow,
    updateRow,
};
