import AbstractView from '../framework/view/abstract-view';
import { SortType, Attribute } from '../const';
import { toUpperCaseFirstLetter } from '../utils/utils';

function createSortItemsTemplate(sortItems, currentSort) {
  return Object.values(sortItems).reduce((acc, sort) => {
    const labelSort = `<label class="trip-sort__btn" for="sort-${sort.name}">${toUpperCaseFirstLetter(sort.name)}</label>`;
    const sortItem = `<div class="trip-sort__item  trip-sort__item--${sort.name}">
        <input id="sort-${sort.name}"
          class="trip-sort__input  visually-hidden" data-id="${sort.name}"
          type="radio" name="trip-sort" value="sort-${sort.name}"
          ${sort.isEnabled ? '' : Attribute.DISABLED}
          ${sort.name === currentSort ? Attribute.CHECKED : ''}
        >
        ${labelSort}
      </div>`;
    return acc + sortItem;
  }, '');
}

function createSortTemplate(currentSort) {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${createSortItemsTemplate(SortType, currentSort)}

    </form>`;
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSort = null;

  constructor({ currentSort, onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSort = currentSort;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSort);
  }

  #sortTypeChangeHandler = (evt) => {
    const sortType = evt.target.dataset.id;

    this.#handleSortTypeChange(sortType);
  };
}

