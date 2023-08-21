const express = require("express");
const router = express.Router();
const { getIndexPage } = require("../queries/index");
const { checkNum } = require("../validations/crudValidations");

router.get("/:num", checkNum, async (req, res) => {
  const page = await getIndexPage(req.params.num);
  if (page[0]) res.json(page);
  else res.status(500).json({ err: "pg error" });
});

module.exports = router;
