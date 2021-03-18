const express = require("express");
const cors = require("cors");
const geolocate = require("../lambda/geolocate.js");
const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());

app.post("/geolocate", async (req, res) => {
  geolocate.handler({ body: JSON.stringify(req.body) }).then((feed) => {
    res.send(JSON.parse(feed.body));
  });
});

app.listen(port, () => {
  console.log(`Dev server listening at http://localhost:${port}`);
});
