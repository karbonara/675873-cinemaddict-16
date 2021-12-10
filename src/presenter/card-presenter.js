import SiteMenuView from '../view/site-menu-view.js';
import PopupFilmView from '../view/popup-view.js';
import FilmCardView from '../view/film-card-view.js';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import HeaderProfileView from '../view/header-profile-view.js';
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
  }

  #renderSort = () => {

  }

  // Создание карточки и попап (renderCard в main.js)
  #renderCard = (card) => {
    const cardComponent = new FilmCardView(card);
    const cardPopupComponent = new PopupFilmView(card);

    const body = document.body;
    const appendPopup = () => {
      cardListElement.appendChild(cardPopupComponent.element);
    };
    const removePopup = () => {
      cardListElement.removeChild(cardPopupComponent.element);
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        removePopup();
        body.classList.remove('hide-overflow');
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    cardComponent.cardClickHandler(() => {
      appendPopup();
      body.classList.add('hide-overflow');
      document.addEventListener('keydown', onEscKeyDown);
    });
    cardPopupComponent.popupCloseHandler(() => {
      document.removeEventListener('keydown', onEscKeyDown);
      removePopup();
      body.classList.remove('hide-overflow');
    });

    render(cardListElement, cardComponent, RenderPosition.BEFOREEND);
  }

  // Отрисовка N фильмов (карточек)
  #renderCards = () => {
    for (let i = 0; i < Math.min(cards.length, FILM_CARD_COUNT_PER_STEP); i++) {
      renderCard(filmListElement, cards[i]);
    }
  }

  // Заглушка
  #renderLoading = () => {
    if (cards.length === 0) {
      render(filmListElement, new LoadingView(), RenderPosition.BEFOREEND);
    }
  }

  // Кнопка отрисовки новых фильмов (карточек)
  #renderShowMoreButton = () => {
    if (cards.length > FILM_CARD_COUNT_PER_STEP) {
      let renderCount = FILM_CARD_COUNT_PER_STEP;
      render(filmMainElement, new ShowMoreButtonView(), RenderPosition.BEFOREEND);

      const loadButton = filmMainElement.querySelector('.films-list__show-more');
      loadButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        cards
          .slice(renderCount, renderCount + FILM_CARD_COUNT_PER_STEP)
          .forEach((card) => renderCard(filmListElement, card));

        renderCount += FILM_CARD_COUNT_PER_STEP;

        if (renderCount >= cards.length) {
          loadButton.remove();
        }
      });
    }
  }

}