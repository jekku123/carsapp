export default class Car {
  constructor(licence, maker, model, owner, price, color) {
    this.licence = licence;
    this.maker = maker;
    this.model = model;
    this.owner = owner;
    this.price = +price;
    this.color = color;
  }

  discount() {
    if (this.price > 20000) {
      return this.price * 0.8;
    } else if (this.price < 5000) {
      return this.price * 0.9;
    } else {
      return this.price * 0.85;
    }
  }
}
