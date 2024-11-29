import AbstractView from '../framework/view/abstract-view.js';

function createMessageTemplate(message) {
  return `<p class="trip-events__msg">${message}</p>`;
}

export default class Message extends AbstractView {
  get template() {
    return createMessageTemplate();
  }
}
