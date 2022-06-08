const express = require("express");
const app = express();
const model = require("./model");
var cors = require("cors");

app.use(cors());

app.use(
  cors({
    origin:
      "http://localhost:3000" || "https://qualicorp-hiring-test.netlify.app/",
    credentials: true,
  })
);

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
