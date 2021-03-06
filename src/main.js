import SiteMenuView from './view/site-menu-view.js';
import HeaderProfileView from './view/header-profile-view.js';
import FilmListPresenter from './presenter/film-list-presenter.js';
import { render, RenderPosition } from './utils/render.js';
import { generateCard } from './mock/card-movie.js';
import { generateFilter } from './mock/filter.js';

const FILM_CARD_COUNT = 15;
const cards = Array.from({ length: FILM_CARD_COUNT }, generateCard);
const filters = generateFilter(cards);
const siteMainElement = document.querySelector('.main');
const siteNavigationElement = document.querySelector('.header');

const filmListPresenter = new FilmListPresenter(siteMainElement);
render(siteMainElement, new SiteMenuView(filters), RenderPosition.BEFOREEND);
render(siteNavigationElement, new HeaderProfileView(), RenderPosition.BEFOREEND);
filmListPresenter.init(cards);
