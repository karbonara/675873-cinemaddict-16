import HeaderProfileView from './view/header-profile-view.js';
import FilmListPresenter from './presenter/film-list-presenter.js';
import { render, RenderPosition } from './utils/render.js';
import { generateCard } from './mock/card-movie.js';
import FilmModel from './model/film-model.js';
import FilterModel from './view/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const FILM_CARD_COUNT = 15;
const films = Array.from({ length: FILM_CARD_COUNT }, generateCard);
const siteMainElement = document.querySelector('.main');
const siteNavigationElement = document.querySelector('.header');

const filmModel = new FilmModel();
filmModel.films = films;

const filterModel = new FilterModel();

render(siteNavigationElement, new HeaderProfileView(), RenderPosition.BEFOREEND);

const filmListPresenter = new FilmListPresenter(siteMainElement, filmModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmModel);

filterPresenter.init();
filmListPresenter.init();
