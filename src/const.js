export const POINTS_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

export const DEFAULT_POINT_TYPE = 'Flight';

export const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_POINT_TYPE,
};

export const SortTypes = {
  DAY: 'DAY',
  EVENT: 'EVENT',
  TIME: 'TIME',
  PRICE: 'PRICE',
  OFFER: 'OFFER',
};

export const SORT_TYPE_DEFAULT = 'DAY';

export const SORT_TYPES_BLOCK = ['EVENT', 'OFFER'];

export const FILTER_TYPE_DEFAULT = 'EVERYTHING';

export const FilterTypes = {
  EVERYTHING : 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST',
};

export const MessageText = {
  LOADING: 'Loading...',
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
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

export const EditMode = {
  ADD: 'ADD',
  EDIT: 'EDIT'
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};
