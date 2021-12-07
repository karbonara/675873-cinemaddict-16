import dayjs from 'dayjs';
import { getRandomPositiveFloat } from './common.js';
export const getRating = () => getRandomPositiveFloat(1, 10, 1);

export const date = (dueDate) => dayjs(dueDate).format('YYYY');

export const datePopup = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');
