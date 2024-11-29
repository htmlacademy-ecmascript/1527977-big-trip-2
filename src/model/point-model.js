import { getRandomPoint } from '../mock/points.js';
const POINT_COUNT = 4;

export default class PointModel {
  #points;

  constructor() {
    this.#points = [];
  }

  init() {
    this.#points = Array.from({length: POINT_COUNT}, getRandomPoint);
  }

  get points() {
    return this.#points;
  }
}


