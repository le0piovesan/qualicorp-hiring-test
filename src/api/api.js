const express = require("express");
const app = express();
const model = require("./model");
var cors = require("cors");

const port = process.env.PORT || 8888;

app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  const result = await model.findAll();
  res.json(result);
  res.send("oi do servidor");
});

app.get("/:id", async (req, res) => {
  const result = await model.findById(req.params.id);
  res.json(result);
});

app.post("/", async (req, res) => {
  const result = await model.createUser(req.body);
  res.json(result);
});

app.put("/:id", async (req, res) => {
  const result = await model.findAndUpdate(req.params.id, req.body);
  res.json(result);
});

app.delete("/:id", async (req, res) => {
  const result = await model.findAndDelete(req.params.id);
  res.json(result);
});

app.listen(port);
