import SiteMenu from './view/site-menu-view.js';
import PopupFilm from './view/popup-view.js';
import FilmCard from './view/film-card-view.js';
import FilterSort from './view/filter-menu-view.js';
import SortView from './view/sort-view.js';
import ShowMoreButton from './view/show-more-view.js';
import HeaderProfile from './view/header-profile-view.js';
import FilmContainer from './view/film-view.js';
// import FilmRated from './view/film-rated.js';
// import FilmCardRated from './view/film-card-rated.js';
import { render, RenderPosition } from './render.js';
import { generateCard } from './mock/card-movie.js';
import { generateFilter } from './mock/filter.js';

const FILM_CARD_COUNT = 15;
const FILM_CARD_COUNT_PER_STEP = 8;
const cards = Array.from({ length: FILM_CARD_COUNT }, generateCard);
const filters = generateFilter(cards);

const siteMainElement = document.querySelector('.main');
const siteNavigationElement = document.querySelector('.header');

render(siteMainElement, new SiteMenu(filters).element, RenderPosition.BEFOREEND);

render(siteNavigationElement, new HeaderProfile().element, RenderPosition.BEFOREEND);

const filterSortComponent = new FilterSort();
render(siteMainElement, filterSortComponent.element, RenderPosition.BEFOREEND);
render(filterSortComponent.element, new SortView().element, RenderPosition.BEFOREEND);

render(siteMainElement, new FilmContainer().element, RenderPosition.BEFOREEND);

const filmMainElement = siteMainElement.querySelector('.films-list');
const filmListElement = filmMainElement.querySelector('.films-list__container');

const renderCard = (cardListElement, card) => {
  const cardComponent = new FilmCard(card);
  const cardPopupComponent = new PopupFilm(card);
  const body = document.body;
  cardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
    cardListElement.appendChild(cardPopupComponent.element);
    body.classList.add('hide-overflow');
  });
  cardPopupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
    cardListElement.removeChild(cardPopupComponent.element);
    body.classList.remove('hide-overflow');
  });

  render(cardListElement, cardComponent.element, RenderPosition.BEFOREEND);
};

for (let i = 0; i < Math.min(cards.length, FILM_CARD_COUNT_PER_STEP); i++) {
  renderCard(filmListElement, cards[i]);
}

if (cards.length > FILM_CARD_COUNT_PER_STEP) {
  let renderCount = FILM_CARD_COUNT_PER_STEP;
  render(filmMainElement, new ShowMoreButton().element, RenderPosition.BEFOREEND);

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

// const footerElement = document.querySelector('.footer');
// for (let i = 0; i < FILM_CARD_COUNT; i++) {
//   render(footerElement, new PopupFilm(cards[i]).element, RenderPosition.BEFOREEND);
// }
