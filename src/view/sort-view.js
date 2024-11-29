import AbstractView from '../framework/view/abstract-view.js';
import { SortTypes, SORT_TYPES_BLOCK } from '../const.js';
import { toUpperCaseFirstLetter } from '../utils/utils.js';

const sortTypeTemplate = `${Object.values(SortTypes).map((sortType) => (
  `<div class="trip-sort__item trip-sort__item--${sortType}">
    <input id="sort-${sortType}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort"
    value="sort-${sortType}" ${SORT_TYPES_BLOCK.includes(sortType) ? 'disabled' : ''}
    data-sort-type="${sortType}>
    <label class="trip-sort__btn" for="sort-${sortType}">${toUpperCaseFirstLetter(sortType)}</label>
  </div>`
)).join('')}`;

function createSortTemplate() {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortTypeTemplate}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #handleSortTypeChange;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
