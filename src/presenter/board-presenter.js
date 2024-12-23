import { render, RenderPosition, remove } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import ButtonNewEventPresenter from './button-new-event-presenter.js';
import Message from '../view/message-view.js';
import ListView from '../view/list-view.js';
import {filter} from '../utils/filter.js';
import {MessageText} from '../const.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {sortPointDay, sortPointPrice, sortPointTime} from '../utils/points.js';
import {FILTER_TYPE_DEFAULT, SORT_TYPE_DEFAULT, SortTypes, UpdateType, UserAction} from '../const.js';

export default class BoardPresenter {
  #headerContainer = null;
  #eventContainer = null;
  #pointModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #sorting = null;
  #listComponent = new ListView();
  #points = [];
  #filterModel = null;
  #pointPresenters = new Map();
  #currentSortType = SORT_TYPE_DEFAULT;
  #newPointPresenter = null;
  #isCreatingNewPoint = false;
  #buttonNewEventPresenter = new ButtonNewEventPresenter();

  constructor({
    headerContainer,
    eventContainer,
    pointModel,
    destinationsModel,
    offersModel,
    filterModel
  }) {
    this.#headerContainer = headerContainer;
    this.#eventContainer = eventContainer;
    this.#pointModel = pointModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#listComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#newPointDestroyHandler
    });

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.get();
    const points = this.#pointModel.points;
    const filteredPoints = filter[filterType](points);

    switch (this.#currentSortType) {
      case SortTypes.DAY:
        return filteredPoints.toSorted(sortPointDay);
      case SortTypes.PRICE:
        return filteredPoints.toSorted(sortPointPrice);
      case SortTypes.TIME:
        return filteredPoints.toSorted(sortPointTime);
    }
    // return filteredPoints;
    return filteredPoints.toSorted(sortPointDay);
  }

  get filter() {
    return this.#filterModel.filter;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  #newPointDestroyHandler = (isCanceled) => {
    this.#isCreatingNewPoint = false;
    this.#buttonNewEventPresenter.enableButton();
    if(this.#points.length === 0 && isCanceled) {
      this.#clearBoard();
      this.#renderBoard();
    }
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
        this.#pointPresenters?.get(data.id)?.init(data);
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

  init() {
    this.#buttonNewEventPresenter.init(this.#newPointButtonClickHandler());
    this.#renderBoard();
  }

  #newPointButtonClickHandler = () => {
    this.#isCreatingNewPoint = true;
    this.#filterModel.setFilter(UpdateType.MAJOR, FILTER_TYPE_DEFAULT);
    this.#buttonNewEventPresenter.disableButton();
    this.#newPointPresenter.init();
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      eventContainer: this.#listComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
    this.#newPointPresenter.destroy();
  };

  #renderMessage() {
    render(new Message(`LIST_EMPTY__${MessageText}.${this.#filterModel.filter}`), this.#eventContainer);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();

  };

  #renderSorting() {
    this.#sorting = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sorting, this.#eventContainer, RenderPosition.AFTERBEGIN);
  }

  #renderListComponent() {
    render(this.#listComponent, this.#eventContainer);
  }

  #clearPoints = () =>{
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#newPointPresenter.destroy();
  };


  #clearBoard({resetSortType = false} = {}) {
    this.#clearPoints();
    remove(this.#sorting);

    if (this.#renderMessage) {
      remove(this.#renderMessage);
    }

    if (resetSortType) {
      this.#currentSortType = SORT_TYPE_DEFAULT;
    }
  }

  #renderBoard() {
    this.#renderListComponent();

    if (this.#points.length === 0) {
      this.#renderMessage();
      return;
    }
    this.#renderSorting();

    for (const point of this.#points) {
      this.#renderPoint(point);
    }
  }
}
