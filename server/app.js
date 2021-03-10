const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  res.send({ status: "success" });
});

app.listen(port, () => {
  console.log(`Dev server listening at http://localhost:${port}`);
});
