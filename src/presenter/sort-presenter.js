import { render, remove, replace } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import {SortTypes, SORT_TYPES_BLOCK} from '../const.js';

export default class SortPresenter {
  #eventContainer = null;
  #sortComponent = null;
  #sortTypes = [];
  #handleSortTypeChange = null;

  constructor({
    eventContainer,
    currentSortType,
    onSortTypeChange,
  }) {
    this.#eventContainer = eventContainer;
    this.#sortTypes = Object.values(SortTypes).map((type) => ({
      type,
      isChecked: type === currentSortType,
      isDisabled: SORT_TYPES_BLOCK.includes(type)
    }));
    this.#handleSortTypeChange = onSortTypeChange;
  }

  init() {
    const prevSortComponent = this.#sortComponent;
    this.#sortComponent = new SortView({
      items: this.#sortTypes,
      onItemChange: this.#handleSortTypeChange
    });
    if (prevSortComponent) {
      replace(this.#sortComponent, prevSortComponent);
      remove(prevSortComponent);
    } else {
      render(this.#sortComponent, this.#eventContainer);
    }
  }

  destroy() {
    remove(this.#sortComponent);
  }
}
