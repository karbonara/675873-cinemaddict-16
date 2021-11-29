import { getRandomInteger, getRating, generateDate } from '../utils.js';

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
    'good',
    'average',
    'poor',
  ];
  const randomIndex = getRandomInteger(0, colorRating.length - 1);
  return colorRating[randomIndex];
};

const generateDuration = () => {
  const hours = getRandomInteger();
  const minutes = getRandomInteger(1, 59);
  let durations = hours ? `${hours}h ` : '';
  durations += `${minutes}m`;
  return durations;
};

const generateComment = () => {
  const comments = [
    'Very very old. Meh',
    'Almost two hours? Seriously?',
    'Interesting setting and a good cast'
  ];
  const randomIndex = getRandomInteger(0, comments.length - 1);
  return comments[randomIndex];
};
const generateCommentImg = () => {
  const commentsImg = [
    'smile.png',
    'puke.png',
    'sleeping.png',
    'angry.png'
  ];
  const randomIndex = getRandomInteger(0, commentsImg.length - 1);
  return commentsImg[randomIndex];
};
const generateCommentName = () => {
  const commentsName = [
    'Tim Macoveev',
    'John Do',
    'John Mason',
  ];
  const randomIndex = getRandomInteger(0, commentsName.length - 1);
  return commentsName[randomIndex];
};

export const generateCard = () => ({
  releaseDate: generateDate(),
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
  duration: generateDuration(),
  countComment: getRandomInteger(0, 99),
  comment: generateComment(),
  commentImg: generateCommentImg(),
  commentName: generateCommentName(),
  isWatchlist: Boolean(getRandomInteger(0, 1)),
  isWatched: Boolean(getRandomInteger(0, 1)),
  isFavorite: Boolean(getRandomInteger(0, 1)),
});
