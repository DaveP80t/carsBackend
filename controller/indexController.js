const express = require("express");
const router = express.Router();
const { getIndexPage } = require("../queries/index");
const { checkOL } = require("../validations/crudValidations");

router.get("/", checkOL, async (req, res) => {
  const page = await getIndexPage(req.query.off, req.query.lim);
  if (page[0]) res.json(page);
  else res.status(500).json({ err: "pg error" });
});

module.exports = router;
