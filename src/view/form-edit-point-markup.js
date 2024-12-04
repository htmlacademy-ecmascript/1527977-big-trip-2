import { POINTS_TYPES, FormatsDate } from '../const.js';
import { toUpperCaseFirstLetter, toLowerCaseFirstLetter } from '../utils/utils.js';
import { formatDate } from '../utils/daijs.js';

const formatOfferTitle = (title) => title.split(' ').join('_');

const createPointTypeTemplate = (pointId, type) =>
  Array.isArray (POINTS_TYPES) ? POINTS_TYPES.map((pointType) => (
    `<div class="event__type-item">
      <input id="event-type-${toLowerCaseFirstLetter(pointType)}-${pointId}" class="event__type-input  visually-hidden" type="radio"
      name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${toLowerCaseFirstLetter(pointType)}"
      for="event-type-${toLowerCaseFirstLetter(pointType)}-${pointId}">${toUpperCaseFirstLetter(pointType)}</label>
    </div>`
  )).join('') : '';

const createOffresTemplate = (pointId, typeOffers, pointOffers = []) =>
  Array.isArray(typeOffers) && typeOffers.length ?
    `<section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${typeOffers.map((typeOffer) => (
    `<div class="event__offer-selector">
       <input class="event__offer-checkbox visually-hidden" id="event-offer-${formatOfferTitle(typeOffer.title)}-${pointId}"
        type="checkbox" name="event-offer-${formatOfferTitle(typeOffer.title)}" ${Array.isArray(pointOffers) && pointOffers.map((offer) => offer.id).includes(typeOffer.id) ? 'checked' : ''}
        data-offer-id="${formatOfferTitle(typeOffer.title)}-${pointId}">
        <label class="event__offer-label" for="event-offer-${typeOffer.title}-${pointId}">
          <span class="event__offer-title">${typeOffer.title}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${typeOffer.price}</span>
        </label>
      </div>`
  )).join('')}
    </div>
    </section>`
    : '';

const createDestinationTemplate = (pointDestination) => {
  if (!pointDestination) {
    return '';
  }
  const { description, pictures } = pointDestination || {};
  return (
    `<section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description || ''}</p>
      ${Array.isArray(pictures) && pictures.length ? (
      `<div class="event__photos-container">
          <div class="event__photos-tape">
            ${pictures.map((pic) => `<img class="event__photo" src="${pic.src}" alt="${pic.description}">`).join('')}
          </div>
        </div>`
    ) : ''}
    </section>`
  );
};

const createTypeWrapperTemplate = (pointId, type) =>
  `<div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-${pointId}">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${toUpperCaseFirstLetter(type)}.png" alt="${type} icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${pointId}" type="checkbox">
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
          ${createPointTypeTemplate(pointId, type)}
      </fieldset>
    </div>
  </div>`;

const createInputDestinationTemplate = (pointId, destinations, type, name) =>
  `<div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${pointId}">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${pointId}"
            type="text" name="event-destination" value=""${name || ''}" list="destination-list-${pointId}">
          <datalist id="destination-list-${pointId}">
            ${Array.isArray(destinations) && destinations.length ? (
    `${destinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}`
  ) : ''}
          </datalist>
        </div>`;

const createTimeEventTemplate = (pointId, dateFrom, dateTo) =>
  `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
    <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text"
      name="event-start-time" value="${formatDate(dateFrom, FormatsDate.DATE_TIME)}">
        &mdash;
    <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
    <input class="event__input  event__input--time" id="event-end-time-${pointId}" type="text"
      name="event-end-time" value="${formatDate(dateTo, FormatsDate.DATE_TIME)}">
  </div>`;

const createPriceTemplate = (pointId, basePrice) =>
  `<div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${pointId}">
        <span class="visually-hidden">Price</span>
                &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-${pointId}" type="text" name="event-price" value="${basePrice}">
    </div>`;

const createButtonsTemplate = (pointId) =>
  `<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">${pointId ? 'Delete' : 'Cancel'}</button>
    ${pointId ? (
    `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`
  ) : ''}`;

export const createFormTemplate = (pointId, type, destinations, name, dateFrom, dateTo, basePrice, typeOffers, pointOffers, pointDestination) =>
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${createTypeWrapperTemplate(pointId, type)}
        ${createInputDestinationTemplate(pointId, destinations, type, name)}
        ${createTimeEventTemplate(pointId, dateFrom, dateTo)}
        ${createPriceTemplate(pointId, basePrice)}
        ${createButtonsTemplate(pointId)}
      </header>
          <section class="event__details">
          ${createOffresTemplate(pointId, typeOffers, pointOffers)}
          ${createDestinationTemplate(pointDestination)}
        </section>
      </form>
    </li>`;
