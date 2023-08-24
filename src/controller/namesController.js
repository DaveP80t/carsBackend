const express = require("express");
const router = express.Router();
const {
  getCarNames
} = require("../queries/cars");

router.get("/", async (req, res) => {
  const carn = await getCarNames();
  if (carn[0]) res.json(carn);
  else res.status(500).json({ err: "pg error" });
});


module.exports = router;