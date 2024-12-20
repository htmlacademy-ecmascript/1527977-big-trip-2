export const DESTINATIONS = ['Amsterdam', 'Chamonix', 'Geneva'];

export const POINTS_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

export const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

export const SORT_TYPES_BLOCK = ['event', 'offer'];

export const FilterTypes = {
  EVERYTHING : 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const MessageText = {
  LOADING: 'Loading...',
  LIST_EMPTY__EVERYTHING: 'Click New Event to create your first point',
  LIST_EMPTY__PAST: 'There are no past events now',
  LIST_EMPTY__PRESENT: 'There are no present events now',
  LIST_EMPTY__FUTURE: 'There are no future events now',
  FAIL: 'Failed to load latest route information',
};

export const FormatsDate = {
  DATE: 'MMM D',
  TIME: 'HH:mm',
  DATE_FULL: 'YYYY-MM-DD',
  DATE_TIME: 'DD/MM/YY HH:mm',
  DATE_TIME_FULL: 'YYYY-MM-DDTHH:mm',
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
