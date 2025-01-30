import BoardPresenter from './presenter/board-presenter';
import PointsModel from './model/points-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import FiltersModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import ButtonNewEventView from './view/button-new-event-view';
import PointApiService from './service/points-api-service';
import TotalInfoPresenter from './presenter/total-info-presenter';
import { render, RenderPosition } from './framework/render';
import { END_POINT, AUTHORIZATION } from './const';

const infoElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-body');
const siteHeaderElement = siteMainElement.querySelector('.trip-controls__filters');
const siteSortElement = siteMainElement.querySelector('.trip-events');
const pointApiService = new PointApiService(END_POINT, AUTHORIZATION);
const offersModel = new OffersModel({ offersApiService: pointApiService });
const destinationsModel = new DestinationsModel({ destinationsApiService: pointApiService });
const pointsModel = new PointsModel({
  pointApiService: pointApiService,
  offersModel: offersModel,
  destinationsModel: destinationsModel,
});
const filterModel = new FiltersModel();

const boardPresenter = new BoardPresenter({
  boardContainer: siteSortElement,
  filterModel: filterModel,
  pointsModel: pointsModel,
  offersModel: offersModel,
  destinationsModel: destinationsModel,
  isCreatingPoint: false,
  onNewPointDestroy: handleNewPointFormClose
});

const newPointButtonComponent = new ButtonNewEventView({
  onButtonClick: handleNewPointButtonClick
});

const totalInfoPresenter = new TotalInfoPresenter({
  headerContainer: infoElement,
  pointsModel: pointsModel,
  offersModel: offersModel,
  destinationsModel: destinationsModel
});

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.disableButton();
}

function handleNewPointFormClose() {
  newPointButtonComponent.enableButton();
}

const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement,
  filterModel: filterModel,
  pointsModel: pointsModel
});

boardPresenter.init();
filterPresenter.init();
render(newPointButtonComponent, infoElement, RenderPosition.BEFOREEND);
pointsModel.init();
totalInfoPresenter.init();
