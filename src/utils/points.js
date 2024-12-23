import {dayjs, getDuration} from './daijs';

const isPointFavorite = (isFavorite) => isFavorite ? 'event__favorite-btn--active' : '';

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }
  if (dateA === null) {
    return 1;
  }
  if (dateB === null) {
    return -1;
  }
  return null;
}


function sortPointDay(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}
function sortPointPrice(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.basePrice, pointB.basePrice);
  return weight ?? dayjs(pointB.basePrice).diff(dayjs(pointA.basePrice));
}

function sortPointTime(pointA, pointB) {
  const durationA = getDuration(pointA.dateFrom, pointA.dateTo);
  const durationB = getDuration(pointB.dateFrom, pointB.dateTo);
  return getWeightForNullDate(durationA, durationB) ?? durationB.diff(durationA);
}

function isEqualPoints(point, newPoint) {
  return (
    point.dateFrom !== newPoint.dateFrom
    ||
    point.dateTo !== newPoint.dateTo
    ||
    point.basePrice !== newPoint.basePrice
  );
}

export { isPointFavorite, sortPointDay, sortPointPrice, sortPointTime, isEqualPoints };
