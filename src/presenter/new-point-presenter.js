import {remove, render, RenderPosition} from '../framework/render.js';
import FormEditPointView from '../view/form-edit-point-view.js';
import {nanoid} from 'nanoid';
import {EditMode, UserAction, UpdateType} from '../const.js';
import { isEscapeKey } from '../utils/utils.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #destinations = null;
  #offers = null;
  #addPointComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;

  constructor({
    pointListContainer,
    destinations,
    offers,
    onDataChange,
    onDestroy
  }) {
    this.#pointListContainer = pointListContainer;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#addPointComponent) {
      return;
    }
    this.#addPointComponent = new FormEditPointView({
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      editMode: EditMode.ADD,
      // onFormSubmit: this.#formSubmitHandler,
      // onFormResetCancel: this.#formResetCancelHandler
    });
    render(this.#addPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#addPointComponent) {
      return;
    }
    remove(this.#addPointComponent);
    this.#addPointComponent = null;
    this.#handleDestroy();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
