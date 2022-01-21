import FilterView from '../view/site-menu-view.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';
import { filter } from '../utils/filter.js';
import { FilterType, UpdateType } from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filmModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, filmModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#filmModel = filmModel;

    this.#filmModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const cards = this.#filmModel.cards;

    return [
      {
        type: FilterType.ALL,
        name: 'All',
        count: filter[FilterType.ALL](cards).length,
      },
      {
        type: FilterType.WATCH,
        name: 'Watch',
        count: filter[FilterType.WATCH](cards).length,
      },
      {
        type: FilterType.WATCHED,
        name: 'Watched',
        count: filter[FilterType.WATCHED](cards).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorite',
        count: filter[FilterType.FAVORITES](cards).length,
      }
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
