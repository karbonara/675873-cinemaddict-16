import { createElement } from '../render.js';
const createSortViewTemplate = () => (
  `<div class="sort">
    <a href="#" class="sort__button sort__button--active">Sort by default</a>
    <a href="#" class="sort__button">Sort by date</a>
    <a href="#" class="sort__button">Sort by rating</a>
  </div>`
);
export default class SortView {
  #element = null;
  #filters = null;

  constructor(filters) {
    this.#filters = filters;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createSortViewTemplate(this.#filters);
  }

  removeElement() {
    this.#element = null;
  }
}
