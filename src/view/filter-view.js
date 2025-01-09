import AbstractView from '../framework/view/abstract-view';
import { toUpperCaseFirstLetter } from '../utils/utils';
import { Attribute } from '../const';

function createFilterItemTemplate(filter, currentFilterType) {
  const { type, count } = filter;
  return (
    `<div class="trip-filters__filter">
    <input id="filter-${type}"
    class="trip-filters__filter-input  visually-hidden"
    type="radio"
    name="trip-filter"
    value="${type}"
    ${type === currentFilterType ? Attribute.CHECKED : ''}
    ${count === 0 ? Attribute.DISABLED : ''}

    >
    <label class="trip-filters__filter-label"
    for="filter-${type}">${toUpperCaseFirstLetter(type)}</label>
    </div>`
  );
}

function createFilterTemplate(filters, currentFilterType) {
  const filterItemsTemplate = filters.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');
  return (`
    <form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
          </form>
    `);
}

export default class FilterView extends AbstractView {
  #filters = null;
  #onFilterTypeChange = null;
  #currentFilterType = null;

  constructor({ filters, onFilterTypeChange, currentFilterType }) {
    super();
    this.#filters = filters;
    this.#onFilterTypeChange = onFilterTypeChange;
    this.#currentFilterType = currentFilterType;
    this.#setEventListener();
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilterType);
  }

  #setEventListener() {
    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  #filterChangeHandler = (evt) => {
    evt.preventDefault();
    const targetElement = evt.target.closest('input.trip-filters__filter-input');
    if(targetElement) {
      this.#onFilterTypeChange(targetElement.value);
    }
  };
}
