import { createElement } from '../render';
import { FILTER_TYPES } from '../const.js';
import { toUpperCaseFirstLetter } from '../utils/utils.js';

const filterTypeTemplate = `${FILTER_TYPES.map((filterType) => (
  `<div class="trip-filters__filter">
    <input id="filter-${filterType}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter"
    value="${filterType}">
    <label class="trip-filters__filter-label" for="filter-${filterType}">${toUpperCaseFirstLetter(filterType)}</label>
  </div>`
)).join('')}`;

function createFiltersTemplate() {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterTypeTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FiltersView {
  getTemplate() {
    return createFiltersTemplate();
  }

  getElement(){
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement(){
    this.element = null;
  }
}
