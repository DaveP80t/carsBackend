const express = require("express");
const router = express.Router();
const {
  getCars,
  getCarsByND,
  getcarsBySubstring,
  getCarsLimit,
  getcarsLimDesc,
  getCarsById,
  getCarCard,
  addRow,
  deleteRow,
  updateRow,
} = require("../queries/cars");

const {
  checkSearch,
  checkId,
  checkNum,
  checkPost,
  checkPreferences,
  checkPut,
  makeModel,
} = require("../validations/crudValidations");

router.get("/search", checkSearch, async (req, res, next) => {
  if (req.query.q) {
    const Cars = await getcarsBySubstring(req.query.q.trim());
    if (Cars[0]) res.json(Cars);
    else res.status(500).json({ err: "pg error" });
  } else next();
});

router.get("/", async (req, res, next) => {
  if (req.query.name && req.query.y) {
    const Cars = await getCarsByND(req.query.name, req.query.y);
    if (Cars[0]) res.json(Cars);
    else res.status(500).json({ err: "pg error" });
  } else next();
});

router.get("/", async (req, res) => {
  const Cars = await getCars();
  if (Cars[0]) res.json(Cars);
  else res.status(500).json({ err: "pg error" });
});

router.get("/limit/desc/:num", checkNum, async (req, res) => {
  const Car = await getcarsLimDesc(req.params.num);
  if (Car[0]) res.json(Car);
  else res.status(500).json({ err: "pg error" });
});

router.get("/limit/:num", checkNum, async (req, res) => {
  const Car = await getCarsLimit(req.params.num);
  if (Car[0]) res.json(Car);
  else res.status(500).json({ err: "pg error" });
});

router.get("/:id", checkId, async (req, res) => {
  const Car = await getCarsById(req.params.id);
  if (Car[0]) res.json(Car);
  else res.status(500).json({ err: "pg error" });
});

router.get("/card/:id", checkId, async (req, res) => {
  const Car = await getCarCard(req.params.id);
  if (Car[0]) res.json(Car);
  else res.status(500).json({ err: "pg error" });
});

router.post("/", checkPost, makeModel, checkPreferences, async (req, res) => {
  const newRow = await addRow(req.body);
  if (newRow[0]) res.status(201).json(newRow[0]);
  else res.status(500).json({ err: "pg error" });
});

router.delete("/:id", checkId, async (req, res) => {
  const id = req.params.id;
  const status = await deleteRow(id);
  if (status[0]) res.json(status[0]);
  else res.redirect("/notfound");
});

router.put(
  "/:id",
  checkId,
  checkPreferences,
  checkPut,
  makeModel,
  async (req, res) => {
    try {
      const updateCar = await updateRow(req.body, req.params.id);
      if (updateCar[0]) res.json(updateCar[0]);
      else res.status(500).json("This Car is not found");
    } catch (e) {
      res.status(400).json({ error: e });
    }
  }
);

module.exports = router;
