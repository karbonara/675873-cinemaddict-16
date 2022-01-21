import AbstractView from './abstract-view.js';
const formatFirstLetterToUpperCase = (title) => (title[0].toUpperCase() + title.slice(1));

const createSiteMenuItemTemplate = (filter) => {
  const { type, name, count } = filter;

  return `<a href="#${type}" class="main-navigation__item " data-type="${type}">${formatFirstLetterToUpperCase(name)} <span class="main-navigation__item-count">${count}</span></a>`;
};

const createSiteMenuTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createSiteMenuItemTemplate(filter, currentFilterType))
    .join('');
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
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
