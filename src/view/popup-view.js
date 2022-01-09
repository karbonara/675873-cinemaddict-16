import { datePopup } from '../utils/task.js';
import AbstractView from './abstract-view.js';
const createPopupFilmTemplate = (card) => {
  const {
    title,
    description,
    img,
    genre,
    country,
    rating,
    director,
    actors,
    writers,
    colorRating,
    isWatchlist,
    isWatched,
    isFavorite,
    releaseDate,
    duration,
    originalTitle,
    ageRating,
  } = card;
  const watchlistClassName = isWatchlist
    ? 'film-details__control-button--watchlist film-details__control-button--active'
    : 'film-details__control-button--watchlist';
  const watchedClassName = isWatched
    ? 'film-details__control-button--watched film-details__control-button--active'
    : 'film-details__control-button--watched';
  const favoritesClassName = isFavorite
    ? 'film-details__control-button--favorite film-details__control-button--active'
    : 'film-details__control-button--favorite';

  const controlButton = `
  <button type="button" class="film-details__control-button ${watchlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
  <button type="button" class="film-details__control-button ${watchedClassName}" id="watched" name="watched">Already watched</button>
  <button type="button" class="film-details__control-button ${favoritesClassName}" id="favorite" name="favorite">Add to favorites</button>`;

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${img}" alt="${title}">
          <p class="film-details__age">${ageRating}</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${originalTitle}</p>
            </div>
            <div class="film-details__rating ${colorRating}">
              <p class="film-details__total-rating ">${rating}</p>
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${datePopup(releaseDate)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${genre}</span></td>
            </tr>
          </table>
          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>
      <section class="film-details__controls">
          ${controlButton}
      </section>
    </div>
    <div class="film-details__bottom-container">
    </div>
  </form>
</section>`;
};
export default class PopupFilmView extends AbstractView {
  #cards = null;
  constructor(cards) {
    super();
    this.#cards = cards;

  }

  get template() {

    return createPopupFilmTemplate(this.#cards);
  }

  closePopupHandler = (callback) => {
    this._callback.closePopupOnClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closePopupClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedClickHandler);
  }

  setWatchedListClickHandler = (callback) => {
    this._callback.watchedListClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchedListClickHandler);
  }

  #closePopupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closePopupOnClick(this.#cards);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  #watchedListClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedListClick();
  }

}
