import { render, RenderPosition, replace, remove } from '../framework/render';
import TotalInfoView from '../view/total-info-view';
import { getPointsByDate, formatDate } from '../utils/daijs';
import { getCheckedOffers, getTotalOffers} from '../utils/total-info';
import { DESTINATIONS_COUNT, DateFormat, SeparatorTotalInfo } from '../const';

export default class TotalInfoPresenter {
  #headerContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #infoComponent = null;
  #sortedPoints = [];

  constructor({ headerContainer, pointsModel, offersModel, destinationsModel }) {
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const points = this.#pointsModel.points;
    if(!points.length) {
      this.destroy();
      return;
    }

    this.#sortedPoints = points.toSorted(getPointsByDate);
    const prevInfoComponent = this.#infoComponent;

    this.#infoComponent = new TotalInfoView({
      route: this.#getRoute(),
      routeDates: this.#getRouteDates(),
      routePrice: this.#getRoutePrice(),
    });

    if(!prevInfoComponent) {
      render(this.#infoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
    } else {
      replace(this.#infoComponent, prevInfoComponent);
      remove(prevInfoComponent);
    }
  }

  destroy() {
    if(this.#infoComponent) {
      remove(this.#infoComponent);
    }
  }

  #getRoute() {
    const destinationNames = this.#sortedPoints.map((point) =>
      this.#destinationsModel.destinations.find((destination) => destination.id === point.destination)?.name);

    return destinationNames.length > DESTINATIONS_COUNT
      ? [destinationNames[0], destinationNames.at(- 1)].join(SeparatorTotalInfo.MANY_INFO)
      : destinationNames.join(SeparatorTotalInfo.DEFAULT);
  }

  #getRouteDates() {
    const startDate = formatDate(this.#sortedPoints[0]?.dateFrom, DateFormat.DATE_2);
    const endDate = formatDate(this.#sortedPoints.at(- 1)?.dateTo, DateFormat.DATE_2);
    return `${startDate} - ${endDate}`;
  }

  #getRoutePrice() {
    return this.#pointsModel.points.reduce((routePrice, point) =>
      routePrice + point.basePrice + getTotalOffers(point.offers, getCheckedOffers(this.#offersModel.offers, point.type)), 0);
  }

  #handleModelEvent = () => this.init();
}
