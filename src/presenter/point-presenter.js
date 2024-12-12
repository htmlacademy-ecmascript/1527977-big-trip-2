import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey } from '../utils/utils.js';
import PointView from '../view/point-view.js';
import FormEditPointView from '../view/form-edit-point-view.js';
import { Mode } from '../const';
export default class PointPresenter {
  #eventContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #pointComponent = null;
  #formEditPoint = null;
  #point = null;
  #destinationsModel = null;
  #offersModel = null;
  #mode = Mode.DEFAULT;

  constructor({
    eventContainer,
    onDataChange,
    onModeChange,
    destinationsModel,
    offersModel
  }) {
    this.#eventContainer = eventContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevFormEditPoint = this.#formEditPoint;

    this.#pointComponent = new PointView({
      point: this.#point,
      pointDestination: this.#destinationsModel.getDestinationById(point.destination),
      pointOffers: this.#offersModel.getOffersByType(point.type),
      onFavoriteClick: this.#handleFavoriteClick,
      onEditClick: () => {
        this.replacePointToForm();
        document.addEventListener('keydown', this.escKeyDownHandler);
      }
    });

    this.#formEditPoint = new FormEditPointView({
      point: this.#point,
      pointDestination: this.#destinationsModel.getDestinationById(point.destination),
      pointOffers: this.#offersModel.getOffersByType(point.type),
      pointDestinations: this.#destinationsModel.destinations,
      pointOffersAll: this.#offersModel.offers,

      onFormSubmit: (currentPoint) => {
        if(!currentPoint) {
          return;
        }
        this.#handleDataChange(currentPoint);
        this.replaceFormToPoint();

        document.removeEventListener('keydown', this.escKeyDownHandler);
      },
      onEditClick: () => {
        this.replaceFormToPoint();
        document.removeEventListener('keydown', this.escKeyDownHandler);
      }
    });

    if (!prevPointComponent || !prevFormEditPoint) {
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

  resetCurrentDestinationsAndOffers = () => {
    // this.#formEditPoint.reset(this.#point, this.pointDestinations, this.pointOffersAll);
    this.#formEditPoint.reset();
    this.replaceFormToPoint();
  };

  destroy() {
    remove(this.#pointComponent);
    remove(this.#formEditPoint);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.resetCurrentDestinationsAndOffers();
    }
  }

  escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.resetCurrentDestinationsAndOffers();
      document.removeEventListener('keydown', this.escKeyDownHandler);
    }
  };

  replacePointToForm = () => {
    replace(this.#formEditPoint, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#formEditPoint);
    this.#mode = Mode.DEFAULT;
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };
}
