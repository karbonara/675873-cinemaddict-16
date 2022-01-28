import AbstractView from './abstract-view';
import { FilterType } from '../const.js';

const NoFilmCardsTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCH]: 'There are no movies to watch now',
  [FilterType.WATCHED]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};

const createNoFilmsTemplate = (filterType) => {
  const noFilmCardsTextValue = NoFilmCardsTextType[filterType];
  return (
    `<p class="board__no-tasks">
    ${noFilmCardsTextValue}
    </p>`
  );
};

export default class NoFilmsView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createNoFilmsTemplate(this._data);
  }
}
