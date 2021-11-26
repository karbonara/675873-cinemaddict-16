const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

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

export const generateCard = () => ({
  title: generateTitle(),
  description: generateDescription(),
  img: generateImg(),
  genre: generateGenre(),
  country: generateCountry(),
});
