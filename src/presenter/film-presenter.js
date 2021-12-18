import PopupFilmView from '../view/popup-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmContainerView from '../view/film-view.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';
export default class FilmPresenter {
  #filmListContainer = null;

  #filmComponent = null;
  #filmPopupComponent = null;
  #cardsContainerComponent = new FilmContainerView();

  #film = null;

  constructor(filmListContainer) {
    this.#filmListContainer = filmListContainer;
  }


  init = (film) => {
    this.#film = film;

    // const prevFilmComponent = this.#filmComponent;
    // const prevFilmPopupComponent = this.#filmPopupComponent;

    // this.#filmComponent = new FilmCardView(film);
    // this.#filmPopupComponent = new PopupFilmView(film);

    render(this.#filmListContainer, this.#filmComponent, RenderPosition.BEFOREEND);
    this.#renderCard();
  }

  // #onEscKeyDown = (evt) => {
  //   if (evt.key === 'Escape' || evt.key === 'Esc') {
  //     evt.preventDefault();
  //     removePopup();
  //     body.classList.remove('hide-overflow');
  //     document.removeEventListener('keydown', this.#onEscKeyDown);
  //   }
  // };

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
      document.addEventListener('keydown', onEscKeyDown);
    });
    cardPopupComponent.popupCloseHandler(() => {
      document.removeEventListener('keydown', onEscKeyDown);
      removePopup();
      body.classList.remove('hide-overflow');
    });
    render(this.#cardsContainerComponent.element.querySelector('.films-list__container'), filmComponent, RenderPosition.BEFOREEND);
  }

}
