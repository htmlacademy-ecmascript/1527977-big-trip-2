import { render, remove } from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter';
import ListView from '../view/list-view';
import MessageView from '../view/message-view';
import SortView from '../view/sort-view';
import { filter } from '../utils/filter';
import { sortPointDay, sortPointPrice, sortPointTime } from '../utils/daijs';
import { FilterType, MessageText, TimeLimit, SortType, UpdateType, UserAction } from '../const';

export default class BoardPresenter {
  #eventsList = new ListView();
  #boardContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #pointPresenters = new Map;
  #offers = [];
  #destinations = [];
  #sortComponent = null;
  #messageComponent = null;
  #errorComponent = null;
  #currentFilterType = FilterType.EVERYTHING;
  #currentSortType = SortType.DEFAULT.name;
  #pointsError = null;
  #onNewPointDestroy = null;
  #pointsLoading = null;
  #isLoading = true;
  #newPointPresenter = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER,
    upperLimit: TimeLimit.UPPER
  });

  constructor({ boardContainer, onNewPointDestroy, filterModel, pointsModel, offersModel, destinationsModel }) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#onNewPointDestroy = onNewPointDestroy;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#eventsList.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onHandleViewAction: this.#handleViewAction,
      onNewPointDestroy: this.#onNewPointDestroy,
    });
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#currentFilterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#currentFilterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME.name:
        return [...filteredPoints].toSorted(sortPointTime);
      case SortType.PRICE.name:
        return [...filteredPoints].toSorted(sortPointPrice);
      default:
        return [...filteredPoints].toSorted(sortPointDay);
    }
  }

  init() {
    this.#renderBoard();
  }

  createPoint() {
    if (this.#messageComponent) {
      remove(this.#messageComponent);
      this.#messageComponent = null;
    }

    if (this.#pointsError) {
      remove(this.#pointsError);
      this.#pointsError = null;
    }

    this.#clearErrorState();
    this.#currentSortType = SortType.DEFAULT.name;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
    render(this.#eventsList, this.#boardContainer);
  }

  #clearErrorState() {
    if (this.#errorComponent) {
      remove(this.#errorComponent);
      this.#errorComponent = null;
    }
  }

  #renderMessage() {
    if (!this.#messageComponent) {
      this.#messageComponent = new MessageView({ message: MessageText[this.#currentFilterType] });
      render(this.#messageComponent, this.#boardContainer);
    }
  }

  #renderBoard() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if (!this.points.length) {
      this.#renderMessage();
      return;
    }
    this.#renderSort();
    this.#renderEventsList();
    this.#renderPoints();
  }

  #renderEventsList() {
    render(this.#eventsList, this.#boardContainer);
  }

  #renderLoading() {
    this.#pointsLoading = new MessageView({ message: MessageText.LOADING });
    render(this.#pointsLoading, this.#boardContainer);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSort: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#boardContainer);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => {
      presenter.resetView();
    });
  };

  #clearBoard({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    if (this.#pointsLoading) {
      remove(this.#pointsLoading);
    }

    remove(this.#sortComponent);

    if (this.#messageComponent) {
      remove(this.#messageComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT.name;
    }
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventsList.element,
      pointDestination: this.#destinationsModel.getDestinationById(point.destination),
      typeOffers: this.#offersModel.getOffersByType(point.type),
      destinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers,
      onModeChange: this.#handleModeChange,
      onHandleViewAction: this.#handleViewAction,
      newPointPresenter: this.#newPointPresenter
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #renderError() {
    this.#pointsError = new MessageView({ message: MessageText.FAIL });
    render(this.#pointsError, this.#boardContainer);
  }

  #handleModelEvent = (updateType, pointData) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(pointData.id).init(pointData, this.#offers, this.#destinations);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#pointsLoading);
        this.#renderBoard();
        this.#onNewPointDestroy();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#pointsLoading);
        this.#renderError();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };
}
