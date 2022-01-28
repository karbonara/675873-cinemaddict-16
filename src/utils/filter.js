import { FilterType } from '../const';

export const filter = {
  [FilterType.ALL]: (films) => films.filter((film) => film),
  [FilterType.WATCH]: (films) => films.filter((film) => film.isWatchlist),
  [FilterType.WATCHED]: (films) => films.filter((film) => film.isWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
};
