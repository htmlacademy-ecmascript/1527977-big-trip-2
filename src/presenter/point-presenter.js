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
  #destinations = [];
  #offers = [];
  #mode = Mode.DEFAULT;

  constructor({ eventContainer, onDataChange, onModeChange, destinations, offers}) {
    this.#eventContainer = eventContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevFormEditPoint = this.#formEditPoint;

    this.#pointComponent = new PointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFavoriteClick: this.#handleFavoriteClick,
      onEditClick: this.#handlerEditClick,
    });

    this.#formEditPoint = new FormEditPointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onTypePointChange: this.#handleTypePointChange,
      onOfferChange: this.#handleOfferChange,
      onDestinationChange: this.#handleDestinationChange,
      onPriceChange: this.#handlePriceChange,
      onFormSubmit: this.#handlerFormSubmit,
      onEditClick: this.#handlerEditClick,
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
    this.#formEditPoint.reset(this.#point, this.#destinations, this.#offers);
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

  #handlerEditClick() {
    this.replacePointToForm();
    document.addEventListener('keydown', this.escKeyDownHandler);
  }

  #handlerFormSubmit(currentPoint, evt) {
    evt.preventDefault();
    this.replaceFormToPoint();
    if(!currentPoint) {
      return;
    }
    this.#handleDataChange(currentPoint);
    document.removeEventListener('keydown', this.escKeyDownHandler);
  }

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

  #handleTypePointChange = (evt) => {
    const newType = evt.target.value;
    const newOffers = this.pointOffers.find((offer) => offer.type === newType)?.offers || [];
    this.updateElement({
      point: {
        ...this._state.point,
        type: newType,
        offers: newOffers
      }
    });
  };

  #handleOfferChange = () => {
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      point: {
        ...this._state.point,
        offers: checkedOffers.map((item) => item.dataset.offerId)
      }
    });
  };

  #handleDestinationChange = (evt) => {
    const currentDestination = this.destinations.find((pointDestination) =>
      pointDestination.name === evt.target.value);
    const currentDestinationId = currentDestination ? currentDestination.id : null;

    this.updateElement({
      point: {
        ...this._state.point,
        destination: currentDestinationId
      }
    });
  };

  #handlePriceChange = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        basePrice: evt.target.value,
      }
    });
  };
}
