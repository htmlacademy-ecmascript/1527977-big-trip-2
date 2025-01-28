import AbstractView from '../framework/view/abstract-view';

function createNewPointButtonTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class ButtonNewEventView extends AbstractView {
  #handleButtonClick = null;

  constructor({onButtonClick}) {
    super();
    this.#handleButtonClick = onButtonClick;
    this.#setEventListeners();
  }

  get template() {
    return createNewPointButtonTemplate();
  }

  #setEventListeners() {
    this.element.addEventListener('click', this.#buttonClickHandler);
  }

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleButtonClick();
  };

  disableButton() {
    this.element.disabled = true;
  }

  enableButton() {
    this.element.disabled = false;
  }
}
