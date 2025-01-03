import {render, RenderPosition} from '../framework/render.js';
import ButtonNewEventView from '../view/button-new-event-view.js';

export default class ButtonNewEventPresenter {
  #headerContainer = null;
  #buttonNewEvent = null;
  #addPointButtonClickHandler = null;

  constructor({headerContainer}) {
    this.#headerContainer = headerContainer;
  }

  init({onAddPointButtonClick}) {
    this.#addPointButtonClickHandler = onAddPointButtonClick;
    this.#renderAddPointButton();
  }

  disableButton() {
    this.#buttonNewEvent.setDisabled(true);
  }

  enableButton() {
    this.#buttonNewEvent.setDisabled(false);
  }

  #renderAddPointButton() {
    this.#buttonNewEvent = new ButtonNewEventView({
      onClick: this.#newButtonClickHandler
    });
    render(this.#buttonNewEvent, this.#headerContainer, RenderPosition.BEFOREEND);
  }

  #newButtonClickHandler = () => {
    this.#addPointButtonClickHandler();
  };
}
