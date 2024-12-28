import { render, remove } from '../framework/render.js';
import Message from '../view/message-view.js';
import ListView from '../view/list-view.js';
import {filter} from '../utils/filter.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import SortPresenter from './sort-presenter.js';
import {sortPointDay, sortPointPrice, sortPointTime} from '../utils/points.js';
import {FILTER_TYPE_DEFAULT, SORT_TYPE_DEFAULT, SortTypes, UpdateType, UserAction} from '../const.js';

export default class BoardPresenter {
  #eventContainer = null;
  #pointModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #sortPresenter = null;
  #listComponent = new ListView();
  #points = [];
  #filterModel = null;
  #pointsPresenter = new Map();
  #currentSortType = SORT_TYPE_DEFAULT;
  #newPointPresenter = null;
  #isCreatingNewPoint = false;
  #buttonNewEventPresenter = null;
  #filterType = FILTER_TYPE_DEFAULT;
  #messageComponent = null;

  constructor({
    eventContainer,
    pointModel,
    destinationsModel,
    offersModel,
    filterModel,
    buttonNewEventPresenter
  }) {
    this.#eventContainer = eventContainer;
    this.#pointModel = pointModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#buttonNewEventPresenter = buttonNewEventPresenter;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#listComponent.element,
      pointDestinations: this.#destinationsModel.destinations,
      pointOffersAll: this.#offersModel.offers,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#newPointDestroyHandler
    });

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortTypes.DAY:
        return filteredPoints.toSorted(sortPointDay);
      case SortTypes.PRICE:
        return filteredPoints.toSorted(sortPointPrice);
      case SortTypes.TIME:
        return filteredPoints.toSorted(sortPointTime);
      default:
        return this.#pointModel.points;
    }
  }

  init() {
    this.#renderBoard();
  }

  addPointButtonClickHandler = () => {
    this.#isCreatingNewPoint = true;
    // this.#currentSortType = SORT_TYPE_DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FILTER_TYPE_DEFAULT);
    this.#buttonNewEventPresenter.disableButton();
    this.#newPointPresenter.init();
  };

  #renderSorting() {
    this.#sortPresenter = new SortPresenter({
      eventContainer: this.#eventContainer,
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    this.#sortPresenter.init();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      eventContainer: this.#listComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderListComponent() {
    render(this.#listComponent, this.#eventContainer);
  }

  #renderBoard() {
    if (this.#points.length === 0 && this.#isCreatingNewPoint) {
      this.#renderMessage();
      return;
    }
    this.#renderSorting();
    this.#renderListComponent();
    this.#renderPoints();
  }

  #clearPoints = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
    this.#newPointPresenter.destroy();
  };

  #removeSorting(){
    if (this.#sortPresenter !== null){
      this.#sortPresenter.destroy();
      this.#sortPresenter = null;
    }
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#clearPoints();
    this.#removeSorting();

    if (this.#messageComponent){
      remove(this.#messageComponent);
    }
    if (resetSortType) {
      this.#currentSortType = SORT_TYPE_DEFAULT;
    }
  }

  #renderMessage() {
    this.#messageComponent = new Message({
      filterType: this.#filterType
    });
    render(this.#messageComponent, this.#eventContainer);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsPresenter.get(data.id)?.init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #newPointDestroyHandler = () => {
    this.#isCreatingNewPoint = false;
    this.#buttonNewEventPresenter.enableButton();
    if(this.#points.length) {
      this.#clearBoard();
      this.#renderBoard();
    }
  };

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
    this.#newPointPresenter.destroy();
  };
}
