import { render } from './render.js';
import PointModel from './model/point-model.js';
import ListPresenter from './presenter/list-presenter.js';
import FiltersView from './view/filters-view.js';

const siteMainHeader = document.querySelector('.page-header');
const siteHeaderElement = siteMainHeader.querySelector('.trip-controls__filters');
const siteContent = document.querySelector('.trip-events');

render(new FiltersView(), siteHeaderElement);

const pointModel = new PointModel();
pointModel.init();

const listPresenter = new ListPresenter({
  eventContainer: siteContent,
  pointModel: pointModel,
});
listPresenter.init();
