import HeaderProfileView from './view/header-profile-view.js';
import FilmListPresenter from './presenter/film-list-presenter.js';
import { remove, render, RenderPosition } from './utils/render.js';
import FilmModel from './model/film-model.js';
import FilterModel from './view/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import StatisticsView from './view/statistic-view.js';
import CommentsModel from './model/comments-model.js';
import SiteMenuView from './view/site-menu-view.js';
import { MenuItem } from './const.js';
import ApiService from './api-service.js';

const AUTHORIZATION = 'Basic er883jdzbdq';
const END_POINT = 'https://16.ecmascript.pages.academy/cinemaddict';

const siteMainElement = document.querySelector('.main');
const siteNavigationElement = document.querySelector('.header');

const siteMenuComponent = new SiteMenuView();
const filmModel = new FilmModel(new ApiService(END_POINT, AUTHORIZATION));

const filterModel = new FilterModel();

// const filmComments = [];
const commentsModel = new CommentsModel(new ApiService(END_POINT, AUTHORIZATION));
// commentsModel.comments = filmComments;

const filmListPresenter = new FilmListPresenter(siteMainElement, filmModel, filterModel, commentsModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmModel);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.FILM_LISTS:
      remove(statisticsComponent);
      filterPresenter.init();
      filmListPresenter.init();
      break;
    case MenuItem.STATISTIC:
      filterPresenter.destroy();
      filmListPresenter.destroy();
      statisticsComponent = new StatisticsView();
      break;
  }
};

filterPresenter.init();
filmListPresenter.init();
commentsModel.init();

filmModel.init().finally(() => {
  render(siteNavigationElement, new HeaderProfileView(), RenderPosition.BEFOREEND);
  siteMenuComponent.setFilterTypeChangeHandler(handleSiteMenuClick);
});
