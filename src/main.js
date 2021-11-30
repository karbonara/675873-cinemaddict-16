import SiteMenu from './view/site-menu-view.js';
// import { createPopupFilmTemplate } from './view/popup-view.js';
import { createFilmCardTemplate } from './view/film-card-view.js';
import { createFilterTemplate } from './view/filter-menu-view.js';
import ShowMoreButton from './view/show-more-view.js';
import HeaderProfile from './view/header-profile-view.js';
import FilmContainer from './view/film-view.js';
import { renderTemplate, renderElement, RenderPosition } from './render.js';
import { generateCard } from './mock/card-movie.js';
import { generateFilter } from './mock/filter.js';

const FILM_CARD_COUNT = 15;
const FILM_CARD_COUNT_PER_STEP = 8;
const cards = Array.from({ length: FILM_CARD_COUNT }, generateCard);
const filters = generateFilter(cards);

const siteMainElement = document.querySelector('.main');
const siteNavigationElement = document.querySelector('.header');

renderElement(siteMainElement, new SiteMenu(filters).element, RenderPosition.BEFOREEND);

renderElement(siteNavigationElement, new HeaderProfile().element, RenderPosition.BEFOREEND);

renderTemplate(siteMainElement, createFilterTemplate(), RenderPosition.BEFOREEND);

renderElement(siteMainElement, new FilmContainer().element, RenderPosition.BEFOREEND);

const filmMainElement = siteMainElement.querySelector('.films-list');
const filmListElement = filmMainElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(cards.length, FILM_CARD_COUNT_PER_STEP); i++) {
  renderTemplate(filmListElement, createFilmCardTemplate(cards[i]), RenderPosition.BEFOREEND);
}

if (cards.length > FILM_CARD_COUNT_PER_STEP) {
  let renderCount = FILM_CARD_COUNT_PER_STEP;
  renderElement(filmMainElement, new ShowMoreButton().element, RenderPosition.BEFOREEND);

  const loadButton = filmMainElement.querySelector('.films-list__show-more');
  loadButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderCount, renderCount + FILM_CARD_COUNT_PER_STEP)
      .forEach((card) => renderTemplate(filmListElement, createFilmCardTemplate(card), RenderPosition.BEFOREEND));

    renderCount += FILM_CARD_COUNT_PER_STEP;

    if (renderCount >= cards.length) {
      loadButton.remove();
    }
  });
}
// const footerElement = document.querySelector('.footer');
// for (let i = 0; FILM_CARD_COUNT; i++) {
//   renderTemplate(footerElement, createPopupFilmTemplate(cards[i]), RenderPosition.BEFOREEND);
// }

