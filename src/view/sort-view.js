import AbstractView from './abstract-view';
const createSortViewTemplate = () => (
  `<div class="sort">
    <a href="#" class="sort__button sort__button--active">Sort by default</a>
    <a href="#" class="sort__button">Sort by date</a>
    <a href="#" class="sort__button">Sort by rating</a>
  </div>`
);
export default class SortView extends AbstractView {
  #filters = null;
  get template() {
    return createSortViewTemplate(this.#filters);
  }
}
