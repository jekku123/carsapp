import Car from "./classes/Car.js";
import { insertRows } from "./utils/tableHandler.js";
import {
  fetchPostRequest,
  fetchGetRequest,
} from "./utils/fetchHandlers.js";

(() => {
  let carFormInputs;
  let searchInput;
  let carsTableBody;
  let searchResultsArea;

  const updateCarsTable = async () => {
    const cars = await fetchGetRequest(
      `http://localhost:1337/getcars`
    );

    carsTableBody.textContent = "";

    cars.forEach((car) => {
      const { licence, maker, model, owner, price, color } = car;

      const parsedCarData = {
        licence,
        maker,
        model,
        owner,
        price,
        color,
      };

      insertRows(parsedCarData, carsTableBody);
    });
  };

  const setCar = (e) => {
    e.preventDefault();

    const [licence, maker, model, owner, price, color] = [
      ...carFormInputs,
    ].map((input) => input.value);

    const car = new Car(licence, maker, model, owner, price, color);

    fetchPostRequest(`http://localhost:1337/setcar`, {
      licence,
      maker,
      model,
      owner,
      price,
      color,
      discount: (price - car.discount()).toFixed(2),
      discountedPrice: car.discount().toFixed(2),
    });

    carFormInputs.forEach((input) => (input.value = ""));

    updateCarsTable();
  };

  const searchCar = async () => {
    const searchParams = searchInput.value;
    const car = await fetchGetRequest(
      `http://localhost:1337/getcar?licence=${searchParams}`
    );

    if (!car.error) {
      searchResultsArea.innerHTML = `<ul id="search-results-list">
        <li>Maker: <span class="search-result">${car.maker}</span></li>
        <li>Owner: <span class="search-result">${car.owner}</span></li>
        <li>Model: <span class="search-result">${car.model}</span></li>
        <li>Discount: <span class="search-result">${car.discount}</span></li>
        <li>
          Discounted price: <span class="search-result">${car.discountedPrice}</span>
        </li>
      </ul>`;
    } else {
      searchResultsArea.innerHTML = `<span id="car-not-found">No matches</span>`;
      searchInput.value = "";
    }
  };

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    carFormInputs = document.querySelectorAll("#cars-form input");
    searchInput = document.querySelector("#search-input");
    carsTableBody = document.querySelector("#cars-table-body");
    searchResultsArea = document.querySelector(
      "#search-results-area"
    );

    document
      .querySelector("#cars-form")
      .addEventListener("submit", setCar);
    document
      .querySelector("#search-btn")
      .addEventListener("click", searchCar);

    updateCarsTable();
  }
})();
