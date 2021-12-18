import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import FilmContainerView from '../view/film-view.js';
import LoadingView from '../view/loading-view.js';
import FilmPresenter from './film-presenter.js';
import { render, RenderPosition } from '../utils/render.js';

const FILM_CARD_COUNT_PER_STEP = 8;

export default class FilmListPresenter {
  #cardContainer = null;
  #cardsContainerComponent = new FilmContainerView();
  #sortComponent = new SortView();
  #loadComponent = new LoadingView();
  // #showMoreButtonView = new ShowMoreButtonView();
  #renderedCardCount = FILM_CARD_COUNT_PER_STEP;
  #cardFilms = [];

  constructor(cardContainer) {
    this.#cardContainer = cardContainer;
  }

  init = (cardFilms) => {
    this.#cardFilms = [...cardFilms];
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js

    render(this.#cardContainer, this.#cardsContainerComponent, RenderPosition.BEFOREEND);

    this.#renderCard();
  }

  #renderCard = (card) => {
    const filmPresenter = new FilmPresenter(this.#cardsContainerComponent);
    filmPresenter.init(card);
  }

  // Отрисовка N фильмов (карточек)
  #renderCards = (from, to) => {
    this.#cardFilms
      .slice(from, to)
      .forEach((card) => this.#renderCard(card));
    this.#renderShowMoreButton();
    this.#renderSort();
  }

  // Сортировка
  #renderSort = () => {
    render(this.#cardsContainerComponent.element.querySelector('.films-list'), this.#sortComponent, RenderPosition.BEFOREBEGIN);
  }

  // Заглушка
  #renderLoading = () => {
    if (this.#renderCards.length === 0) {
      render(this.#cardsContainerComponent.element.querySelector('.films-list'), this.#loadComponent, RenderPosition.BEFOREEND);
    }
  }

  // Кнопка отрисовки новых фильмов (карточек)
  // #handleShowMoreButtonClick = () => {
  //   this.#renderCards(this.#renderedCardCount, this.renderedCardCount + FILM_CARD_COUNT_PER_STEP);
  //   this.renderedCardCount += FILM_CARD_COUNT_PER_STEP;
  // }
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