import { FilterType } from '../const';
// import { isTaskExpired, isTaskExpiringToday, isTaskRepeating } from './task';

export const filter = {
  [FilterType.ALL]: (movies) => movies.filter((movie) => movie),
  [FilterType.WATCH]: (films) => films.filter((film) => film.userDetails.watchlist),
  [FilterType.WATCHED]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite),
};
