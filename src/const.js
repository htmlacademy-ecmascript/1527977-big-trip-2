export const DESTINATIONS = ['Amsterdam', 'Chamonix', 'Geneva'];

export const POINTS_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

export const getDefaultPoint = () => ({
  basePrice: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: 0,
  isFovorite: false,
  offers: [],
  type: POINTS_TYPES[0],
});

export const FormatsDate = {
  DATE: 'MMM D',
  TIME: 'HH:mm',
  DATE_FULL: 'YYYY-MM-DD',
  DATE_TIME: 'DD/MM/YY HH:mm',
  DATE_TIME_FULL: 'YYYY-MM-DDTHH:mm',
};
