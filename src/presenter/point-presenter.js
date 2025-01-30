import { render, replace, remove } from '../framework/render';
import PointView from '../view/point-view';
import FormEditPointView from '../view/form-edit-point-view';
import { EditType, Mode, UpdateType, UserAction } from '../const';
import { isEscapeKey } from '../utils/utils';

export default class PointPresenter {
  #pointListContainer = null;
  #pointDestination = null;
  #typeOffers = [];
  #destinations = [];
  #offers = [];
  #point = null;
  #mode = Mode.DEFAULT;
  #pointComponent = null;
  #pointEditComponent = null;
  #editType = EditType.EDIT;
  #handleModeChange = null;
  #handleViewAction = null;
  #newPointPresenter = null;

  constructor({ pointDestination, newPointPresenter, typeOffers, onModeChange, onHandleViewAction, pointListContainer, destinations, offers }) {
    this.#pointListContainer = pointListContainer;
    this.#pointDestination = pointDestination;
    this.#typeOffers = typeOffers;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleModeChange = onModeChange;
    this.#handleViewAction = onHandleViewAction;
    this.#newPointPresenter = newPointPresenter;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevFormEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onOpenEditButtonClick: this.#onOpenEditButtonClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new FormEditPointView({
      point: this.#point,
      typeOffers: this.#typeOffers,
      pointDestination: this.#pointDestination,
      offers: this.#offers,
      destinations: this.#destinations,
      editType: this.#editType,
      onCloseEditButtonClick: this.#onCloseEditButtonClick,
      onSubmitButtonClick: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    if (!prevPointComponent || !prevFormEditComponent) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevFormEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevFormEditComponent);
  }

  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditPointToPoint();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replacePointToEditPoint() {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#handleModeChange();
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.EDITING;
  }

  #replaceEditPointToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if ((isEscapeKey(evt))) {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditPointToPoint();
    }
  };

  #onOpenEditButtonClick = () => {
    this.#newPointPresenter.destroy();
    this.#replacePointToEditPoint();
  };

  #onCloseEditButtonClick = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceEditPointToPoint();
  };

  #handleFormSubmit = (point) => {
    this.#handleViewAction(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #handleDeleteClick = (point) => {
    this.#handleViewAction(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleFavoriteClick = () => {
    this.#handleViewAction(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };
}
