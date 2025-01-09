import { EditType, EventType } from '../const';
import { toUpperCaseFirstLetter } from '../utils/utils.js';
import { formatDate } from '../utils/daijs.js';
import { DateFormat, BLANK_POINT, Attribute } from '../const';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

function createEditPointEventTypeTemplate(point, pointType) {
  const { isDisabled } = point;
  return (
    Object.values(EventType).map((type) => (
      `<div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
        value="${type}"
        ${type === pointType ? Attribute.CHECKED : ''}
        ${isDisabled ? Attribute.DISABLED : ''}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${toUpperCaseFirstLetter(type)}</label>
      </div>`
    )).join('')
  );
}

function createEditPointOfferTemplate(offersByPointType, offers, point) {
  const { isDisabled } = point;
  if (!offersByPointType) {
    return '';
  }
  if (!offersByPointType.offers) {
    return '';
  }
  return offersByPointType.offers.map(({ title, price, id }) => {
    const checked = offers.includes(id) ? Attribute.CHECKED : '';
    return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" data-offer-id="${id}" type="checkbox"
     name="event-offer-${id}" ${checked} ${isDisabled ? Attribute.DISABLED : ''}>
    <label class="event__offer-label" for="event-offer-${id}-1">
       <span class="event__offer-title">${title}</span>
       &plus;&euro;&nbsp;
       <span class="event__offer-price">${price}</span>
    </label>
    </div>`;
  }).join('');
}

function createEditPointOfferContainerTemplate(offersTemplate) {
  if (!offersTemplate) {
    return '';
  }
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersTemplate}
      </div>
    </section>`
  );
}

function createPhotoTemplate(destinationPoint) {
  if (destinationPoint.pictures.length === 0) {
    return '';
  }
  const { pictures } = destinationPoint;
  return ` <div class="event__photos-container">
      <div class="event__photos-tape">
      ${pictures.map((pic) => `<img class="event__photo" src="${pic.src}" alt="${pic.description}">`).join('')}
      </div>
    </div>`;
}

function createDescriptionTemplate(destinationPoint) {
  if (!destinationPoint.description) {
    return '';
  }
  return `<p class="event__destination-description">${destinationPoint.description}</p>`;
}

function addPointDestinationHeader(destination) {
  if (!destination) {
    return '';
  }
  return `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
  ${destination}`;
}

function createEditPointDestinationTemplate(destinationPoint) {
  const destination = `${createDescriptionTemplate(destinationPoint)}${createPhotoTemplate(destinationPoint)}`;
  return addPointDestinationHeader(destination);
}

function createEditPointDestinationContainerTemplate(destinationPoint) {
  if (!destinationPoint) {
    return '';
  }
  return (
    `<section class="event__section  event__section--destination">
    ${createEditPointDestinationTemplate(destinationPoint)}
    </section>`
  );
}

function createEditPointButtonNegativeTemplate(editType, point) {
  const { isDisabled, isDeleting } = point;
  return (
    editType === EditType.ADD
      ? `<button class="event__reset-btn" type="reset"  ${isDisabled ? 'disabled' : ''}>Cancel</button>`
      : `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
  );
}

function createCityList(destinations) {
  if (!destinations) {
    return '';
  }
  return destinations.map((destination) => (
    `<option value="${destination.name}"></option>`
  )).join('');
}

function createEditFormTemplate(point, allOffers, destinationsApp, editType) {
  const { type, basePrice, dateFrom, dateTo, offers, destination, isDisabled, isSaving } = point;
  const eventTypesTemplate = createEditPointEventTypeTemplate(point, type);
  const offersByPointType = allOffers.find((offer) => offer.type === type);
  const offersTemplate = offers ? createEditPointOfferTemplate(offersByPointType, offers, point) : '';
  const offersContainerTemplate = createEditPointOfferContainerTemplate(offersTemplate);
  let destinationContainerTemplate = '';
  let titleInputTemplate = '';
  if (destination) {
    const destinationPoint = destinationsApp.find((item) => item.id === destination);
    destinationContainerTemplate = createEditPointDestinationContainerTemplate(destinationPoint, editType);
    titleInputTemplate = destinationPoint.name;
  }
  const titleLabelTemplate = type ? toUpperCaseFirstLetter(type) : '';
  const buttonNegativeTemplate = createEditPointButtonNegativeTemplate(editType, point);
  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${eventTypesTemplate}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${titleLabelTemplate}
            </label>
            <input class="event__input
            event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value="${titleInputTemplate}"
            list="destination-list-1">
            <datalist id="destination-list-1">
            required
            ${isDisabled ? 'disabled' : ''}
              ${createCityList(destinationsApp)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(dateFrom, DateFormat.DATE_TIME)}" ${isDisabled ? 'disabled' : ''}>
            —
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(dateTo, DateFormat.DATE_TIME)}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price"
            value="${he.encode(String(basePrice))}"${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          ${buttonNegativeTemplate}
        </header>

        <section class="event__details">
          ${offersContainerTemplate}
          ${destinationContainerTemplate}
        </section>
      </form>
    </li>`
  );
}
export default class FormEditPointView extends AbstractStatefulView {
  #point = null;
  #offers = [];
  #destinations = [];
  #editType = null;
  #onCloseEditButtonClick = null;
  #onSubmitButtonClick = null;
  #dateFromPicker = null;
  #dateToPicker = null;
  #onDeleteClick = null;
  #typeOffers = [];

  constructor({
    point: point = BLANK_POINT,
    onDeleteClick,
    pointDestination,
    typeOffers,
    offers,
    destinations,
    editType,
    onCloseEditButtonClick,
    onSubmitButtonClick
  }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#typeOffers = typeOffers;
    this.#destinations = destinations;
    this.#editType = editType;
    if (this.#editType !== EditType.ADD) {
      this._setState(FormEditPointView.parsePointToState(point, pointDestination.id, typeOffers));
    } else {
      this._setState(FormEditPointView.parsePointToState(point));
    }
    this.#onCloseEditButtonClick = onCloseEditButtonClick;
    this.#onSubmitButtonClick = onSubmitButtonClick;
    this.#onDeleteClick = onDeleteClick;
    this.#setEventListeners();
  }

  get template() {
    return createEditFormTemplate(this._state, this.#offers, this.#destinations, this.#editType);
  }

  reset() {
    this.updateElement({
      ...this.#point,
      typeOffers: this.#offers.find((offer) => offer.type === this.point.type)
    });
  }

  _restoreHandlers() {
    this.#setEventListeners();
  }

  #setEventListeners() {
    if (this.#editType === EditType.EDIT) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeOpenEditButtonClickHandler);
    }
    this.element.querySelector('form').addEventListener('submit', this.#submitButtonClickHandler);

    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeListChangeHandler);

    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);

    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);

    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  #closeOpenEditButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#onCloseEditButtonClick(FormEditPointView.parseStateToPoint(this.#point));
  };

  #submitButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#offerChangeHandler();
    this.#onSubmitButtonClick(FormEditPointView.parseStateToPoint(this._state));
  };

  #typeListChangeHandler = (evt) => {
    evt.preventDefault();
    const targetType = evt.target.value;
    const typeOffers = this.#offers.find((item) => item.type === targetType);
    this.updateElement({
      type: targetType,
      typeOffers: typeOffers
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const targetDestination = evt.target.value;
    if (targetDestination) {
      let newDestination = this.#destinations.find((item) => item.name === targetDestination);
      newDestination = newDestination ? newDestination : '';
      this.updateElement({
        destination: newDestination.id
      });
    }
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onDeleteClick(FormEditPointView.parseStateToPoint(this._state));
  };

  #offerChangeHandler = () => {
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      offers: checkedOffers.map((offer) => offer.dataset.offerId)
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const newPrice = Number(evt.target.value);
    this._setState({
      basePrice: newPrice
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
    this.#dateToPicker.set('minDate', userDate);
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
  };

  #setDateFromPicker() {
    this.#dateFromPicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        'time_24hr': true,
        onChange: this.#dateFromChangeHandler,

      }
    );
  }

  #setDateToPicker() {
    this.#dateToPicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        'time_24hr': true,
        onChange: this.#dateToChangeHandler,
        minDate: this._state.dateFrom,
      }
    );
  }

  static parsePointToState(point, pointDestination, typeOffers) {
    return {
      ...point,
      destination: pointDestination,
      typeOffers,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state,
    };
    delete point.typeOffers;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    return point;
  }
}
