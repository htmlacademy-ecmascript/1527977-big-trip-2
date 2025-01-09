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

const padZero = (num) => String(num).padStart(2, '0');

const formatDuration = (minuteCount) => {
  const totalMinutes = dayjs.duration(minuteCount, 'minutes');

  const days = totalMinutes.days();
  const hours = totalMinutes.hours();
  const minutes = totalMinutes.minutes();

  let result;

  switch (true) {
    case days > 0:
      result = `${days < 10 ? padZero(days) : days}D ${padZero(hours)}H ${padZero(minutes)}M`;
      break;
    case hours > 0:
      result = `${padZero(hours)}H ${padZero(minutes)}M`;
      break;
    default:
      result = `${minutes}M`;
      break;
  }

  return result;
};

const calculateDuration = (startInput, endInput) => {
  const startDate = dayjs(startInput);
  const endDate = dayjs(endInput);

  const durationInMinutes = endDate.diff(startDate, 'minute');
  const formattedDuration = formatDuration(durationInMinutes);

  return formattedDuration;
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
