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
  "preferences"
];

function checkPref(req) {
  let arr = Object.values(req.body.preferences ?? {})
  if (!arr.length) return false
  if (typeof req.body.preferences == 'object' && typeof arr[0] == 'boolean' && typeof arr[1] == 'string') return true;
  else return false;
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

const checkPost = (req, res, next) => {
  let count = 0;
  let arr = Object.keys(req.body);
  if ((arr.length && arr.length < 10) || arr.length == 0) {
    res.status(400).json({ err: "make new post body" });
  } else {
    columnValues.forEach((item) => {
      if (item in req.body) count++;
    });
    if (count < 10) {
      res.status(400).json({ err: "make new post body" });
    } else {
      next();
    }
  }
};

const checkPreferences = (req, res, next) => {
  if (checkPref(req)) next();
  else res.status(400).json({ err: "preferences must be JSON isInterested, color," });
};

const checkPut = (req, res, next) => {
  let arr = Object.keys(req.body);
  if (arr.length == 0 || (req.body && req.body.hasOwnProperty('preferences') && !checkPref(req))) {
    if (arr.length == 0) { res.status(400).json({ err: "make new update body" }); }
    res.status(400).json({ err: "preferences must be JSON isInterested, color," });
  } else {
    for (let n of arr) {
      if (
        !columnValues.includes(n)
      ) {
        res.status(400).json({ err: "make new update body" });
      }
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
  checkPreferences,
  checkPref,
  checkPut,
};