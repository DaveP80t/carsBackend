const express = require("express");
const router = express.Router();
const {
  getPopularCars
} = require("../queries/cars");

router.get("/", async (req, res) => {
  const carsp = await getPopularCars();
  if (carsp[0]) res.json(carsp);
  else res.status(500).json({ err: "pg error" });
});


module.exports = router;