import { render, RenderPosition, remove } from '../framework/render';
import FormEditPointView from '../view/form-edit-point-view';
import { UserAction, UpdateType, EditType } from '../const';
import { isEscapeKey } from '../utils/utils';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleViewAction = null;
  #handleDestroy = null;
  #editType = EditType.ADD;
  #destinationsModel = null;
  #offersModel = null;
  #pointAddComponent = null;

  constructor({pointListContainer, onHandleViewAction, destinationsModel, offersModel, onNewPointDestroy }) {
    this.#pointListContainer = pointListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleViewAction = onHandleViewAction;
    this.#handleDestroy = onNewPointDestroy;
  }

  init() {
    if(this.#pointAddComponent !== null) {
      return;
    }

    this.#pointAddComponent = new FormEditPointView({
      offers: this.#offersModel.offers,
      destinations: this.#destinationsModel.destinations,
      editType: this.#editType,
      onDeleteClick: this.#handleDeleteClick,
      onSubmitButtonClick: this.#handleFormSubmit,
    });
    render(this.#pointAddComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDounHaldler);
  }

  destroy() {
    if(this.#pointAddComponent === null) {
      return;
    }
    remove(this.#pointAddComponent);
    this.#pointAddComponent = null;
    document.removeEventListener('keydown', this.#escKeyDounHaldler);
    this.#handleDestroy();
  }

  setSaving() {
    this.#pointAddComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointAddComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointAddComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleViewAction(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDounHaldler = (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
