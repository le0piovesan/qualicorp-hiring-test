const express = require("express");
const app = express();
const model = require("./model");
const cors = require("cors");

const corsOptions = { origin: process.env.URL || "*", credentials: true };

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());

const port = process.env.PORT || 8888;

app.get("/", async (req, res) => {
  const result = await model.findAll();
  res.json(result);
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
