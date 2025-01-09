const AUTHORIZATION = 'Basic r5dyriyk17415';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';
const DESTINATIONS_COUNT = 3;
const EVENT_TYPE_DEFAULT = 'flight';

const SeparatorTotalInfo = {
  DEFAULT: '&nbsp;&mdash;&nbsp;',
  MANY_INFO: '&nbsp;&hellip;&nbsp;'
};

const Attribute = {
  CHECKED: 'checked',
  DISABLED: 'disabled'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const MessageText = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',

  LOADING: 'Loading...',
  FAIL: 'Failed to load latest route information',

  ERROR_ADD: 'Can\'t add point',
  ERROR_DELETE: 'Can\'t delete point',
  ERROR_UPDATE: 'Can\'t update point',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR'
};

const EventType = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant'
};

const SortType = {
  DEFAULT: {
    name: 'day',
    isEnabled: true,
  },
  EVENT: {
    name: 'event',
    isEnabled: false,
  },
  TIME: {
    name: 'time',
    isEnabled: true,
  },
  PRICE: {
    name: 'price',
    isEnabled: true,
  },
  OFFERS: {
    name: 'offer',
    isEnabled: false,
  },
};

const DateFormat = {
  DATE: 'MMM D',
  DATE_2: 'D MMM',
  TIME: 'HH:mm',
  DATE_FULL: 'YYYY-MM-DD',
  DATE_TIME: 'DD/MM/YY HH:mm',
  DATE_TIME_FULL: 'YYYY-MM-DDTHH:mm',
};

const EditType = {
  ADD: 'add',
  EDIT: 'edit'
};

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: null,
  isFavorite: false,
  offers: [],
  type: EVENT_TYPE_DEFAULT
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const TimeLimit = {
  LOWER: 350,
  UPPER: 1000,
};

const ApiEndPoint = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

export { DESTINATIONS_COUNT, BLANK_POINT, SeparatorTotalInfo, Attribute, EventType, SortType, DateFormat, EditType, FilterType, MessageText, Mode,
  UserAction, UpdateType, Method, AUTHORIZATION, END_POINT, TimeLimit, ApiEndPoint};


