import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import FilmContainerView from '../view/film-view.js';
import LoadingView from '../view/loading-view.js';
import FilmPresenter from './film-presenter.js';
import FooterView from '../view/footer-view.js';
import NoFilmsView from '../view/no-film-view.js';
// import CommentsModel from '../model/comments-model.js';
import { remove, render, RenderPosition } from '../utils/render.js';
import { sortDateFilms, sortRatingFilms } from '../utils/task.js';
import { filter } from '../utils/filter.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';

const FILM_CARD_COUNT_PER_STEP = 8;

export default class FilmListPresenter {
  #cardContainer = null;
  #filmModel = null;
  #sortComponent = null;
  #filterModel = null;
  #noFilmsComponents = null;
  #commentsModel = [];
  #cardsContainerComponent = new FilmContainerView();
  #loadComponent = new LoadingView();
  #isLoading = true;
  #renderedCardCount = FILM_CARD_COUNT_PER_STEP;
  #showMoreButtonView = null;
  #footerStatistics = document.querySelector('.footer__statistics');
  #filmPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;
  constructor(cardContainer, filmModel, filterModel, commentsModel) {
    this.#cardContainer = cardContainer;
    this.#filmModel = filmModel;
    this.#filterModel = filterModel;
    this.#commentsModel = commentsModel;
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = this.#filmModel.films;
    const filteredFilms = filter[this.#filterType](films);
    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortDateFilms);
      case SortType.RATING:
        return filteredFilms.sort(sortRatingFilms);
    }
    return filteredFilms;
  }

  get filmsComments() {
    return this.#commentsModel.comments;
  }

  init = () => {
    render(this.#cardContainer, this.#cardsContainerComponent, RenderPosition.BEFOREEND);
    this.#renderBoard();
    this.#renderCounter();

    this.#filmModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  destroy = () => {
    this.#clearBoard({ resetRenderedTaskCount: true, resetSortType: true });

    remove(this.#cardsContainerComponent);
    remove(this.#cardContainer);
    this.#commentsModel.removeObserver(this.#handleModelEvent);
    this.#filmModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  #handleModeChange = () => {
    this.#filmPresenters.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = (actionType, updateType, update, comment) => {
    switch (actionType) {
      case UserAction.UPDATE_FILMCARD:
        this.#filmModel.updateCard(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#filmModel.addComment(updateType, update, comment);
        break;
      case UserAction.DELETE_COMMENT:
        this.#filmModel.deleteComment(updateType, update, comment);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH: {
        this.#filmPresenters.get(data.id).init(data);
        break;
      }
      case UpdateType.MINOR: {
        this.#clearBoard();
        this.#renderBoard();
        break;
      }
      case UpdateType.MAJOR: {
        this.#clearBoard({ resetRenderedFilmCount: true, resetSortType: true });
        this.#renderBoard();
        break;
      }
      case UpdateType.INIT: {
        this.#isLoading = false;
        remove(this.#loadComponent);
        this.#renderBoard();
        break;
      }
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({ resetRenderedTaskCount: true });
    this.#renderBoard();
  }

  #renderCard = (card) => {
    const filmPresenter = new FilmPresenter(this.#cardsContainerComponent, this.#handleViewAction, this.#handleModeChange, this.filmsComments);
    filmPresenter.init(card);
    this.#filmPresenters.set(card.id, filmPresenter);
  }

  // Отрисовка N фильмов (карточек)
  #renderCards = () => {
    this.films.forEach((card) => this.#renderCard(card));
  }

  // Отрисовка статистики фильмов
  #renderCounter = () => {
    render(this.#footerStatistics, new FooterView(this.films.length), RenderPosition.BEFOREEND);
  }

  // Сортировка
  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);

    render(this.#cardsContainerComponent.element.querySelector('.films-list'), this.#sortComponent, RenderPosition.BEFOREBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  // Заглушка
  #renderLoading = () => {
    if (this.films.length === 0) {
      render(this.#cardsContainerComponent.element.querySelector('.films-list'), this.#loadComponent, RenderPosition.BEFOREEND);
    }
  }

  #renderNoFilms = () => {
    this.#noFilmsComponents = new NoFilmsView(this.#filterType);
    render(this.#cardsContainerComponent, this.#noFilmsComponents, RenderPosition.AFTERBEGIN);
  }

  #renderLoadMoreButton = () => {
    this.#showMoreButtonView = new ShowMoreButtonView();
    this.#showMoreButtonView.setClickHandler(this.#handleLoadMoreButtonClick);
    render(this.#cardsContainerComponent.element.querySelector('.films-list'), this.#showMoreButtonView, RenderPosition.BEFOREEND);
  }

  // Кнопка отрисовки новых фильмов (карточек)
  #handleLoadMoreButtonClick = () => {
    const filmCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderedCardCount + FILM_CARD_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedCardCount, newRenderedFilmCount);

    this.#renderCards(films);
    this.#renderedCardCount = newRenderedFilmCount;

    if (this.#renderedCardCount >= filmCount) {
      remove(this.#showMoreButtonView);
    }
  }

  #clearBoard = ({ resetRenderedTaskCount = false, resetSortType = false } = {}) => {
    const filmCount = this.films.length;

    this.#filmPresenters.forEach((presenter) => presenter.destroy());
    this.#filmPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadComponent);
    remove(this.#showMoreButtonView);

    // if (this.#loadComponent) {
    //   remove(this.#loadComponent);
    // }

    if (this.#noFilmsComponents) {
      remove(this.#noFilmsComponents);
    }

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
    const films = this.films;
    const filmCount = films.length;

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (filmCount === 0) {
      this.#renderNoFilms();

      return;
    }
    this.#renderSort();
    this.#renderCards();
    this.#renderLoadMoreButton();
  }

}
