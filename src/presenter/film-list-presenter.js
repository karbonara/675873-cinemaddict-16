import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import FilmContainerView from '../view/film-view.js';
import LoadingView from '../view/loading-view.js';
import FilmPresenter from './film-presenter.js';
import FooterView from '../view/footer-view.js';
// import { updateItem } from '../utils/common.js';
import { remove, render, RenderPosition } from '../utils/render.js';
import { sortDateFilms, sortRatingFilms } from '../utils/task.js';
import { SortType, UpdateType, UserAction } from '../const.js';

const FILM_CARD_COUNT_PER_STEP = 8;

export default class FilmListPresenter {
  #cardContainer = null;
  #filmModel = null;
  #sortComponent = null;
  // #loadComponent = null;
  #cardsContainerComponent = new FilmContainerView();
  // #sortComponent = new SortView();
  #loadComponent = new LoadingView();
  #renderedCardCount = FILM_CARD_COUNT_PER_STEP;
  #showMoreButtonView = new ShowMoreButtonView();
  #footerStatistics = document.querySelector('.footer__statistics');
  // #cardFilms = [];
  #filmPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  // #sourcedBoardFilm = [];


  constructor(cardContainer, filmModel) {
    this.#cardContainer = cardContainer;
    this.#filmModel = filmModel;

    this.#filmModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#filmModel.films].sort(sortDateFilms);
      case SortType.RATING:
        return [...this.#filmModel.films].sort(sortRatingFilms);
    }

    return this.#filmModel.films;
  }

  // init = (cardFilms) => {
  //   this.#cardFilms = [...cardFilms];
  //   this.#sourcedBoardFilm = [...cardFilms];
  //   render(this.#cardContainer, this.#cardsContainerComponent, RenderPosition.BEFOREEND);
  //   this.#renderBoard();
  //   this.#renderCounter();
  //   this.#renderFilmList();
  // }

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
    // console.log(actionType, updateType, update);
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
    // console.log(updateType, data);
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

  // #handleFilmChange = (updatedFilm) => {
  // this.#cardFilms = updateItem(this.#cardFilms, updatedFilm);
  // this.#sourcedBoardFilm = updateItem(this.#sourcedBoardFilm, updatedFilm);
  // this.#filmPresenters.get(updatedFilm.id).init(updatedFilm);
  // }

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

    // this.#sortFilms(sortType);
    this.#currentSortType = sortType;

    this.#clearBoard({ resetRenderedTaskCount: true });
    this.#renderBoard();

    this.#clearFilmList();
    this.#renderBoard();
  }

  #renderCard = (card) => {
    // const filmPresenter = new FilmPresenter(this.#cardsContainerComponent, this.#handleFilmChange, this.#handleModeChange);
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

  #renderCards = (films) => {
    films.forEach((card) => this.#renderCard(card));
    this.#renderSort();
    this.#renderLoading();
  }

  // Отрисовка статистики фильмов
  // #renderCounter = () => {
  //   render(this.#footerStatistics, new FooterView(this.#cardFilms.length), RenderPosition.BEFOREEND);
  // }

  #renderCounter = () => {
    render(this.#footerStatistics, new FooterView(this.films.length), RenderPosition.BEFOREEND);
  }

  // Сортировка
  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#cardsContainerComponent.element.querySelector('.films-list'), this.#sortComponent, RenderPosition.BEFOREBEGIN);
  }

  // Заглушка
  // #renderLoading = () => {
  //   if (this.#cardFilms.length === 0) {
  //     render(this.#cardsContainerComponent.element.querySelector('.films-list'), this.#loadComponent, RenderPosition.BEFOREEND);
  //   }
  // }

  #renderLoading = () => {
    if (this.films.length === 0) {
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
    this.#renderCards(this.films.length, Math.min(this.films.length, FILM_CARD_COUNT_PER_STEP));

    if (this.films.length > FILM_CARD_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  }

  // Кнопка отрисовки новых фильмов (карточек)
  // #handleLoadMoreButtonClick = () => {
  //   this.#renderCards(this.#renderedCardCount, this.#renderedCardCount + FILM_CARD_COUNT_PER_STEP);
  //   this.#renderedCardCount += FILM_CARD_COUNT_PER_STEP;

  //   if (this.#renderedCardCount >= this.#cardFilms.length) {
  //     remove(this.#showMoreButtonView);
  //   }
  // }

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

  #clearFilmList = () => {
    this.#filmPresenters.forEach((presenter) => presenter.destroy());
    this.#filmPresenters.clear();
    this.#renderedCardCount = FILM_CARD_COUNT_PER_STEP;
    remove(this.#showMoreButtonView);
  }

  #clearBoard = ({ resetRenderedTaskCount = false, resetSortType = false } = {}) => {
    const filmCount = this.films.length;

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
    // if (this.#cardFilms.length === 0) {
    //   this.#renderLoading();

    //   return;
    // }
    const films = this.films;
    const filmCount = films.length;

    if (filmCount === 0) {
      this.#renderLoading();

      return;
    }
    this.#renderSort();
    // this.#renderCards();
    this.#renderCards(films.slice(0, Math.min(filmCount, this.#renderCounter)));

    if (filmCount > this.#renderCounter) {
      this.#renderLoadMoreButton();
    }
  }

}
