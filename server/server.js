const express = require("express");
const cors = require("cors");

const { setCar, getCar, getCars } = require("./storage/cars.js");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/getcars", getCars);
app.get("/getcar", getCar);

app.post("/setcar", setCar);

app.listen(1337, () => console.log("Server running!"));
