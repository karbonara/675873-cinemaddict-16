import PopupFilmView from '../view/popup-view.js';
import FilmCardView from '../view/film-card-view.js';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import FilmContainerView from '../view/film-view.js';
import LoadingView from '../view/loading-view.js';
import { render, RenderPosition } from '../utils/render.js';


const FILM_CARD_COUNT_PER_STEP = 8;

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

    render(this.#cardContainer, this.#cardComponent, RenderPosition.BEFOREEND);

    this.#renderCard();
  }

  // Сортировка
  #renderSort = () => {
    render(this.#cardContainer, this.#sortComponent, RenderPosition.BEFOREEND);
  }

  // Создание карточки и попапа (renderCard в main.js)
  #renderCard = (card) => {
    // const cardComponent = new FilmCardView(card);
    // const cardPopupComponent = new PopupFilmView(card);

    // const body = document.body;
    // const appendPopup = () => {
    //   cardListElement.appendChild(cardPopupComponent.element);
    // };
    // const removePopup = () => {
    //   cardListElement.removeChild(cardPopupComponent.element);
    // };
    // const onEscKeyDown = (evt) => {
    //   if (evt.key === 'Escape' || evt.key === 'Esc') {
    //     evt.preventDefault();
    //     removePopup();
    //     body.classList.remove('hide-overflow');
    //     document.removeEventListener('keydown', onEscKeyDown);
    //   }
    // };
    // cardComponent.cardClickHandler(() => {
    //   appendPopup();
    //   body.classList.add('hide-overflow');
    //   document.addEventListener('keydown', onEscKeyDown);
    // });
    // cardPopupComponent.popupCloseHandler(() => {
    //   document.removeEventListener('keydown', onEscKeyDown);
    //   removePopup();
    //   body.classList.remove('hide-overflow');
    // });

    this.#renderSort();
    render(this.#cardContainer, this.#cardFilms, RenderPosition.BEFOREEND);

  }

  // Отрисовка N фильмов (карточек)
  #renderCards = () => {
    for (let i = 0; i < Math.min(this.#cardFilms.length, FILM_CARD_COUNT_PER_STEP); i++) {
      renderCard(this.#cardComponent, this.#cardFilms[i]);
    }
    // this.#cardFilms
    //   .slice(from, to)
    //   .forEach((card) => this.#renderCard(card));
  }

  // Заглушка
  #renderLoading = () => {
    if (this.#cardFilms.length === 0) {
      render(this.#cardComponent, this.#loadComponent, RenderPosition.BEFOREEND);
    }
  }

  // Кнопка отрисовки новых фильмов (карточек)
  #renderShowMoreButton = () => {
    if (this.#cardFilms.length > FILM_CARD_COUNT_PER_STEP) {
      let renderCount = FILM_CARD_COUNT_PER_STEP;
      const loadButton = new ShowMoreButtonView();
      render(this.#cardContainer, loadButton, RenderPosition.BEFOREEND);
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
