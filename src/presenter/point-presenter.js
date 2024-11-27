import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey } from '../utils/utils.js';
import PointView from '../view/point-view.js';
import FormEditPointView from '../view/form-edit-point-view.js';
import { Mode } from '../const';

export default class PointPresenter {
  #eventContainer;
  #handleDataChange;
  #handleModeChange;

  #pointComponent;
  #formEditPoint;
  #point;
  #destinations = [];
  #offers = [];
  #mode = Mode.DEFAULT;

  constructor({ eventContainer, onDataChange, onModeChange }) {
    this.#eventContainer = eventContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevFormEditPoint = this.#formEditPoint;

    this.#pointComponent = new PointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFavoriteClick: this.#handleFavoriteClick,
      onEditClick: () => {
        this.replacePointToForm();
        document.addEventListener('keydown', this.escKeyDownHandler);
      }
    });

    this.#formEditPoint = new FormEditPointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: (evt, currentPoint) => {
        this.#handleDataChange(currentPoint);
        evt.preventDefault();
        this.replaceFormToPoint();
        document.removeEventListener('keydown', this.escKeyDownHandler);
      },
      onEditClick: () => {
        this.replaceFormToPoint();
        document.removeEventListener('keydown', this.escKeyDownHandler);
      }
    });

    if (prevPointComponent === null || prevFormEditPoint === null) {
      render(this.#pointComponent, this.#eventContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#formEditPoint, prevFormEditPoint);
    }

    remove(prevPointComponent);
    remove(prevFormEditPoint);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#formEditPoint);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.replaceFormToPoint();
    }
  }

  escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.replaceFormToPoint();
      document.removeEventListener('keydown', this.escKeyDownHandler);
    }
  };

  replacePointToForm() {
    replace(this.#formEditPoint, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  replaceFormToPoint() {
    replace(this.#pointComponent, this.#formEditPoint);
    this.#mode = Mode.DEFAULT;
  }

  #handleFavoriteClick = () => {
    this.#handleDataChange({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };
}
