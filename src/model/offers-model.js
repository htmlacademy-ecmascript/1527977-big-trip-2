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

  getOffersByType(type) {
    return this.#offers?.find((offer) => offer.type === type)?.offers ?? {};
  }
}
