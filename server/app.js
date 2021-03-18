const express = require("express");
const cors = require("cors");

const geolocate = require("../lambda/geolocate.js");
const create = require("../lambda/create.js");
const view = require("../lambda/view.js");
const accept = require("../lambda/accept.js");
const list = require("../lambda/list.js");

const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());

app.post("/geolocate", async (req, res) => {
  geolocate.handler({ body: JSON.stringify(req.body) }).then((result) => {
    res.send(JSON.parse(result.body));
  });
});

app.post("/create", async (req, res) => {
  create.handler({ body: JSON.stringify(req.body) }).then((result) => {
    res.send(JSON.parse(result.body));
  });
});

app.get("/view", async (req, res) => {
  view.handler({ queryStringParameters: req.query }).then((result) => {
    res.send(JSON.parse(result.body));
  });
});

app.get("/accept", async (req, res) => {
  accept.handler({ queryStringParameters: req.query }).then((result) => {
    res.send(JSON.parse(result.body));
  });
});

app.get("/list", async (req, res) => {
  list.handler().then((result) => {
    res.send(JSON.parse(result.body));
  });
});

app.listen(port, () => {
  console.log(`Dev server listening at http://localhost:${port}`);
});
