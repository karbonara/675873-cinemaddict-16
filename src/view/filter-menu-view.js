import { createElement } from '../render.js';
const createFilterSortTemplate = () => (
  '<section class="sort"></section>'
);
export default class FilterSortView {
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
    return createFilterSortTemplate(this.#filters);
  }

  removeElement() {
    this.#element = null;
  }
}
