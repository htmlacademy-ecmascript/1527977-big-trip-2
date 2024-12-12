import { destinations } from '../mock/destinations.js';

export default class DestinationsModel {
  #destinations;

  constructor() {
    this.#destinations = [];
  }

  init() {
    this.#destinations = destinations;
  }

  get destinations() {
    return this.#destinations;
  }

  getDestinationById(id) {
    return this.#destinations?.find((destination) => destination.id === id ?? null);
  }
}

