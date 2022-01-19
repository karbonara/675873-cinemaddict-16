import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import FilmContainerView from '../view/film-view.js';
import LoadingView from '../view/loading-view.js';
import FilmPresenter from './film-presenter.js';
import FooterView from '../view/footer-view.js';
import { remove, render, RenderPosition } from '../utils/render.js';
import { sortDateFilms, sortRatingFilms } from '../utils/task.js';
import { SortType, UpdateType, UserAction } from '../const.js';

const FILM_CARD_COUNT_PER_STEP = 8;

export default class FilmListPresenter {
  #cardContainer = null;
  #filmModel = null;
  #sortComponent = null;
  #cardsContainerComponent = new FilmContainerView();
  #loadComponent = new LoadingView();
  #renderedCardCount = FILM_CARD_COUNT_PER_STEP;
  #showMoreButtonView = new ShowMoreButtonView();
  #footerStatistics = document.querySelector('.footer__statistics');
  #filmPresenters = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(cardContainer, filmModel) {
    this.#cardContainer = cardContainer;
    this.#filmModel = filmModel;

    this.#filmModel.addObserver(this.#handleModelEvent);
  }

  get cards() {
    // const cards = this.#filmModel.cards;
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#filmModel.cards].sort(sortDateFilms);
      case SortType.RATING:
        return [...this.#filmModel.cards].sort(sortRatingFilms);
    }

    return this.#filmModel.cards;
  }

  init = () => {
    render(this.#cardContainer, this.#cardsContainerComponent, RenderPosition.BEFOREEND);
    this.#renderBoard();
    this.#renderCounter();
    this.#renderFilmList();
  }

  #handleModeChange = () => {
    this.#filmPresenters.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILMCARD:
        this.#filmModel.updateCard(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#filmModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#filmModel.deleteComment(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetRenderedFilmCount: true });
        this.#renderBoard();
        break;
    }
  }

  // #sortFilms = (sortType) => {
  //   switch (sortType) {
  //     case SortType.DATE:
  //       this.#cardFilms.sort(sortDateFilms);
  //       break;
  //     case SortType.RATING:
  //       this.#cardFilms.sort(sortRatingFilms);
  //       break;
  //     default:
  //       this.#cardFilms = [...this.#sourcedBoardFilm];
  //   }

  //   this.#currentSortType = sortType;
  // }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearBoard({ resetRenderedTaskCount: true });
    this.#renderBoard();

    this.#clearFilmList();
    this.#renderBoard();
  }

  #renderCard = (card) => {
    const filmPresenter = new FilmPresenter(this.#cardsContainerComponent, this.#handleViewAction, this.#handleModeChange);
    filmPresenter.init(card);
    this.#filmPresenters.set(card.id, filmPresenter);
  }

  // Отрисовка N фильмов (карточек)
  // #renderCards = (from, to) => {
  //   this.#cardFilms
  //     .slice(from, to)
  //     .forEach((card) => this.#renderCard(card));
  //   this.#renderSort();
  //   this.#renderLoading();
  // }

  #renderCards = (cards) => {
    // cards = [{ ...cards }];
    this.#filmModel.cards.forEach((card) => this.#renderCard(card));
    this.#renderLoading();
  }


  // Отрисовка статистики фильмов
  #renderCounter = () => {
    render(this.#footerStatistics, new FooterView(this.cards.length), RenderPosition.BEFOREEND);
  }

  // Сортировка
  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#cardsContainerComponent.element.querySelector('.films-list'), this.#sortComponent, RenderPosition.BEFOREBEGIN);
  }

  // Заглушка
  #renderLoading = () => {
    if (this.cards.length === 0) {
      render(this.#cardsContainerComponent.element.querySelector('.films-list'), this.#loadComponent, RenderPosition.BEFOREEND);
    }
  }

  #renderLoadMoreButton = () => {
    this.#showMoreButtonView = new ShowMoreButtonView();
    this.#showMoreButtonView.setClickHandler(this.#handleLoadMoreButtonClick);
    render(this.#cardsContainerComponent.element.querySelector('.films-list'), this.#showMoreButtonView, RenderPosition.BEFOREEND);
  }

  // #renderFilmList = () => {
  //   this.#renderCards(this.#cardFilms.length, Math.min(this.#cardFilms.length, FILM_CARD_COUNT_PER_STEP));

  //   if (this.#cardFilms.length > FILM_CARD_COUNT_PER_STEP) {
  //     this.#renderLoadMoreButton();
  //   }
  // }

  #renderFilmList = () => {
    this.#renderCards(this.cards.length, Math.min(this.cards.length, FILM_CARD_COUNT_PER_STEP));

    if (this.cards.length > FILM_CARD_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  }

  // Кнопка отрисовки новых фильмов (карточек)
  #handleLoadMoreButtonClick = () => {
    const filmCount = this.cards.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderedCardCount + FILM_CARD_COUNT_PER_STEP);
    const cards = this.cards.slice(this.#renderedCardCount, newRenderedFilmCount);

    this.#renderCards(cards);
    this.#renderedCardCount = newRenderedFilmCount;

    if (this.#renderedCardCount >= filmCount) {
      remove(this.#showMoreButtonView);
    }
  }

  #clearFilmList = () => {
    this.#filmPresenters.forEach((presenter) => presenter.destroy());
    this.#filmPresenters.clear();
    this.#renderedCardCount = FILM_CARD_COUNT_PER_STEP;
    remove(this.#showMoreButtonView);
  }

  #clearBoard = ({ resetRenderedTaskCount = false, resetSortType = false } = {}) => {
    const filmCount = this.cards.length;

    this.#filmPresenters.forEach((presenter) => presenter.destroy());
    this.#filmPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadComponent);
    remove(this.#showMoreButtonView);

    if (resetRenderedTaskCount) {
      this.#renderedCardCount = FILM_CARD_COUNT_PER_STEP;
    } else {
      this.#renderedCardCount = Math.min(filmCount, this.#renderedCardCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderBoard = () => {
    const cards = this.cards;
    const filmCount = cards.length;

    if (filmCount === 0) {
      this.#renderLoading();

      return;
    }
    this.#renderSort();
    // this.#renderCards(cards.slice(0, Math.min(filmCount, this.#renderCounter)));

    if (filmCount > this.#renderCounter) {
      this.#renderLoadMoreButton();
    }
  }

}
