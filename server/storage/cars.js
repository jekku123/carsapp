const { writeFileSync, readFileSync } = require("fs");

const path = "storage/cars.json";

function getCars(_req, res) {
  const cars = readFileSync(path);
  res.status(200).send(cars);
}

function getCar(req, res) {
  const licence = req.query.licence;
  const cars = JSON.parse(readFileSync(path));
  const foundCar = cars.find((car) => car.licence === licence);
  if (foundCar) {
    res.status(200).send(foundCar);
  } else {
    res.status(404).send({ error: "No car found" });
  }
}

function setCar(req, res) {
  const newCar = req.body;
  const cars = JSON.parse(readFileSync(path));
  if (!cars.find((car) => car.licence === newCar.licence)) {
    try {
      writeFileSync(
        path,
        JSON.stringify([newCar, ...cars], null, 2),
        "utf8"
      );
      res
        .status(201)
        .send({ message: "Car succesfully added to the database" });
    } catch (error) {
      res.status(503).send({ error: "Database error" });
    }
  } else {
    res
      .status(400)
      .send({ error: "Licence is already in the database" });
  }
}

module.exports = { setCar, getCar, getCars };
