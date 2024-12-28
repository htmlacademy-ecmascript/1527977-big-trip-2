import Observable from '../framework/observable.js';
import { getRandomPoint } from '../mock/points.js';
const POINT_COUNT = 4;

export default class PointModel extends Observable {
  #points;

  constructor() {
    super();
    this.#points = [];
  }

  init() {
    this.#points = Array.from({length: POINT_COUNT}, getRandomPoint);
  }

  get points() {
    return this.#points;
  }

  updatePoint(updateType, updatedPoint) {
    this.#points = this.#points.map((point) => point.id === updatedPoint.id ? updatedPoint : point);
    this._notify(updateType, updatedPoint);
  }

  addPoint(updateType, newPoint) {
    this.#points = [newPoint, ...this.#points];
    this._notify(updateType, newPoint);
  }

  deletePoint(updateType, deletedPoint) {
    this.#points = this.#points.filter((point) => point.id !== deletedPoint.id);
    this._notify(updateType);
  }
}
