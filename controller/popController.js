const express = require("express");
const router = express.Router();
const {
    getPopularCars,
    updatePopularity
} = require("../queries/cars");
const { checkId } = require("../validations/crudValidations");

router.get("/", async (req, res) => {
    const carsp = await getPopularCars();
    if (carsp[0]) res.json(carsp);
    else res.status(500).json({ err: "pg error" });
});

router.put("/:id", checkId, async (req, res) => {
    const carsp = await updatePopularity(req.params.id);
    if (carsp[0]) res.json(carsp[0]);
    else res.status(500).json({ err: "id not found" });
});


module.exports = router;