import AbstractView from '../framework/view/abstract-view.js';
import { MessageText } from '../const.js';

function createMessageTemplate() {
  return `<p class="trip-events__msg">${MessageText.LIST_EMPTY__EVERYTHING}</p>`;
}

export default class Message extends AbstractView {
  get template() {
    return createMessageTemplate();
  }
}
