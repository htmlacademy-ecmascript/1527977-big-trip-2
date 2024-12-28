import AbstractView from '../framework/view/abstract-view.js';
import {MessageText} from '../const.js';

function createMessageTemplate(filterType) {
  return `<p class="trip-events__msg">${MessageText[filterType]}</p>`;
}

export default class Message extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createMessageTemplate(this.#filterType);
  }
}
