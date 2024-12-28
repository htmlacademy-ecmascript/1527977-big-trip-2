import AbstractView from '../framework/view/abstract-view.js';
import { toUpperCaseFirstLetter } from '../utils/utils.js';
import {SortTypes, SORT_TYPES_BLOCK} from '../const.js';

const sortTypeTemplate = (currentSortType) =>
  `${Object.values(SortTypes).map((sortType) => (
    `<div class="trip-sort__item trip-sort__item--${sortType} ${currentSortType === sortType ? 'board__sort-item--active' : ''}">
      <input id="sort-${sortType}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort"
      value="sort-${sortType}" ${SORT_TYPES_BLOCK.includes(sortType) ? 'disabled' : ''}
      data-sort-type="${sortType}>
      <label class="trip-sort__btn" for="sort-${sortType}">${toUpperCaseFirstLetter(sortType)}</label>
    </div>`
  )).join('')}`;

function createSortTemplate(currentSortType) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortTypeTemplate(currentSortType)}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange;

  constructor({
    currentSortType,
    onSortTypeChange
  }) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    const targetElement = evt.target.closest('.trip-sort__input');
    if (!targetElement){
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(targetElement.dataset.sortType);
  };
}
