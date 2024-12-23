
import Observable from '../framework/observable.js';
import {FILTER_TYPE_DEFAULT} from '../const.js';

export default class FilterModel extends Observable {
  #filter = FILTER_TYPE_DEFAULT;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
