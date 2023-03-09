class Car {
  constructor(licence, maker, model, owner, price, color) {
    this.licence = licence;
    this.maker = maker;
    this.model = model;
    this.owner = owner;
    this.price = price;
    this.color = color;
  }
}

const updateCarsTable = async () => {
  const data = await fetch(`http://localhost:8080/getcars`);
  const cars = await data.json();

  carsTable.textContent = "";

  for (const car of cars) {
    const tr = document.createElement("tr");
    tr.appendChild(createCell(car.licence));
    tr.appendChild(createCell(car.maker));
    tr.appendChild(createCell(car.model));
    tr.appendChild(createCell(car.owner));
    tr.appendChild(createCell(car.price));
    tr.appendChild(createCell(car.color));

    carsTable.appendChild(tr);
  }
  //HEHE
  // const table = document.querySelector("#cars-table");

  // const row = table.insertRow(-1);

  // row.insertCell(0).textContent = licence;
  // row.insertCell(1).textContent = maker;
  // row.insertCell(2).textContent = model;
  // row.insertCell(3).textContent = owner;
  // row.insertCell(4).textContent = price;
  // row.insertCell(5).textContent = color;
};

const createCell = (text) => {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
};

const handleSubmit = () => {
  const licence = document.querySelector("#licence").value;
  const maker = document.querySelector("#maker").value;
  const model = document.querySelector("#model").value;
  const owner = document.querySelector("#owner").value;
  const price = document.querySelector("#price").value;
  const color = document.querySelector("#color").value;

  if (!licence || !maker || !model || !owner || !price || !color) return;

  fetch(
    `http://localhost:8080/setcar?licence=${licence}&maker=${maker}&model=${model}&owner=${owner}&price=${price}&color=${color}`
  );
};

const handleSearch = async () => {
  const data = await fetch(`http://localhost:8080/getcars`);
  const cars = await data.json();

  const foundCar = cars.find((car) => car.licence === search.value);

  if (!foundCar) return;

  searchArea.classList.add("active");

  searchTable.textContent = "";

  const tr = document.createElement("tr");
  tr.appendChild(createCell(foundCar.maker));
  tr.appendChild(createCell(foundCar.owner));
  tr.appendChild(createCell(foundCar.model));

  searchTable.appendChild(tr);
};

const carsTable = document.querySelector("#cars-results");
const searchTable = document.querySelector("#search-results");
const form = document.querySelector("form");
const searchBtn = document.querySelector("#search-btn");
const search = document.querySelector("#searchInput");
const searchArea = document.querySelector(".search-area");

searchBtn.addEventListener("click", handleSearch);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit();
  updateCarsTable();
});

updateCarsTable();
