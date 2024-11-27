function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const toUpperCaseFirstLetter = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

const toLowerCaseFirstLetter = (str) => `${str[0].toLowerCase()}${str.slice(1)}`;

const isEscapeKey = (evt) => evt.key === 'Escape';

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export {getRandomArrayElement, toUpperCaseFirstLetter, toLowerCaseFirstLetter, isEscapeKey, updateItem};
