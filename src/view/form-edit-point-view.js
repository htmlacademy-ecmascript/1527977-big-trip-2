import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createFormTemplate } from './form-edit-point-markup.js';

const createFormEditPointTemplate = ({state, destinations, offers}) => {
  const { basePrice, dateFrom, dateTo, type } = state.point;
  const pointDestination = Array.isArray(destinations) ? destinations.find((dest) => dest.id === state.point.destination) : {};
  const typeOffers = Array.isArray(offers) ? offers.find((off) => off.type === state.point.type)?.offers || [] : [];
  const pointOffers = typeOffers.filter((typeOffer) => state.point.offers.includes(typeOffer.id));
  const pointId = state.point.id || 0;

  return createFormTemplate(pointId, type, destinations, dateFrom, dateTo, basePrice, typeOffers, pointOffers, pointDestination);
};

export default class FormEditPointView extends AbstractStatefulView {
  #destinations = [];
  #offers = [];
  #handlerFormSubmit = null;
  #handlerEditClick = null;
  #handlerTypePointChange = null;
  #handlerOfferChange = null;
  #handlerDestinationChange = null;
  #handlerPriceChange = null;

  constructor({point,
    destinations,
    offers,
    onEditClick,
    onFormSubmit,
    onTypePointChange,
    onOfferChange,
    onDestinationChange,
    onPriceChange}) {
    super();

    this.#destinations = destinations;
    this.#offers = offers;
    this.#handlerFormSubmit = onFormSubmit;
    this.#handlerEditClick = onEditClick;
    this.#handlerTypePointChange = onTypePointChange;
    this.#handlerOfferChange = onOfferChange;
    this.#handlerDestinationChange = onDestinationChange;
    this.#handlerPriceChange = onPriceChange;

    this.#setFormSubmitHandler();
    this.#setEventListeners();

    this._setState(FormEditPointView.parsePointToState({point}));

    this._restoreHandlers();
  }

  get template() {
    return createFormEditPointTemplate({
      state: this._state,
      destinations: this.#destinations,
      offers: this.#offers
    });
  }

  #setFormSubmitHandler = () => {
    this.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#handlerFormSubmit(FormEditPointView.parseStateToPoint(this._state));
    });
  };

  #setEventListeners() {
    this.element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#handlerEditClick);
    this.element.querySelector('.event__save-btn')?.addEventListener('click', this.#handlerEditClick);
    this.element.querySelector('.event__type-group')?.addEventListener('change', this.#handlerTypePointChange);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#handlerOfferChange);
    this.element.querySelector('.event__input--destination')?.addEventListener('change', this.#handlerDestinationChange);
    this.element.querySelector('.event__input--price')?.addEventListener('change', this.#handlerPriceChange);
  }

  reset = (point) => {
    this.updateElement({point});
  };

  removeElement = () => {
    super.removeElement();
  };

  _restoreHandlers = () => {
    this.element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#handlerEditClick);
    this.element.querySelector('.event__save-btn')?.addEventListener('click', this.#handlerEditClick);
    this.element.querySelector('.event--edit')?.addEventListener('submit', this.#handlerFormSubmit);
    this.element.querySelector('.event__type-group')?.addEventListener('change', this.#handlerTypePointChange);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#handlerOfferChange);
    this.element.querySelector('.event__input--destination')?.addEventListener('change', this.#handlerDestinationChange);
    this.element.querySelector('.event__input--price')?.addEventListener('change', this.#handlerPriceChange);
  };

  static parsePointToState = ({point}) => ({point});

  static parseStateToPoint = (state) => (state.point);
}
