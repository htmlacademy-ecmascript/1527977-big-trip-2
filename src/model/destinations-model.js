import { destinations } from '../mock/destinations.js';
import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  #destinations;

  constructor() {
    super();
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

