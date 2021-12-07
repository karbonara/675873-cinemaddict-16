import SiteMenuView from './view/site-menu-view.js';
import PopupFilmView from './view/popup-view.js';
import FilmCardView from './view/film-card-view.js';
import FilterSortView from './view/filter-menu-view.js';
import SortView from './view/sort-view.js';
import ShowMoreButtonView from './view/show-more-view.js';
import HeaderProfileView from './view/header-profile-view.js';
import FilmContainerView from './view/film-view.js';
import LoadingView from './view/loading-view.js';
import { render, RenderPosition } from './utils/render.js';
import { generateCard } from './mock/card-movie.js';
import { generateFilter } from './mock/filter.js';

const FILM_CARD_COUNT = 15;
const FILM_CARD_COUNT_PER_STEP = 8;
const cards = Array.from({ length: FILM_CARD_COUNT }, generateCard);
const filters = generateFilter(cards);

const siteMainElement = document.querySelector('.main');
const siteNavigationElement = document.querySelector('.header');

render(siteMainElement, new SiteMenuView(filters), RenderPosition.BEFOREEND);

render(siteNavigationElement, new HeaderProfileView(), RenderPosition.BEFOREEND);

const filterSortComponent = new FilterSortView();
render(siteMainElement, filterSortComponent, RenderPosition.BEFOREEND);
render(filterSortComponent, new SortView(), RenderPosition.BEFOREEND);

render(siteMainElement, new FilmContainerView(), RenderPosition.BEFOREEND);

const filmMainElement = siteMainElement.querySelector('.films-list');
const filmListElement = filmMainElement.querySelector('.films-list__container');

const renderCard = (cardListElement, card) => {
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
  cardComponent.setClickHandler(() => {
    appendPopup();
    body.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);
  });
  cardPopupComponent.setClickHandlerClose(() => {
    document.removeEventListener('keydown', onEscKeyDown);
    removePopup();
    body.classList.remove('hide-overflow');
  });

  render(cardListElement, cardComponent, RenderPosition.BEFOREEND);
};

const renderCards = () => {

  for (let i = 0; i < Math.min(cards.length, FILM_CARD_COUNT_PER_STEP); i++) {
    renderCard(filmListElement, cards[i]);
  }

  if (cards.length === 0) {
    render(filmListElement, new LoadingView(), RenderPosition.BEFOREEND);
  }

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
};
renderCards();
