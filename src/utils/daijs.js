import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import durationPlugin from 'dayjs/plugin/duration';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(customParseFormat);
dayjs.extend(durationPlugin);
dayjs.extend(isSameOrBefore);

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

const getDuration = (startInput, endInput) => {
  const startDate = dayjs(startInput);
  const endDate = dayjs(endInput);

  const durationInMinutes = endDate.diff(startDate, 'minute');
  const formattedDuration = formatDuration(durationInMinutes);

  return formattedDuration;
};

export { formatDate, getDuration };
