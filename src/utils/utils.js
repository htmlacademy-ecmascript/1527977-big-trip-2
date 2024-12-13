function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const toUpperCaseFirstLetter = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

const isEscapeKey = (evt) => evt.key === 'Escape';

function updateItem(items, update) {
  if (!Array.isArray(items) || !update || update.id === undefined) {
    return [];
  }

  return items.map((item) => item?.id === update.id ? update : item);
}

export {getRandomArrayElement, toUpperCaseFirstLetter, isEscapeKey, updateItem};
