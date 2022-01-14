import dayjs from 'dayjs';
import { getRandomPositiveFloat } from './common.js';
export const getRating = () => getRandomPositiveFloat(1, 10, 1);

export const date = (dueDate) => dayjs(dueDate).format('YYYY');

export const datePopup = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');

export const datePopupComments = (dueDate) => dayjs(dueDate).format('YYYY/MM/DD hh:mm');

const getFormattedMovieDate = (dateMovie, formatString) => dayjs(dateMovie).format(formatString);

const getFormattedMovieYear = (dates) => getFormattedMovieDate(dates, 'YYYY');

export const sortDateFilms = (movieA, movieB) => {
  const yearA = getFormattedMovieYear(movieA.releaseDate);
  const yearB = getFormattedMovieYear(movieB.releaseDate);

  return yearB - yearA;
};

export const sortRatingFilms = (movieA, movieB) => movieB.rating - movieA.rating;
