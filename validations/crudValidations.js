const validator = require("validator");
const columnValues = [
  "name",
  "mpg",
  "cylinders",
  "displacement",
  "horsepower",
  "weight",
  "acceleration",
  "model_year",
  "origin",
];

function checkPref(req) {
  if (!req.body.hasOwnProperty("preferences")) return true;
  let arr = Object.values(req.body.preferences);
  let pref = {
    imageURL: null,
    color: null,
  };
  if (arr.length) {
    let p = req.body.preferences;
    for (let k in p) {
      let keys = ["imageURL", "color"];
      if (!keys.includes(k)) return false;
    }
    if (p.imageURL && validator.isURL(p.imageURL)) pref.imageURL = p.imageURL;
    if (p.color && typeof p.color == "string") pref.color = p.color;
    if (p.color && !p.imageURL) pref.color = null;
    req.body.preferences = pref;
    return true;
  }
  delete req.body.preferences;
  return true;
}

const checkND = (req, res, next) => {
  if (!req.query.name ^ !req.query.y) {
    res.status(400).json({ error: "enter original name and model year" });
  } else next();
};

const checkSearch = (req, res, next) => {
  if (!req.query.q || req.query.q.length < 2) {
    res.status(400).json({ error: "Please enter a valid name" });
  } else next();
};

const checkId = (req, res, next) => {
  if (Number.isNaN(+req.params.id)) {
    res.status(400).json({ error: "id must be a number" });
  } else next();
};

const checkNum = (req, res, next) => {
  if (Number.isNaN(+req.params.num)) {
    res.status(400).json({ error: "limit value must be a number" });
  } else next();
};

const makeModel = (req, res, next) => {
  if (req.body && req.body.hasOwnProperty("name")) {
    let n = req.body.name.trim().split(" ");
    if (n.length < 2)
      res.status(400).json({ err: "please submit make and model" });
    else if (n.length > 1) next();
  } else next();
};

const checkPost = (req, res, next) => {
  let count = 0;
  let arr = Object.keys(req.body);
  if ((arr.length && arr.length < 9) || arr.length == 0 || arr.length > 10) {
    res.status(400).json({ err: "make new post body" });
  } else {
    columnValues.forEach((item) => {
      if (item in req.body) count++;
    });
    if (count < 9) {
      res.status(400).json({ err: "make new post body" });
    } else {
      next();
    }
  }
};
// req.body { car_id, name, comment, }
const checkForm = (req, res, next) => {
  let n = req.body.name;
  let c = req.body.comment;
  let i = req.body.imageURL;
  let bool = Number.isNaN(+req.body.car_id);
  if (
    !bool &&
    typeof n == "string" &&
    typeof c == "string" &&
    (!validator.isURL(i) || typeof i == "undefined") &&
    n.length > 3 &&
    c.length > 1
  )
    next();
  else res.status(400).json({ err: "make new post body" });
};

const checkPreferences = (req, res, next) => {
  if (checkPref(req)) next();
  else res.status(400).json({ err: "preferences must be JSON URL, color," });
};

const checkPut = (req, res, next) => {
  let arr = Object.keys(req.body);
  if (arr.length && arr.length <= 10) {
    if (arr.every((item) => [...columnValues, "preferences"].includes(item))) {
      next();
    } else res.status(400).json({ err: "make new update body" });
  } else res.status(400).json({ err: "empty body or too many key values" });
};
// check put on comment
const checkComm = (req, res, next) => {
  let ci = +req.body.car_id;
  let n = req.body.name;
  let c = req.body.comment;
  let arr = Object.keys(req.body);
  if (arr.length == 0 || arr.length > 4) {
    res.status(400).json({ err: "make new body" });
  } else if (
    (req.body.car_id && Number.isNaN(ci)) ||
    (req.body.name && typeof n !== "string") ||
    (req.body.comment && typeof c !== "string")
  ) {
    res.status(400).json({ err: "need type string" });
  } else {
    for (let a of arr) {
      if (!["car_id", "name", "comment", "isinterested"].includes(a)) {
        res.status(400).json({ err: "make new update body" });
      }
    }
    next();
  }
};
// check comment post
const checkCommPost = (req, res, next) => {
  let ci = +req.body.car_id;
  let n = req.body.name;
  let c = req.body.comment;
  let i = req.body.isinterested;
  let arr = Object.keys(req.body);
  if (arr.length == 0 || arr.length > 4) {
    res.status(400).json({ err: "make new body" });
  } else if (
    Number.isNaN(ci) ||
    typeof n !== "string" ||
    typeof c !== "string" ||
    (req.body.isinterested && typeof i !== "boolean")
  ) {
    res.status(400).json({ err: "need type number, string, boolean" });
  } else {
    if (["car_id", "name", "comment"].some((item) => !arr.includes(item))) {
      res.status(400).json({ err: "make new update body" });
    }
    next();
  }
};

module.exports = {
  checkND,
  checkSearch,
  checkId,
  checkNum,
  checkPost,
  checkForm,
  checkComm,
  checkCommPost,
  checkPreferences,
  checkPref,
  checkPut,
  makeModel,
};
