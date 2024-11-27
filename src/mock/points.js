import {nanoid} from 'nanoid';
import {getRandomArrayElement} from '../utils/utils.js';

const mockPoints = [
  {
    basePrice: 1100,
    dateFrom: '2024-07-10T12:55:56.845Z',
    dateTo: '2024-07-10T13:29:30.375Z',
    destination: 2,
    isFavorite: true,
    offers: [1],
    type: 'taxi'
  },
  {
    basePrice: 2200,
    dateFrom: '2024-09-19T13:55:56.845Z',
    dateTo: '2024-09-19T15:55:56.845Z',
    destination: 1,
    isFavorite: false,
    offers: [],
    type: 'bus'
  },
  {
    basePrice: 3300,
    dateFrom: '2024-08-02T02:01:56.845Z',
    dateTo: '2024-08-03T15:19:19.375Z',
    destination: 3,
    isFavorite: true,
    offers: [3],
    type: 'train'
  },
  {
    basePrice: 4500,
    dateFrom: '2024-10-10T00:00:00.845Z',
    dateTo: '2024-10-29T00:00:00.845Z',
    destination: 4,
    isFavorite: false,
    offers: [4, 5],
    type: 'ship'
  }
];

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };
}

export {getRandomPoint};
