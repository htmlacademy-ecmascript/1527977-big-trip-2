import Observable from '../framework/observable';
import { UpdateType, MessageText } from '../const';

export default class PointsModel extends Observable {
  #points = [];
  #pointApiService = null;
  #offrsModel = null;
  #destinationsModel = null;

  constructor({ pointApiService, offersModel, destinationsModel }) {
    super();
    this.#pointApiService = pointApiService;
    this.#offrsModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      await this.#offrsModel.init();
      await this.#destinationsModel.init();
      const points = await this.#pointApiService.points;
      this.#points = points.map(this.#adaptToClient);
      this._notify(UpdateType.INIT);
    } catch (err) {
      this.#points = [];
      this._notify(UpdateType.ERROR);
    }
  }

  async updatePoint(updateType, update) {
    try {
      const response = await this.#pointApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = this.#points.map((point) => point.id === update.id ? updatedPoint : point);
      this._notify(updateType, updatedPoint);
    } catch (error) {
      throw new Error(MessageText.ERROR_UPDATE);
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointApiService.addPoint(update);
      const adaptPoint = this.#adaptToClient(response);
      this.#points = [adaptPoint, ...this.#points];
      this._notify(updateType, update);
    } catch (err) {
      throw new Error(MessageText.ERROR_ADD);
    }
  }

  async deletePoint(updateType, update) {
    try {
      await this.#pointApiService.deletePoint(update);
      this.#points = this.#points.filter((point) => point.id !== update.id);
      this._notify(updateType);
    } catch (err) {
      throw new Error(MessageText.ERROR_DELETE);
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

}
