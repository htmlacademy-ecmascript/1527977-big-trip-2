import { createElement } from '../render.js';
import { POINTS_TYPES, FormatsDate } from '../const.js';
import { toUpperCaseFirstLetter } from '../utils/utils.js';
import { formatDate } from '../utils/daijs.js';
const formatOfferTitle = (title) => title.split(' ').join('_');

const createFormEditPointTemplate = (point, destinations, offers) => {
  const pointDestination = destinations.find((destination) => destination.id === point.destination) || {};
  const typeOffers = offers.find((off) => off.type === point.type)?.offers || [];
  const pointOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));
  const { basePrice, dateFrom, dateTo, type } = point;
  const { name, description, pictures } = pointDestination || {};
  const pointId = point.id || 0;

  const pointTypeTemplate = `${POINTS_TYPES.map((pointType) => (
    `<div class="event__type-item">
                <input id="event-type-${pointType}-${pointId}" class="event__type-input  visually-hidden" type="radio"
                name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--${pointType}"
                for="event-type-${pointType}-${pointId}">${toUpperCaseFirstLetter(pointType)}</label>
              </div>`
  )).join('')}`;

  const offresTemplate = `${typeOffers.length ?
    `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
              ${typeOffers.map((typeOffer) => (
    `<div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${formatOfferTitle(typeOffer.title)}-${pointId}"
                  type="checkbox" name="event-offer-${formatOfferTitle(typeOffer.title)}" ${pointOffers.map((offer) => offer.id).includes(typeOffer.id) ? 'checked' : ''}>
                  <label class="event__offer-label" for="event-offer-${typeOffer.title}-${pointId}">
                    <span class="event__offer-title">${typeOffer.title}</span>
                      &plus;&euro;&nbsp;
                    <span class="event__offer-price">${typeOffer.price}</span>
                  </label>
                </div>`
  )).join('')}
                </div>
              </section>`
    : ''}`;

  const destinationTemplate = `${pointDestination ? (
    `<section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${description || ''}</p>
            ${pictures?.length ? (
      `<div class="event__photos-container">
                <div class="event__photos-tape">
                ${pictures?.map((pic) => `<img class="event__photo" src="${pic.src}" alt="${pic.description}">`)}
                </div>
              </div>`
    ) : ''}
            </section>`
  ) : ''}`;

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${pointId}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="${type} icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${pointId}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${pointTypeTemplate}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${pointId}">
              ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination"
            value="${name || ''}" list="destination-list-${pointId}">
          <datalist id="destination-list-${pointId}">
              ${destinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}
          </datalist>
        </div>

         <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text"
            name="event-start-time" value="${formatDate(dateFrom, FormatsDate.DATE_TIME)}">
              &mdash;
            <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${pointId}" type="text"
            name="event-end-time" value="${formatDate(dateTo, FormatsDate.DATE_TIME)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${pointId}">
              <span class="visually-hidden">Price</span>
                &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${pointId}" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${pointId ? 'Delete' : 'Cancel'}</button>
            ${pointId ? (
      `<button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>`
    ) : ''}
          </header>
          <section class="event__details">
          ${offresTemplate}
          ${destinationTemplate}
        </section>
      </form>
    </li>`
  );
};

export default class FormEditPointView {
  constructor({point, destinations, offers}) {
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
  }

  getTemplate() {
    return createFormEditPointTemplate(this.point, this.destinations, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
