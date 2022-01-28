import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
export const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
};
export const generateDate = () => {
  const maxDaysGap = 36000;
  const daysGap = getRandomInteger(1, maxDaysGap);
  return dayjs().add(-daysGap, 'day').toDate();
};
export const getShortDescription = (text) => {
  const description = text;
  const TEXT_LENGTH_TO_FILM = 140;
  const ellipsis = '...';
  if (description.length <= TEXT_LENGTH_TO_FILM) {
    return description;
  }
  return description.substring(0, TEXT_LENGTH_TO_FILM - 1) + ellipsis;
};
export const formatFirstLetterToUpperCase = (title) => (title[0].toUpperCase() + title.slice(1));
