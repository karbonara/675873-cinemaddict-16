import AbstractView from './abstract-view';
import { SortType } from '../const.js';
const createSortViewTemplate = (sort) => (
  `<ul class="sort">
    <li><a href="#" class="sort__button ${sort === SortType.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${sort === SortType.DATE ? 'sort__button--active' : ''}" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${sort === SortType.RATING ? 'sort__button--active' : ''}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`
);
export default class SortView extends AbstractView {
  #sort = null;

  constructor(sort) {
    super();
    this.#sort = sort;
  }

  get template() {
    return createSortViewTemplate(this.#sort);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

}
