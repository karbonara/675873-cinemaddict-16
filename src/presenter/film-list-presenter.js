import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import FilmContainerView from '../view/film-view.js';
import LoadingView from '../view/loading-view.js';
import FilmPresenter from './film-presenter.js';
import { updateItem } from '../utils/common.js';
import { remove, render, RenderPosition } from '../utils/render.js';

const FILM_CARD_COUNT_PER_STEP = 8;

export default class FilmListPresenter {
  #cardContainer = null;
  #cardsContainerComponent = new FilmContainerView();
  #sortComponent = new SortView();
  #loadComponent = new LoadingView();
  #renderedCardCount = FILM_CARD_COUNT_PER_STEP;
  #showMoreButton = new ShowMoreButtonView();
  #cardFilms = [];

  #filmPresenter = new Map();

  constructor(cardContainer) {
    this.#cardContainer = cardContainer;
  }

  init = (cardFilms) => {
    this.#cardFilms = [...cardFilms];
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js

    render(this.#cardContainer, this.#cardsContainerComponent, RenderPosition.BEFOREEND);

    this.#renderCards();
  }

  #handleFilmChange = (updatedFilm) => {
    this.#cardFilms = updateItem(this.#cardFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  }

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  }

  #renderCard = (card) => {
    const filmPresenter = new FilmPresenter(this.#cardsContainerComponent, this.#handleFilmChange, this.#handleModeChange);
    filmPresenter.init(card);
    this.#filmPresenter.set(card.id, filmPresenter);
  }

  // Отрисовка N фильмов (карточек)
  #renderCards = (from, to) => {
    this.#cardFilms
      .slice(from, to)
      .forEach((card) => this.#renderCard(card));
    this.#renderShowMoreButton();
    this.#renderSort();
    this.#renderLoading();
  }

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedCardCount = FILM_CARD_COUNT_PER_STEP;
    remove(this.#showMoreButton);
  }

  // Сортировка
  #renderSort = () => {
    render(this.#cardsContainerComponent.element.querySelector('.films-list'), this.#sortComponent, RenderPosition.BEFOREBEGIN);
  }

  // Заглушка
  #renderLoading = () => {
    if (this.#cardFilms.length === 0) {
      render(this.#cardsContainerComponent.element.querySelector('.films-list'), this.#loadComponent, RenderPosition.BEFOREEND);
    }
  }

  // Кнопка отрисовки новых фильмов (карточек)
  #renderShowMoreButton = () => {
    if (this.#cardFilms.length > this.#renderedCardCount) {
      let renderCount = this.#renderedCardCount;
      const loadButton = new ShowMoreButtonView();
      render(this.#cardsContainerComponent.element.querySelector('.films-list'), loadButton, RenderPosition.BEFOREEND);
      loadButton.setClickHandler(() => {
        this.#cardFilms
          .slice(renderCount, renderCount + this.#renderedCardCount)
          .forEach((card) => this.#renderCard(this.#cardContainer, card));
        renderCount += this.#renderedCardCount;
        if (renderCount >= this.#cardFilms.length) {
          loadButton.element.remove();
        }
      });
    }
  }

}
