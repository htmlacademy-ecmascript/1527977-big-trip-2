import flatpickr from 'flatpickr';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createFormTemplate } from './form-edit-point-markup.js';

import 'flatpickr/dist/flatpickr.min.css';

const createFormEditPointTemplate = ({state, pointDestinations, pointOffersAll}) => {
  const { basePrice, dateFrom, dateTo, type, offers } = state.point;
  const currentPointDestination = pointDestinations.find(({id}) => id === state.point.destination);
  const currentPointOffers = pointOffersAll.find((offer) => offer.type === type).offers;
  const pointId = state.point.id || 0;
  const name = currentPointDestination.name || '';

  return createFormTemplate(pointId, type, pointDestinations, name, dateFrom, dateTo, basePrice, currentPointOffers, offers, currentPointDestination);
};

export default class FormEditPointView extends AbstractStatefulView {
  #basicPoint = null;
  #pointDestinations = [];
  #pointOffersAll = [];
  #handleDeleteClick = null;
  #onFormSubmit = null;
  #handlerEditClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({
    point,
    pointDestinations,
    pointOffersAll,
    onDeleteClick,
    onFormSubmit,
    onEditClick,
  }) {
    super();
    this.#basicPoint = point;
    this.#pointDestinations = pointDestinations;
    this.#pointOffersAll = pointOffersAll;
    this.#handleDeleteClick = onDeleteClick;
    this.#onFormSubmit = onFormSubmit;
    this.#handlerEditClick = onEditClick;

    this._setState(FormEditPointView.parsePointToState({point}));
    this._restoreHandlers();
  }

  get template() {
    return createFormEditPointTemplate({
      state: this._state,
      pointDestinations: this.#pointDestinations,
      pointOffersAll: this.#pointOffersAll,
    });
  }

  reset() {
    this.updateElement({
      ...this.#basicPoint,
      typeOffers: this.#pointOffersAll.find((offer) => offer.type === this.#basicPoint.type)
    });

  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  _restoreHandlers = () => {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handlerEditClick);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#handlerFormSubmit);
    this.element.querySelector('.event--edit').addEventListener('submit', this.#handlerFormSubmit);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#handlerTypePointChange);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#handlerOfferChange);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#handlerDestinationChange);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#handlerPriceChange);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);

    this.#setDatepickers();
  };


  #handlerFormSubmit = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(FormEditPointView.parseStateToPoint(this._state));
  };

  #handlerTypePointChange = (evt) => {
    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value.toLowerCase(),
        offers: []
      },
    });
  };

  #handlerOfferChange = () => {
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      point: {
        ...this._state.point,
        offers: checkedOffers.map((item) => item.dataset.offerId)
      }
    });
  };

  #handlerDestinationChange = (evt) => {
    const currentDestination = this.#pointDestinations.find((pointDestination) =>
      pointDestination.name === evt.target.value);
    const currentDestinationId = currentDestination ? currentDestination.id : null;

    this.updateElement({
      point: {
        ...this._state.point,
        destination: currentDestinationId
      }
    });
  };

  #handlerPriceChange = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        basePrice: evt.target.value,
      }
    });
  };

  #setDatepickers = () => {
    const startDateNode = this.element.querySelector('.event__input--time[name="event-start-time"]');
    const endDateNode = this.element.querySelector('.event__input--time[name="event-end-time"]');
    const flatpickrConfig = {
      dateFormat: 'd/m/y/ H:i',
      enableTime: true,
      locale: {
        firstDayOfWeek: 1,
      },
      'time24hr': true,
    };

    this.#datepickerFrom = flatpickr(startDateNode, {
      ...flatpickrConfig,
      defaultDate: this._state.point.dateFrom,
      onClose: this.#startDateCloseHandler,
      maxDate: this._state.point.dateTo
    });

    this.#datepickerTo = flatpickr(endDateNode, {
      ...flatpickrConfig,
      defaultDate: this._state.point.dateTo,
      onClose: this.#endDateCloseHandler,
      minDate: this._state.point.dateFrom
    });
  };

  #startDateCloseHandler = ([enteredDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateFrom: enteredDate,
      },
    });
    this.#datepickerTo.set('minDate', this._state.point.dateFrom);
  };

  #endDateCloseHandler = ([enteredDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateTo: enteredDate,
      },
    });
    this.#datepickerFrom.set('maxDate', this._state.point.dateTo);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(this._state.point);
  };

  static parsePointToState = ({point}) => ({point});

  static parseStateToPoint = (state) => (state.point);

}
