const express = require("express");
const router = express.Router();
const {
    getComments,
    getCommById,
    addComm,
    deleteCommRow,
    updateComment,
} = require("../queries/comments");
const {
    checkCommPost,
    checkComm,
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

router.post("/", checkCommPost, async (req, res) => {
    const comm = await addComm(req.body);
    if (comm[0]) res.status(201).json(comm);
    else res.status(500).json({ err: "pg error, make sure car_id exists in /cars" });
});

router.put("/:id", checkId, checkComm, async (req, res) => {
    try {
      const updateCar = await updateComment(req.body, req.params.id);
      if (updateCar.length === 0) {
        res.status(404).json("This Car is not found");
      } else {
        res.status(200).json(updateCar[0]);
      }
    } catch (e) {
      res.status(400).json({ error: e });
    }
  });

router.delete("/:id", checkId, async (req, res) => {
    const id = req.params.id;
    const status = await deleteCommRow(id);
    if (status[0]) res.json(status[0]);
    else res.redirect("/notfound");
});


module.exports = router;