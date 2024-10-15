import {render, RenderPosition} from '../render.js';
import {getDefaultPoint} from '../const.js';
import FormEditPointView from '../view/form-edit-point-view.js';
import PointView from '../view/point-view.js';
import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
export default class ListPresenter {
  constructor({eventContainer, pointModel}) {
    this.eventContainer = eventContainer;
    this.listComponent = new ListView();
    this.pointModel = pointModel;
  }

  init() {
    const points = this.pointModel.getPoints();
    const destinations = this.pointModel.getDestinations();
    const offers = this.pointModel.getOffers();

    render(new SortView(), this.eventContainer, RenderPosition.AFTERBEGIN);
    render(this.listComponent, this.eventContainer);
    render(new FormEditPointView(getDefaultPoint(), destinations, offers), this.listComponent.getElement());
    render(new FormEditPointView(points[1], destinations, offers), this.listComponent.getElement());

    for (const point of points) {
      render(new PointView(point, destinations, offers), this.listComponent.getElement());
    }
  }
}
