function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const toUpperCaseFirstLetter = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomArrayElement, toUpperCaseFirstLetter, isEscapeKey};
