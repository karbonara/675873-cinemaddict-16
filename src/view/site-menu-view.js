import AbstractView from './abstract-view';
const createSiteMenuItemTemplate = (filter) => {
  const { name, count } = filter;
  return (
    `<a href="#" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`
  );
};
const createSiteMenuTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createSiteMenuItemTemplate(filter, index === 0))
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
  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {

    return createSiteMenuTemplate(this.#filters);
  }
}
