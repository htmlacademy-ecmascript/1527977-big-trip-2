import AbstractView from '../framework/view/abstract-view';


function createEmptyListPointTemplate(message) {
  return `<p class="trip-events__msg">${message}</p>`;
}

export default class MessageView extends AbstractView {
  #message = null;

  constructor({message}) {

    super();
    this.#message = message;
  }

  get template() {
    return createEmptyListPointTemplate(this.#message);
  }
}

