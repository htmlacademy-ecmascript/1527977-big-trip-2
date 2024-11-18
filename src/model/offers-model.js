import { offers } from '../mock/offers.js';

export default class OffersModel {
  #offers;

  constructor() {
    this.#offers = [];
  }

  init() {
    this.#offers = offers;
  }

  get offers() {
    return this.#offers;
  }
}
