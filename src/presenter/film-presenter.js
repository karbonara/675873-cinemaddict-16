import PopupFilmView from '../view/popup-view.js';
import FilmCardView from '../view/film-card-view.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class FilmPresenter {
  #filmListContainer = null;
  #changeData = null;
  #changeMode = null;

  #footer = document.querySelector('footer');

  #filmComponent = null;
  #filmPopupComponent = null;

  #film = null;
  #mode = Mode.DEFAULT

  constructor(filmListContainer, changeData, changeMode) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;
    const prevFilmPopupComponent = this.#filmPopupComponent;

    this.#filmComponent = new FilmCardView(film);
    this.#filmPopupComponent = new PopupFilmView(film);

    this.#filmComponent.openPopupHandler(this.#handleRenderPopupClick);
    this.#filmPopupComponent.closePopupHandler(this.#handleRemovePopupClick);

    this.#filmComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmComponent.setWatchedListClickHandler(this.#handleWatchedListClick);

    this.#filmPopupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmPopupComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmPopupComponent.setWatchedListClickHandler(this.#handleWatchedListClick);

    if (prevFilmComponent === null || prevFilmPopupComponent === null) {
      render(this.#filmListContainer.element.querySelector('.films-list__container'), this.#filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmComponent, prevFilmComponent);
      replace(this.#filmPopupComponent, prevFilmPopupComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#filmComponent, prevFilmComponent);
      replace(this.#filmPopupComponent, prevFilmPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmPopupComponent);
  }

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#filmPopupComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#removePopup();
    }
  }

  #renderPopup = () => {
    render(this.#footer, this.#filmPopupComponent, RenderPosition.BEFOREEND);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  }

  #removePopup = () => {
    remove(this.#filmPopupComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    document.body.classList.remove('hide-overflow');
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removePopup();
      document.body.classList.remove('hide-overflow');
    }
  }

  #handleRenderPopupClick = () => {
    this.#renderPopup();
  }

  #handleRemovePopupClick = (film) => {
    this.#changeData(film);
    this.#removePopup();
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

}
