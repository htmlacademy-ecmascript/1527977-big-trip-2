const toUpperCaseFirstLetter = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

const isEscapeKey = (evt) => evt.key === 'Escape';

export {toUpperCaseFirstLetter, isEscapeKey};
