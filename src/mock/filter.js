// import { date } from '../utils.js';

const filmCardFilter = {
  favorites: (cards) => cards
    .filter((card) => card.isFavorite).length,
};
export const generateFilter = (cards) => Object.entries(filmCardFilter).map(
  ([filterName, countCards]) => ({
    name: filterName,
    count: countCards(cards),
  }),
);
