import dayjs from 'dayjs';
import { getRandomPositiveFloat } from './common.js';
export const getRating = () => getRandomPositiveFloat(1, 10, 1);

export const date = (dueDate) => dayjs(dueDate).format('YYYY');

export const datePopup = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');

export const datePopupComments = (dueDate) => dayjs(dueDate).format('YYYY/MM/DD hh:mm');

// export const sortDateFilms = (films, filmsCount) => {
//   const sortedFilms = films.slice().sort((a, b) => b.release.date - a.release.date).slice(0, filmsCount);

//   return sortedFilms;
// };

// export const sortRatingFilms = (films, filmsCount) => {
//   const sortedFilms = films.slice().sort((a, b) => b.totalRating - a.totalRating).slice(0, filmsCount);

//   return sortedFilms;
// };

// const getFormattedMovieDate = (date, formatString) => dayjs(date).format(formatString);

// const getFormattedMovieYear = (date) => getFormattedMovieDate(date, 'YYYY');

// const getFormattedMovieDuration = (minutes) => dayjs.duration(minutes, 'm').format('H[h] m[m]');

// const getRelativeTime = (date) => dayjs(date).fromNow();

// export const sortDateFilms = (movieA, movieB) => {
//   const yearA = getFormattedMovieYear(movieA.releaseDate);
//   const yearB = getFormattedMovieYear(movieB.releaseDate);

//   return yearB - yearA;
// };

// export const sortRatingFilms = (movieA, movieB) => movieB.rating - movieA.rating;
