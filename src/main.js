import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { createPopupFilm } from './view/popup-view.js';
import { createFilmCardTemplate } from './view/film-card-view.js';
import { createFilterTemplate } from './view/filter-menu-view.js';
import { createShowMoreButton } from './view/show-more-view.js';
import { createHeaderProfileTemplate } from './view/header-profile-view.js';
import { createFilmTemplate } from './view/film-view.js';
import { renderTemplate, RenderPosition } from './render.js';
import { generateCard } from './mock/card-movie.js';

const FILM_CARD_COUNT = 5;

const cards = Array.from({ length: FILM_CARD_COUNT }, generateCard);

const siteMainElement = document.querySelector('.main');
const siteNavigationElement = document.querySelector('.header');

renderTemplate(siteMainElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteNavigationElement, createHeaderProfileTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilterTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilmTemplate(), RenderPosition.BEFOREEND);

const filmMainElement = siteMainElement.querySelector('.films-list');
const filmListElement = filmMainElement.querySelector('.films-list__container');

for (let i = 0; i < FILM_CARD_COUNT; i++) {
  renderTemplate(filmListElement, createFilmCardTemplate(cards[i]), RenderPosition.BEFOREEND);
}
renderTemplate(filmMainElement, createShowMoreButton(), RenderPosition.BEFOREEND);

// const footerElement = document.querySelector('.footer');
// renderTemplate(footerElement, createPopupFilm(), RenderPosition.BEFOREEND);
