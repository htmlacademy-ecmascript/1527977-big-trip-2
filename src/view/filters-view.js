import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate({type, isChecked, isDisabled}) {
  return (
    `<div class="trip-filters__filter">
        <input id="filter-${type}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" data-item="${type}"
         value="${type}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}/>
        <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
      </div>`
  );
}

function createFilterTemplate(items) {
  const filterItemsTemplate = items
    .map((item) => createFilterItemTemplate(item))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      </form>
      <button class="visually-hidden" type="submit">Accept filter</button>`
  );
}

export default class FiltersView extends AbstractView {
  #filters = null;
  #handleFilterTypeChange = null;

  constructor({
    items,
    onItemChange
  }) {
    super();
    this.#filters = items;
    this.#handleFilterTypeChange = onItemChange;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
