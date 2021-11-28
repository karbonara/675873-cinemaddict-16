import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
};

const getRating = () => getRandomPositiveFloat(1, 10, 1);

const generateTitle = () => {
  const titles = [
    'Santa Claus Conquers the Martians',
    'Made for Each Other',
    'The Man with the Golden Arm',
    'Popeye the Sailor Meets Sindbad the Sailor',
  ];
  const randomIndex = getRandomInteger(0, titles.length - 1);
  return titles[randomIndex];
};
const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Nunc fermentum tortor ac porta dapibus.',
  ];
  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomIndex];
};

const generateImg = () => {
  const images = [
    'sagebrush-trail.jpg',
    'made-for-each-other.png',
    'santa-claus-conquers-the-martians.jpg',
    'the-man-with-the-golden-arm.jpg',
    'the-dance-of-life.jpg',
  ];

  const randomIndex = getRandomInteger(0, images.length - 1);
  return images[randomIndex];
};

const generateGenre = () => {
  const genres = [
    'Western',
    'Drama',
    'Mystery',
    'Comedy',
  ];
  const randomIndex = getRandomInteger(0, genres.length - 1);
  return genres[randomIndex];
};

const generateCountry = () => {
  const countrys = [
    'USA',
    'Italy',
    'Germany',
  ];
  const randomIndex = getRandomInteger(0, countrys.length - 1);
  return countrys[randomIndex];
};

const generateDirector = () => {
  const directors = [
    'Quentin Tarantino',
    'Guillermo del Toro',
    'George Miller',
    'Lana Wachowski',
  ];
  const randomIndex = getRandomInteger(0, directors.length - 1);
  return directors[randomIndex];
};

const generateActor = () => {
  const actors = [
    'Keanu Reeves',
    'Norman Reedus',
    'Mel Gibson',
  ];
  const randomIndex = getRandomInteger(0, actors.length - 1);
  return actors[randomIndex];
};

const generateWriter = () => {
  const writers = [
    'Anne Wigton',
    'Heinz Herald',
    'Richard Weil',
  ];
  const randomIndex = getRandomInteger(0, writers.length - 1);
  return writers[randomIndex];
};

const generateColorRating = () => {
  const colorRating = [
    'film-card__rating--good',
    'film-card__rating--average',
    'film-card__rating--poor',
  ];
  const randomIndex = getRandomInteger(0, colorRating.length - 1);
  return colorRating[randomIndex];
};

export const generateCard = () => ({
  title: generateTitle(),
  description: generateDescription(),
  img: generateImg(),
  genre: generateGenre(),
  country: generateCountry(),
  rating: Number(getRating()),
  actors: generateActor(),
  director: generateDirector(),
  writers: generateWriter(),
  colorRating: generateColorRating(),
  isWatchlist: Boolean(getRandomInteger(0, 1)),
  isWatched: Boolean(getRandomInteger(0, 1)),
  isFavorite: Boolean(getRandomInteger(0, 1)),
});
