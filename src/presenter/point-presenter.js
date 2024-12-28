import { remove, render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/utils.js';
import FormEditPointView from '../view/form-edit-point-view.js';
import PointView from '../view/point-view.js';
import {EditMode, Mode, UserAction, UpdateType} from '../const.js';

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
    destinationsModel,
    offersModel,
    onDataChange,
    onModeChange,
  }) {
    this.#eventContainer = eventContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevFormEditPoint = this.#formEditPoint;

    this.#pointComponent = new PointView({
      point: this.#point,
      pointDestination: this.#destinationsModel.getDestinationById(point.destination),
      pointOffers: this.#offersModel.getOffersByType(point.type),
      onEditClick: () => {
        this.replacePointToForm();
        document.addEventListener('keydown', this.escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#formEditPoint = new FormEditPointView({
      point: this.#point,
      pointDestinations: this.#destinationsModel.destinations,
      pointOffersAll: this.#offersModel.offers,
      editMode: EditMode.EDIT,
      onFormSubmit: this.#handleFormSubmit,
      onEditClick: () => {
        this.replaceFormToPoint();
        document.removeEventListener('keydown', this.escKeyDownHandler);
      },
      onDeleteClick: this.#handleDeleteClick,
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
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevFormEditPoint);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#formEditPoint);
  }

  resetCurrentDestinationsAndOffers = () => {
    if(this.#formEditPoint) {
      this.#formEditPoint.reset(this.#point);
      this.replaceFormToPoint();
    }
  };

  resetView() {
    if (this.#mode !== Mode.EDITING) {
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
    this.#handleDataChange(
      UserAction.UPDATE_Point,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );

    this.replaceFormToPoint();
    document.removeEventListener('keydown', this.escKeyDownHandler);
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
    this.replaceFormToPoint();
  };
}
