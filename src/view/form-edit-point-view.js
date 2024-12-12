import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createFormTemplate } from './form-edit-point-markup.js';
import { toLowerCaseFirstLetter } from '../utils/utils.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const createFormEditPointTemplate = ({state, pointDestinations, pointOffersAll}) => {
  const { basePrice, dateFrom, dateTo, type } = state.point;
  const pointDestination = Array.isArray(pointDestinations) ? pointDestinations.find((dest) => dest.id === state.point.destination) : {};
  const typeOffers = Array.isArray(pointOffersAll) ? pointOffersAll.find((offer) => offer.type === state.point.type)?.offers || [] : [];
  const pointId = state.point.id || 0;
  const name = pointDestination.name || '';

  return createFormTemplate(pointId, type, pointDestinations, name, dateFrom, dateTo, basePrice, typeOffers, pointOffersAll, pointDestination);
};

export default class FormEditPointView extends AbstractStatefulView {
  #basicPoint = null;
  #pointDestinations = [];
  #pointOffersAll = [];
  #onFormSubmit = null;
  #handlerEditClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({
    point,
    pointDestinations,
    pointOffersAll,
    onFormSubmit,
    onEditClick,
  }) {
    super();
    this.#basicPoint = point;
    this.#pointDestinations = pointDestinations;
    this.#pointOffersAll = pointOffersAll;
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

  // reset = (point) => this.updateElement({point});
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
    this.element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#handlerEditClick);
    this.element.querySelector('.event__save-btn')?.addEventListener('click', this.#handlerEditClick);
    this.element.querySelector('.event--edit')?.addEventListener('submit', this.#handlerFormSubmit);
    this.element.querySelector('.event__type-group')?.addEventListener('change', this.#handlerTypePointChange);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#handlerOfferChange);
    this.element.querySelector('.event__input--destination')?.addEventListener('change', this.#handlerDestinationChange);
    this.element.querySelector('.event__input--price')?.addEventListener('change', this.#handlerPriceChange);

    this.#setDatepickers();
  };


  #handlerFormSubmit = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(FormEditPointView.parseStateToPoint(this._state));
  };

  #handlerTypePointChange = (evt) => {
    const newType = evt.target.value;
    const newTypeOffers = this.#pointOffersAll.find((offer) => offer.type === toLowerCaseFirstLetter(`${newType}`))?.offers || [];
    console.log(newTypeOffers);
    this.updateElement({
      point: {
        ...this._state.point,
        type: newType,
        typeOffers: newTypeOffers
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

  static parsePointToState = ({point}) => ({point});

  static parseStateToPoint = (state) => (state.point);

}
