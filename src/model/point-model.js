import { points } from '../mock/points.js';

export default class PointModel {
  #points;

  constructor() {
    this.#points = [];
  }

  init() {
    this.#points = points;
  }

  get points() {
    return this.#points;
  }
}

