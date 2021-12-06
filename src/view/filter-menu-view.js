import AbstractView from "./abstract-view";
const createFilterSortTemplate = () => (
  '<section class="sort"></section>'
);
export default class FilterSortView extends AbstractView {
  #filters = null;
  get template() {
    return createFilterSortTemplate(this.#filters);
  }
}
