import PointModel from './model/point-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteContent = document.querySelector('.trip-events');
const siteMainHeader = document.querySelector('.page-header');
const siteHeaderElement = siteMainHeader.querySelector('.trip-main');
const siteFilterContainer = siteMainHeader.querySelector('.trip-controls__filters');

const pointModel = new PointModel();
pointModel.init();
const destinationsModel = new DestinationsModel();
destinationsModel.init();
const offersModel = new OffersModel();
offersModel.init();
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: siteFilterContainer,
  filterModel: filterModel,
  pointModel: pointModel,
});

const boardPresenter = new BoardPresenter({
  headerContainer: siteHeaderElement,
  eventContainer: siteContent,
  pointModel: pointModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel,
  filterModel: filterModel,
});

filterPresenter.init();
boardPresenter.init();
