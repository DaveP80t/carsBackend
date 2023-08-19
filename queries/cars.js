const db = require("../db/dbConfig");
//get all cars
async function getCars() {
    const cars = await db
        .any("select * from cars ORDER BY id")
        .then((res) => res)
        .catch((e) => {
            return e;
        });
    return cars;
}

async function getCarNames() {
    const names = await db
        .any("select id, name, model_year from cars ORDER BY name")
        .then((res) => res)
        .catch((e) => {
            return e;
        });
    return names;
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
            `select c.*, n.id commentId, n.name username, comment, isinterested, count from cars c left join car_comments n on c.id = n.car_id left join popularity p on 
            c.id = p.car_id where c.id = $1`,
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
            `with cte as (
                select id, name, (preferences->> 'imageURL') imageurl, count from cars join popularity 
                on id = car_id where count > 1
                )
                select * from cte
                union
                select id, name, (preferences->> 'imageURL') imageURL, 1 as count from cars
                 where id not in (select id from cte)
                and (preferences->> 'imageURL') is not null`
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
//update a popularity count
async function updatePopularity(id) {
    try {
        const Row = await db.any(
            `update popularity set count = (select count + 1 from popularity where 
                car_id = $1) where car_id = $1 RETURNING *`,
            id
        );
        return Row;
    } catch (e) {
        return e;
    }
}

module.exports = {
    getCars,
    getCarNames,
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
    updatePopularity,
};
