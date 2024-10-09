import dayjs from 'dayjs';
const Format = {
  DATE: 'MMM D',
  TIME: 'HH:mm',
};

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizePointDate(pointDate) {
  return pointDate ? dayjs(pointDate).format(Format.DATE) : '';
}

function humanizePointTime(pointTime) {
  return pointTime ? dayjs(pointTime).format(Format.TIME) : '';
}

const toUpperCaseFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const isPointFavorite = (isFavorite) => isFavorite ? 'event__favorite-btn--active' : '';

export {getRandomArrayElement, humanizePointDate, humanizePointTime, toUpperCaseFirstLetter, isPointFavorite};
