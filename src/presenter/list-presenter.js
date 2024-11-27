import { render, RenderPosition } from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import ButtonNewEventView from '../view/button-new-event-view.js';
import Message from '../view/message-view.js';
import ListView from '../view/list-view.js';
import {generateFilter} from '../mock/filter.js';
import {MessageText} from '../const.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/utils.js';
import {sortPointDay, sortPointPrice, sortPointTime} from '../utils/points.js';
import {SortTypes} from '../const.js';

export default class ListPresenter {
  #headerContainer;
  #eventContainer;
  #pointModel;
  #destinationsModel;
  #offersModel;
  #sorting;
  #buttonNewEvent = new ButtonNewEventView();
  #listComponent = new ListView();
  #points = [];
  #destinations = [];
  #offers = [];
  #filters = [];
  #pointPresenters = new Map();
  #currentSortType = SortTypes.DAY;
  #sourcedPoints = [];

  constructor({ headerContainer, eventContainer, pointModel, destinationsModel, offersModel }) {
    this.#headerContainer = headerContainer;
    this.#eventContainer = eventContainer;
    this.#pointModel = pointModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#points = [...this.#pointModel.points];
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];
    this.#filters = new FiltersView({filters: generateFilter(this.#points)});
    this.#sourcedPoints = [...this.#pointModel.points];

    this.#renderApp();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      eventContainer: this.#listComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    // this.#renderedTaskCount = TASK_COUNT_PER_STEP;
    // remove(this.#loadMoreButtonComponent);
  }

  #handlePointChange = (updatedPoint) => {
    this.#eventContainer = updateItem(this.#eventContainer, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderFilters() {
    render(this.#filters, this.#headerContainer);
  }

  #renderButtonNewEvent() {
    render(this.#buttonNewEvent, this.#headerContainer, RenderPosition.AFTEREND);
  }

  #renderMessage() {
    render(new Message(MessageText.this.#filters.FilterTypes), this.#eventContainer);
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortTypes.DAY:
        this.#eventContainer.sort(sortPointDay);
        break;
      case SortTypes.PRICE:
        this.#eventContainer.sort(sortPointPrice);
        break;
      case SortTypes.TIME:
        this.#eventContainer.sort(sortPointTime);
        break;
      default:
        this.#eventContainer = [...this.#sourcedPoints];
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPoint();

  };

  #renderSorting() {
    this.#sorting = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sorting, this.#eventContainer);
  }

  #renderListComponent() {
    render(this.#listComponent, this.#eventContainer);
  }

  #renderApp() {
    this.#renderFilters();
    this.#renderButtonNewEvent();
    if (this.#points.length === 0) {
      this.#renderMessage();
      return;
    }
    this.#renderListComponent();
    this.#renderSorting();
    for (const point of this.#points) {
      this.#renderPoint(point);
    }
  }
}
