const express = require("express");
const cors = require("cors");

const geolocate = require("../lambda/geolocate.js");
const createOffer = require("../lambda/createOffer.js");
const viewOffer = require("../lambda/viewOffer.js");

const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());

app.post("/geolocate", async (req, res) => {
  geolocate.handler({ body: JSON.stringify(req.body) }).then((result) => {
    res.send(JSON.parse(result.body));
  });
});

app.post("/offers/create", async (req, res) => {
  createOffer.handler({ body: JSON.stringify(req.body) }).then((result) => {
    res.send(JSON.parse(result.body));
  });
});

app.get("/offers/view", async (req, res) => {
  console.log("anything??", req.query);
  viewOffer.handler({ queryStringParameters: req.query }).then((result) => {
    res.send(JSON.parse(result.body));
  });
});

app.listen(port, () => {
  console.log(`Dev server listening at http://localhost:${port}`);
});
