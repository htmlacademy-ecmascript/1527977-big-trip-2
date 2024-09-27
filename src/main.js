import FiltersView from './view/filters-view.js';
import { render } from './render.js';
import ListPresenter from './presenter/list-presenter.js';

const siteMainHeader = document.querySelector('.page-header');
const siteHeaderElement = siteMainHeader.querySelector('.trip-controls__filters');
const siteContent = document.querySelector('.trip-events');
const listPresenter = new ListPresenter({eventContainer: siteContent});

render(new FiltersView(), siteHeaderElement);

listPresenter.init();
