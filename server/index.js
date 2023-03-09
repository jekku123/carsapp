const express = require("express");
const cors = require("cors");
const app = express();

let cars = [];

app.use(express.json());
app.use(cors());

app.get("/getcars", (req, res) => {
  res.send(cars);
});

app.get("/setcar", (req, res) => {
  cars.push({
    licence: req.query.licence,
    maker: req.query.maker,
    model: req.query.model,
    owner: req.query.owner,
    price: req.query.price,
    color: req.query.color,
  });
});

app.listen(8080);
