const express = require("express");
const router = express.Router();
const {
    getComments,
    getCommById,
    addComm,
    deleteCommRow,
} = require("../queries/comments");
const {
    checkForm,
    checkId,
} = require("../validations/crudValidations");

router.get("/", async (req, res) => {
    const Comm = await getComments();
    if (Comm[0]) res.json(Comm);
    else res.status(500).json({ err: "pg error" });
});

router.get("/:id", checkId, async (req, res) => {
    const Comm = await getCommById(req.params.id);
    if (Comm[0]) res.json(Comm);
    else res.status(500).json({ err: "pg error" });
});

router.post("/", checkForm, async (req, res) => {
    const comm = await addComm(req.body);
    if (comm[0]) res.json(comm);
    else res.status(500).json({ err: "pg error, make sure car_id exists in /cars" });
});

router.delete("/:id", checkId, async (req, res) => {
    const id = req.params.id;
    const status = await deleteCommRow(id);
    if (status[0]) res.json(status[0]);
    else res.redirect("/notfound");
});


module.exports = router;