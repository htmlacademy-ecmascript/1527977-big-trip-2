import PointModel from './model/point-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

import ListPresenter from './presenter/list-presenter.js';

const siteContent = document.querySelector('.trip-events');
const siteMainHeader = document.querySelector('.page-header');
const siteHeaderElement = siteMainHeader.querySelector('.trip-controls__filters');

const pointModel = new PointModel();
pointModel.init();
const destinationsModel = new DestinationsModel();
destinationsModel.init();
const offersModel = new OffersModel();
offersModel.init();

const listPresenter = new ListPresenter({
  headerContainer: siteHeaderElement,
  eventContainer: siteContent,
  pointModel: pointModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel
});
listPresenter.init();
