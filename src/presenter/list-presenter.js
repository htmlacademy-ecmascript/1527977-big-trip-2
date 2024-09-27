import ListView from '../view/list-view.js';
import FormAddPointView from '../view/form-add-point-view.js'; // first in list
import FormEditPointView from '../view/form-edit-point-view.js';
import PointView from '../view/point-view.js'; //3 example
import SortView from '../view/sort-view.js';
import {render, RenderPosition} from '../render.js';

export default class ListPresenter {
  sortComponent = new SortView();
  listComponent = new ListView();
  constructor({eventContainer}) {
    this.eventContainer = eventContainer;
  }

  init() {
    render(this.listComponent, this.eventContainer);
    render(this.sortComponent, this.eventContainer, RenderPosition.AFTERBEGIN);
    render(new FormAddPointView(), this.listComponent.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.listComponent.getElement());
    }
    render(new FormEditPointView(), this.listComponent.getElement());
  }
}
