import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import durationPlugin from 'dayjs/plugin/duration';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(customParseFormat);
dayjs.extend(durationPlugin);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

const formatDate = (date, view) => date ? dayjs(date).format(view) : '';

const padZero = (num) => (num < 10 ? `0${num}` : num);

const formatDuration = (minuteCount) => {
  const totalDuration = dayjs.duration(minuteCount, 'minutes');

  const totalDays = Math.floor(totalDuration.asDays());
  const hours = totalDuration.hours();
  const minutes = totalDuration.minutes();

  if (totalDuration.asMinutes() < 60) {
    return `${minutes}M`;
  } else if (totalDays < 1) {
    return `${padZero(hours)}H ${padZero(minutes)}M`.trim();
  } else {
    return `${padZero(totalDays)}D ${padZero(hours)}H ${padZero(minutes)}M`.trim();
  }
};

const calculateDuration = (startInput, endInput) => {
  const durationInMinutes = dayjs(endInput).diff(dayjs(startInput), 'minute');
  return formatDuration(durationInMinutes);
};

const isEventFuture = ({dateFrom}) => dayjs(dateFrom).isAfter(dayjs());
const isEventPresent = ({dateFrom, dateTo}) => dayjs(new Date()).isBetween(dateFrom, dayjs(dateTo));
const isEventPast = ({dateTo}) => dayjs(dateTo).isBefore(dayjs());

function getPointsByDate(pointB, pointA) {
  return dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
}

const sortPointDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
const sortPointTime = (pointA, pointB) => dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export { formatDate, calculateDuration, isEventFuture, isEventPresent, isEventPast, getPointsByDate, sortPointDay, sortPointPrice, sortPointTime };
