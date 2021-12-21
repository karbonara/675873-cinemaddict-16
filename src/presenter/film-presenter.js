import PopupFilmView from '../view/popup-view.js';
import FilmCardView from '../view/film-card-view.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';
export default class FilmPresenter {
  #filmListContainer = null;
  #changeData = null;

  #filmComponent = null;
  #filmPopupComponent = null;
  // #cardsContainerComponent = new FilmContainerView();

  #film = null;

  constructor(filmListContainer, changeData) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
  }


  init = (film) => {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;
    const prevFilmPopupComponent = this.#filmPopupComponent;

    this.#filmComponent = new FilmCardView(film);
    this.#filmPopupComponent = new PopupFilmView(film);

    this.#filmComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmComponent.setWatchedListClickHandler(this.#handleWatchedListClick);


    this.#renderCard(film);

    if (prevFilmComponent === null || prevFilmPopupComponent === null) {
      render(this.#filmListContainer.element.querySelector('.films-list__container'), this.#filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#filmListContainer.element.contains(prevFilmComponent.element)) {
      replace(this.#filmListContainer, prevFilmComponent);
    }

    if (this.#filmListContainer.element.contains(prevFilmPopupComponent.element)) {
      replace(this.#filmPopupComponent, prevFilmPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmPopupComponent);
  }

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#filmPopupComponent);
  }

  #renderCard = (card) => {
    const filmComponent = new FilmCardView(card);
    const cardPopupComponent = new PopupFilmView(card);
    const body = document.body;
    const appendPopup = () => {
      replace(cardPopupComponent, filmComponent);
    };
    const removePopup = () => {
      remove(cardPopupComponent, filmComponent);
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
      body.classList.add('hide-overflow');
      appendPopup();
      document.addEventListener('keydown', onEscKeyDown());
    });
    cardPopupComponent.popupCloseHandler(() => {
      document.removeEventListener('keydown', onEscKeyDown());
      removePopup();
      body.classList.remove('hide-overflow');
    });
  }

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#film, isFavorite: !this.#film.isFavorite });
  }

  #handleWatchedClick = () => {
    this.#changeData({ ...this.#film, isWatched: !this.#film.isWatched });
  }

  #handleWatchedListClick = () => {
    this.#changeData({ ...this.#film, isWatchlist: !this.#film.isWatchlist });
  }

  // #handleFormSubmit = (film) => {
  //   this.#changeData(film);
  //   this.#replaceFormToCard();
  // }

}
