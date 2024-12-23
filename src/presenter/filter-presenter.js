import {render, replace, remove} from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import {filter} from '../utils/filter.js';
import {FilterTypes, UpdateType} from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointModel = null;
  #filterComponent = null;

  constructor({filterContainer, filterModel, pointModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointModel.points;
    return Object.values(FilterTypes).map((type) => ({
      type,
      isChecked: type === this.#filterModel.filter,
      isDisabled: !filter[type](points).length
    }));
  }

  init() {
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new FiltersView({
      filters: this.filters,
      onFilterTypeChange: this.#handleFilterTypeChange
    });
    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }
    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.set(UpdateType.MAJOR, filterType);
  };
}
