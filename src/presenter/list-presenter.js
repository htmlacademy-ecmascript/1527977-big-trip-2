import { render, replace, RenderPosition } from '../framework/render.js';
import { isEscapeKey } from '../utils/utils.js';
import FormEditPointView from '../view/form-edit-point-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import ButtonNewEventView from '../view/button-new-event-view.js';
import Message from '../view/message-view.js';
import ListView from '../view/list-view.js';
import {generateFilter} from '../mock/filter.js';
import { MessageText } from '../const.js';

export default class ListPresenter {
  #headerContainer;
  #eventContainer;
  #pointModel;
  #destinationsModel;
  #offersModel;
  #sorting = new SortView();
  #buttonNewEvent = new ButtonNewEventView();
  #listComponent = new ListView();
  #points = [];
  #destinations = [];
  #offers = [];
  #filters = [];

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

    this.#renderApp();
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const formEditPoint = new FormEditPointView({
      point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: (evt) => {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onEditClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(formEditPoint, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, formEditPoint);
    }

    render(pointComponent, this.#eventContainer);
  }

  #renderApp() {

    render(this.#filters, this.#headerContainer);
    render(this.#buttonNewEvent, this.#headerContainer, RenderPosition.AFTEREND);
    if (this.#points.length === 0) {
      render(new Message(MessageText.this.#filters.FilterTypes), this.#eventContainer);
      return;
    }
    render(this.#listComponent, this.#eventContainer);
    render(this.#sorting, this.#eventContainer);
    for (const point of this.#points) {
      this.#renderPoint(point);
    }
  }
}
