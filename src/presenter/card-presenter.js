import SiteMenuView from '../view/site-menu-view.js';
import PopupFilmView from '../view/popup-view.js';
import FilmCardView from '../view/film-card-view.js';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import HeaderProfileView from '../view/header-profile-view.js';
import FilmContainerView from '../view/film-view.js';
import LoadingView from '../view/loading-view.js';
import { render, RenderPosition } from '../utils/render.js';

export default class MovieListPresenter {
  #cardContainer = null;

  #cardComponent = new FilmContainerView();
  #sortComponent = new SortView();
  #loadComponent = new LoadingView();

  #cardFilms = [];

  constructor(cardContainer) {
    this.#cardContainer = cardContainer;
  }

  init = (cardFilms) => {
    this.#cardFilms = [...cardFilms];
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
  }

  #renderSort = () => {

  }

  #renderCard = () => {

  }

  #renderCards = () => {

  }

  #renderLoading = () => {

  }

  #renderShowMoreButton = () => {

  }

}
