import dayjs from 'dayjs';

const formatDate = (date, view) => date ? dayjs(date).format(view) : '';
const getDuration = (a, b) => a - b;

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const toUpperCaseFirstLetter = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

const isPointFavorite = (isFavorite) => isFavorite ? 'event__favorite-btn--active' : '';

export {getRandomArrayElement, formatDate, getDuration, toUpperCaseFirstLetter, isPointFavorite};
