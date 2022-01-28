import AbstractView from './abstract-view.js';
import { MenuItem } from '../const.js';

const FILM_LISTS_MODE = MenuItem.FILM_LISTS;
const STATISTIC_MODE = MenuItem.STATISTIC;

const formatFirstLetterToUpperCase = (title) => (title[0].toUpperCase() + title.slice(1));

const createSiteMenuItemTemplate = (filter, currentFilterType) => {
  const { type, name, count } = filter;
  const defaultType = 'ALL';
  return `<a href="#${type}" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}" data-type="${type}" data-mode="${FILM_LISTS_MODE}">${formatFirstLetterToUpperCase(name)} <span class="main-navigation__item-count ${type === defaultType ? 'visually-hidden' : ''}">${count}</span></a>`;
};

const createSiteMenuTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createSiteMenuItemTemplate(filter, currentFilterType))
    .join('');
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional" data-mode="${STATISTIC_MODE}">Stats</a>
  </nav>`;
};
export default class SiteMenuView extends AbstractView {
  #filters = null;
  #currentFilterType = null;
  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createSiteMenuTemplate(this.#filters, this.#currentFilterType);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.querySelectorAll('.main-navigation__item').forEach((item) => item.addEventListener('click', this.#handleFilterTypeChange));
  }

  #handleFilterTypeChange = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.type);
  }

}
