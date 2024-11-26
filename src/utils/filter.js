import {FilterTypes} from '../const';
import {isEventFuture, isEventPresent, isEventPast} from './daijs';

const filter = {
  [FilterTypes.EVERYTHING]: (points) => points,
  [FilterTypes.FUTURE]: (points) => points.filter((point) => isEventFuture(point)),
  [FilterTypes.PRESENT]: (points) => points.filter((point) => isEventPresent(point)),
  [FilterTypes.PAST]: (points) => points.filter((point) => isEventPast(point)),
};

export {filter};
