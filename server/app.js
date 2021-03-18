const express = require("express");
const cors = require("cors");

const geolocate = require("../lambda/geolocate.js");
const createOffer = require("../lambda/createOffer.js");
const viewOffer = require("../lambda/viewOffer.js");
const acceptOffer = require("../lambda/acceptOffer.js");
const listOffers = require("../lambda/listOffers.js");

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
  createOffer.handler({ body: JSON.stringify(req.body) }).then((result) => {
    res.send(JSON.parse(result.body));
  });
});

app.get("/view", async (req, res) => {
  viewOffer.handler({ queryStringParameters: req.query }).then((result) => {
    res.send(JSON.parse(result.body));
  });
});

app.get("/accept", async (req, res) => {
  acceptOffer.handler({ queryStringParameters: req.query }).then((result) => {
    res.send(JSON.parse(result.body));
  });
});

app.get("/list", async (req, res) => {
  listOffers.handler().then((result) => {
    res.send(JSON.parse(result.body));
  });
});

app.listen(port, () => {
  console.log(`Dev server listening at http://localhost:${port}`);
});
