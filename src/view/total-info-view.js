import AbstractView from '../framework/view/abstract-view';

function createInfoTemplate(route, routeDates, routePrice) {
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${route}</h1>

              <p class="trip-info__dates">${routeDates}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${routePrice || 0}</span>
            </p>
          </section>`;
}

export default class TotalInfoView extends AbstractView {
  #route = null;
  #routeDates = null;
  #routePrice = 0;

  constructor({ route, routeDates, routePrice }) {
    super();
    this.#route = route;
    this.#routeDates = routeDates;
    this.#routePrice = routePrice;
  }

  get template() {
    return createInfoTemplate(this.#route, this.#routeDates, this.#routePrice);
  }
}
