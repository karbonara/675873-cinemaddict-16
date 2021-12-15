import PopupFilmView from '../view/popup-view.js';
import FilmCardView from '../view/film-card-view.js';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import FilmContainerView from '../view/film-view.js';
import LoadingView from '../view/loading-view.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';


const FILM_CARD_COUNT_PER_STEP = 8;

export default class MovieListPresenter {
  #cardContainer = null;

  #cardsContainerComponent = new FilmContainerView();
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

    render(this.#cardContainer, this.#cardsContainerComponent, RenderPosition.BEFOREEND);

    this.#renderCards();
  }

  // Сортировка
  #renderSort = () => {
    render(this.#cardsContainerComponent.element.querySelector('.films-list'), this.#sortComponent, RenderPosition.BEFOREBEGIN);
  }

  // Создание карточки и попапа (renderCard в main.js)
  #renderCard = (card) => {
    const filmComponent = new FilmCardView(card);
    const cardPopupComponent = new PopupFilmView(card);
    const body = document.body;

    const appendPopup = () => {
      replace(cardPopupComponent, filmComponent);
    };
    const removePopup = () => {
      remove(filmComponent, cardPopupComponent);
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        removePopup();
        body.classList.remove('hide-overflow');
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    filmComponent.cardClickHandler(() => {
      appendPopup();
      body.classList.add('hide-overflow');
      document.addEventListener('keydown', onEscKeyDown);
    });
    cardPopupComponent.popupCloseHandler(() => {
      document.removeEventListener('keydown', onEscKeyDown);
      removePopup();
      body.classList.remove('hide-overflow');
    });
    render(this.#cardsContainerComponent.element.querySelector('.films-list__container'), filmComponent, RenderPosition.BEFOREEND);
    this.#renderLoading();
  }

  // Отрисовка N фильмов (карточек)
  #renderCards = (from, to) => {
    this.#cardFilms
      .slice(from, to)
      .forEach((card) => this.#renderCard(card));
    this.#renderShowMoreButton();
    this.#renderSort();
  }

  // Заглушка
  #renderLoading = () => {
    if (this.#renderCards.length === 0) {
      render(this.#cardsContainerComponent.element.querySelector('.films-list'), this.#loadComponent, RenderPosition.BEFOREEND);
    }
    // render(this.#cardComponent, this.#loadComponent, RenderPosition.BEFOREEND);
  }

  // Кнопка отрисовки новых фильмов (карточек)
  #renderShowMoreButton = () => {
    if (this.#cardFilms.length > FILM_CARD_COUNT_PER_STEP) {
      let renderCount = FILM_CARD_COUNT_PER_STEP;
      const loadButton = new ShowMoreButtonView();
      render(this.#cardsContainerComponent.element.querySelector('.films-list'), loadButton, RenderPosition.BEFOREEND);
      loadButton.setClickHandler(() => {
        this.#cardFilms
          .slice(renderCount, renderCount + FILM_CARD_COUNT_PER_STEP)
          .forEach((card) => this.#renderCard(this.#cardContainer, card));

        renderCount += FILM_CARD_COUNT_PER_STEP;
        if (renderCount >= this.#cardFilms.length) {
          loadButton.element.remove();
        }
      });
    }
  }

}
