const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const carController = require("./controller/carsController");
const popController = require("./controller/popController");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/cars", carController);
app.use("/popular", popController);
app.get("/", (req, res) => {
  res.send("Welcome to classic carCommentary");
});
app.get("/notfound", (req, res) => {
  res.status(404).send("invalid request");
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;
