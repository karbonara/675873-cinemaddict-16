import { nanoid } from 'nanoid';
import { getRandomInteger, generateDate } from '../utils/common.js';
import { getRating } from '../utils/task.js';
import { EMOJI_IMGES } from '../const.js';

const generateTitle = () => {
  const titles = [
    'Santa Claus Conquers the Martians',
    'Made for Each Other',
    'The Man with the Golden Arm',
    'Popeye the Sailor Meets Sindbad the Sailor',
  ];
  return titles[getRandomInteger(0, titles.length - 1)];
};
const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Nunc fermentum tortor ac porta dapibus.',
  ];
  return descriptions[getRandomInteger(0, descriptions.length - 1)];
};
const generateImg = () => {
  const images = [
    'sagebrush-trail.jpg',
    'made-for-each-other.png',
    'santa-claus-conquers-the-martians.jpg',
    'the-man-with-the-golden-arm.jpg',
    'the-dance-of-life.jpg',
  ];
  return images[getRandomInteger(0, images.length - 1)];
};
const generateGenre = () => {
  const genres = [
    'Western',
    'Drama',
    'Mystery',
    'Comedy',
  ];
  return genres[getRandomInteger(0, genres.length - 1)];
};
const generateCountry = () => {
  const countries = [
    'USA',
    'Italy',
    'Germany',
  ];
  return countries[getRandomInteger(0, countries.length - 1)];
};
const generateDirector = () => {
  const directors = [
    'Quentin Tarantino',
    'Guillermo del Toro',
    'George Miller',
    'Lana Wachowski',
  ];
  return directors[getRandomInteger(0, directors.length - 1)];
};
const generateActor = () => {
  const actors = [
    'Keanu Reeves',
    'Norman Reedus',
    'Mel Gibson',
  ];
  return actors[getRandomInteger(0, actors.length - 1)];
};
const generateWriter = () => {
  const writers = [
    'Anne Wigton',
    'Heinz Herald',
    'Richard Weil',
  ];
  return writers[getRandomInteger(0, writers.length - 1)];
};
const generateColorRating = () => {
  const colorRating = [
    'good',
    'average',
    'poor',
  ];
  return colorRating[getRandomInteger(0, colorRating.length - 1)];
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
  return comments[getRandomInteger(0, comments.length - 1)];
};
const generateCommentImg = () => {
  // const commentsImg = [
  //   'smile',
  //   'puke',
  //   'sleeping',
  //   'angry'
  // ];
  // return commentsImg[getRandomInteger(0, commentsImg.length - 1)];

  const randomIndex = getRandomInteger(0, EMOJI_IMGES.length - 1);
  return EMOJI_IMGES[randomIndex];
};
const generateCommentEmoji = () => {
  const commentsImgEmoji = [
    'smile',
    'puke',
    'sleeping',
    'angry'
  ];
  return commentsImgEmoji[getRandomInteger(0, commentsImgEmoji.length - 1)];
};
const generateCommentName = () => {
  const commentsName = [
    'Tim Macoveev',
    'John Do',
    'John Mason',
  ];
  return commentsName[getRandomInteger(0, commentsName.length - 1)];
};
const generateOriginalTitle = () => {
  const originalTitle = [
    'The Great Flamarion',
    'Made for Each Other',
    'Santa Claus Conquers the Martians',
  ];
  return originalTitle[getRandomInteger(0, originalTitle.length - 1)];
};
const generateAgeRating = () => {
  const ageRating = [
    '18+',
    '16+',
    '21+',
  ];
  return ageRating[getRandomInteger(0, ageRating.length - 1)];
};

export const generateCard = () => ({
  id: nanoid(),
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
  commentCount: getRandomInteger(0, 99),
  commentImgEmoji: generateCommentEmoji(),
  originalTitle: generateOriginalTitle(),
  ageRating: generateAgeRating(),
  isWatchlist: Boolean(getRandomInteger(0, 1)),
  isWatched: Boolean(getRandomInteger(0, 1)),
  isFavorite: Boolean(getRandomInteger(0, 1)),
});
