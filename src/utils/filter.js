import { FilterType } from '../const';
import { isEventFuture, isEventPresent, isEventPast} from './daijs';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isEventFuture(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isEventPresent(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isEventPast(point)),
};

export { filter };
