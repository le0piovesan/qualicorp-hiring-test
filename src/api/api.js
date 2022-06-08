const express = require("express");
var cors = require("cors");
const app = express();
const model = require("./model");

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:8888",
    "https://qualicorp-hiring-test.netlify.app",
  ];
  const origin = req.headers.origin;
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS, PATCH, DELETE, POST, PUT"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return next();
});

const port = process.env.PORT || 8888;

app.get("/", async (req, res) => {
  res.setHeader();
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
