import { getRandomArrayElement } from '../utils/utils.js';

const mockPoints = [
  {
    id: 'b88a1c17-f206-4fcd-b1a5-86a52f1fc567',
    basePrice: 6441,
    dateFrom: '2025-02-03T06:08:08.471Z',
    dateTo: '2025-02-05T05:22:08.471Z',
    destination: 'ac169bfb-fc83-46bf-abbd-de65ab933d76',
    isFavorite: false,
    offers: [
      'b20e36f7-a012-473b-ad16-a10e0c2342fc',
      '59b4b1b3-49a9-4bfa-bea9-1dd84d364b28',
      'adb6b057-51bb-4443-b765-5dfd245469d3',
      'f30750ba-8efd-4ced-b8ae-2ad276fbe52c'
    ],
    type: 'flight'
  },
  {
    id: '7e47f315-c816-4334-a75f-6ba7da466a5f',
    basePrice: 1879,
    dateFrom: '2025-02-06T02:03:08.471Z',
    dateTo: '2025-02-06T17:17:08.471Z',
    destination: '5e8c3d46-8686-41cf-ae39-c174b09022fd',
    isFavorite: false,
    offers: [],
    type: 'sightseeing'
  },
  {
    id: '8a3cf8c3-831d-4c42-9940-bfff6c7f5252',
    basePrice: 52,
    dateFrom: '2025-02-07T04:01:08.471Z',
    dateTo: '2025-02-07T21:10:08.471Z',
    destination: '72eb4978-c0c8-4452-a4bc-f0dab13ceb08',
    isFavorite: true,
    offers: [
      '130808ad-de7e-4773-8403-1e6c4bf49e04',
      '6f35e3ff-f568-4650-9869-bb291415229a',
      '7e62088c-00fb-4e9b-b683-ca752f1ae5e5'
    ],
    type: 'train'
  },
  {
    id: '1d9f665a-ce4a-4026-af4b-7a8ddce94b0b',
    basePrice: 1941,
    dateFrom: '2025-02-09T12:50:08.471Z',
    dateTo: '2025-02-10T23:49:08.471Z',
    destination: 'aa7bc868-d050-4e79-b090-50a0f25c1b6a',
    isFavorite: true,
    offers: [
      '7e62088c-00fb-4e9b-b683-ca752f1ae5e5'
    ],
    type: 'train'
  },
  {
    id: '206ad937-5ea6-49cd-8c6d-b6aff72bc22b',
    basePrice: 3493,
    dateFrom: '2025-02-12T20:57:08.471Z',
    dateTo: '2025-02-14T02:47:08.471Z',
    destination: '72eb4978-c0c8-4452-a4bc-f0dab13ceb08',
    isFavorite: false,
    offers: [
      'fa2255c1-1534-46d5-8c9b-44108dc7f817',
      'ac90a1f1-744f-4fe1-bad3-f5becf0aa828',
      '83b0b837-f5e8-44ca-8d4f-c0a3300cb669',
      '7a7d33ba-23a0-4653-a4bb-bbbd58c094e7',
      '058bdbf8-ff7d-43df-a2f6-a33d415e25eb'
    ],
    type: 'taxi'
  },
  {
    id: 'fd4eec68-5e2d-4e90-8803-197eed101b54',
    basePrice: 5129,
    dateFrom: '2025-02-14T16:06:08.471Z',
    dateTo: '2025-02-15T02:12:08.471Z',
    destination: 'aa7bc868-d050-4e79-b090-50a0f25c1b6a',
    isFavorite: false,
    offers: [
      '5b59d8f0-5fcc-4cd9-a18f-a52ca48f228b',
      '7b7e1e39-4686-4b83-a42e-24d5a96c7bfc',
      '63dff9d9-5f14-43fb-bb0b-0eca56afe828',
      '72936736-1a6e-48bf-b41e-709c781fd55e',
      'bf221865-3803-4248-82b7-331fff5604f2'
    ],
    type: 'check-in'
  },
  {
    id: '2911d649-e535-493c-97bc-b51c15c3e4e0',
    basePrice: 6826,
    dateFrom: '2025-02-15T19:48:08.471Z',
    dateTo: '2025-02-16T19:33:08.471Z',
    destination: 'aa7bc868-d050-4e79-b090-50a0f25c1b6a',
    isFavorite: false,
    offers: [
      '5b59d8f0-5fcc-4cd9-a18f-a52ca48f228b',
      '7b7e1e39-4686-4b83-a42e-24d5a96c7bfc',
      '63dff9d9-5f14-43fb-bb0b-0eca56afe828',
      '72936736-1a6e-48bf-b41e-709c781fd55e',
      'bf221865-3803-4248-82b7-331fff5604f2'
    ],
    type: 'check-in'
  },
  {
    id: '1963a205-672f-45fe-9219-da8c699f0ac6',
    basePrice: 2572,
    dateFrom: '2025-02-17T19:43:08.471Z',
    dateTo: '2025-02-18T03:53:08.471Z',
    destination: '794ae94e-05a0-4f21-89d5-d647fc500cab',
    isFavorite: true,
    offers: [],
    type: 'ship'
  },
  {
    id: 'e8df2b66-0e51-4b8a-94c4-b47482e1a690',
    basePrice: 7646,
    dateFrom: '2025-02-19T01:52:08.471Z',
    dateTo: '2025-02-20T13:10:08.471Z',
    destination: '72eb4978-c0c8-4452-a4bc-f0dab13ceb08',
    isFavorite: true,
    offers: [
      'fa2255c1-1534-46d5-8c9b-44108dc7f817',
      'ac90a1f1-744f-4fe1-bad3-f5becf0aa828',
      '83b0b837-f5e8-44ca-8d4f-c0a3300cb669',
      '7a7d33ba-23a0-4653-a4bb-bbbd58c094e7',
      '058bdbf8-ff7d-43df-a2f6-a33d415e25eb'
    ],
    type: 'taxi'
  },
  {
    id: 'a2e9fec2-2483-4307-ab72-04f14898b9c3',
    basePrice: 8152,
    dateFrom: '2025-02-22T09:43:08.471Z',
    dateTo: '2025-02-23T13:24:08.471Z',
    destination: '1e84c5a6-a2d2-4926-93a2-d250d25f73fa',
    isFavorite: true,
    offers: [],
    type: 'restaurant'
  },
  {
    id: 'd169ee06-6a27-4497-b18f-9c026a27b1c8',
    basePrice: 4388,
    dateFrom: '2025-02-25T01:17:08.471Z',
    dateTo: '2025-02-25T10:08:08.471Z',
    destination: '9d91cc06-69a1-4247-af97-32012a2928c8',
    isFavorite: false,
    offers: [
      '571aaff4-59ef-4f4b-8281-dff4e15e4f4d',
      '8c8aa9db-579e-433d-8c09-9909b7e5f42f'
    ],
    type: 'bus'
  },
  {
    id: 'cf98784b-58a2-47b4-85f3-a6b890e5172a',
    basePrice: 4004,
    dateFrom: '2025-02-26T18:28:08.471Z',
    dateTo: '2025-02-28T01:09:08.471Z',
    destination: 'ac169bfb-fc83-46bf-abbd-de65ab933d76',
    isFavorite: true,
    offers: [
      'bf221865-3803-4248-82b7-331fff5604f2'
    ],
    type: 'check-in'
  },
  {
    id: '63a7a6cd-2a1c-46ea-a738-42ca09fb5b7a',
    basePrice: 2791,
    dateFrom: '2025-03-01T15:39:08.471Z',
    dateTo: '2025-03-01T23:31:08.471Z',
    destination: 'ac169bfb-fc83-46bf-abbd-de65ab933d76',
    isFavorite: false,
    offers: [
      '7a7d33ba-23a0-4653-a4bb-bbbd58c094e7',
      '058bdbf8-ff7d-43df-a2f6-a33d415e25eb'
    ],
    type: 'taxi'
  },
  {
    id: 'b5dc0a3a-b73f-4bcc-a921-656721596550',
    basePrice: 6085,
    dateFrom: '2025-03-03T15:47:08.471Z',
    dateTo: '2025-03-04T12:26:08.471Z',
    destination: '508a0fae-4270-4f4b-97fe-c93cec4e67f8',
    isFavorite: true,
    offers: [
      '7e62088c-00fb-4e9b-b683-ca752f1ae5e5'
    ],
    type: 'train'
  },
  {
    id: '0043e8b6-0737-4a5f-a29e-9b26294bf869',
    basePrice: 8966,
    dateFrom: '2025-03-05T15:08:08.471Z',
    dateTo: '2025-03-07T00:01:08.471Z',
    destination: '72eb4978-c0c8-4452-a4bc-f0dab13ceb08',
    isFavorite: true,
    offers: [
      'fa2255c1-1534-46d5-8c9b-44108dc7f817',
      'ac90a1f1-744f-4fe1-bad3-f5becf0aa828',
      '83b0b837-f5e8-44ca-8d4f-c0a3300cb669',
      '7a7d33ba-23a0-4653-a4bb-bbbd58c094e7',
      '058bdbf8-ff7d-43df-a2f6-a33d415e25eb'
    ],
    type: 'taxi'
  },
  {
    id: '2cba0628-cf4f-40db-bb5e-bdc8e4c6400c',
    basePrice: 301,
    dateFrom: '2025-03-08T13:38:08.471Z',
    dateTo: '2025-03-09T22:02:08.471Z',
    destination: '794ae94e-05a0-4f21-89d5-d647fc500cab',
    isFavorite: true,
    offers: [
      'fa2255c1-1534-46d5-8c9b-44108dc7f817',
      'ac90a1f1-744f-4fe1-bad3-f5becf0aa828',
      '83b0b837-f5e8-44ca-8d4f-c0a3300cb669',
      '7a7d33ba-23a0-4653-a4bb-bbbd58c094e7',
      '058bdbf8-ff7d-43df-a2f6-a33d415e25eb'
    ],
    type: 'taxi'
  },
  {
    id: '6a7f37ab-0145-473e-8036-e29ed8cc2e00',
    basePrice: 2747,
    dateFrom: '2025-03-11T02:10:08.471Z',
    dateTo: '2025-03-11T20:41:08.471Z',
    destination: '508a0fae-4270-4f4b-97fe-c93cec4e67f8',
    isFavorite: false,
    offers: [],
    type: 'check-in'
  },
  {
    id: '9d504b9c-4754-44ae-9167-46b1b355dd50',
    basePrice: 3707,
    dateFrom: '2025-03-12T05:56:08.471Z',
    dateTo: '2025-03-12T18:20:08.471Z',
    destination: 'aa7bc868-d050-4e79-b090-50a0f25c1b6a',
    isFavorite: true,
    offers: [
      'af697d97-562f-446e-ade6-4f097695e398'
    ],
    type: 'drive'
  },
  {
    id: '387784ad-e382-40ea-85a7-96fc28a87ae2',
    basePrice: 3617,
    dateFrom: '2025-03-13T17:09:08.471Z',
    dateTo: '2025-03-15T02:57:08.471Z',
    destination: 'fe3ffc98-ad62-4a83-a554-2e178249f9da',
    isFavorite: false,
    offers: [],
    type: 'sightseeing'
  },
  {
    id: '6c8164b9-905e-4e49-af8b-bfd0b6f258d6',
    basePrice: 1691,
    dateFrom: '2025-03-16T21:33:08.471Z',
    dateTo: '2025-03-18T00:37:08.471Z',
    destination: '508a0fae-4270-4f4b-97fe-c93cec4e67f8',
    isFavorite: true,
    offers: [
      'b20e36f7-a012-473b-ad16-a10e0c2342fc',
      '59b4b1b3-49a9-4bfa-bea9-1dd84d364b28',
      'adb6b057-51bb-4443-b765-5dfd245469d3',
      'f30750ba-8efd-4ced-b8ae-2ad276fbe52c'
    ],
    type: 'flight'
  },
  {
    id: 'eda7291b-0c54-43ee-9345-23524b318d10',
    basePrice: 2042,
    dateFrom: '2025-03-19T14:43:08.471Z',
    dateTo: '2025-03-20T23:22:08.471Z',
    destination: 'ac169bfb-fc83-46bf-abbd-de65ab933d76',
    isFavorite: false,
    offers: [
      '1d264417-e6ce-4488-b5af-71977675e8d4'
    ],
    type: 'ship'
  },
  {
    id: 'fecd8cb0-6f1e-4d52-8551-7842caa4c651',
    basePrice: 7782,
    dateFrom: '2025-03-21T05:23:08.471Z',
    dateTo: '2025-03-22T21:27:08.471Z',
    destination: '72eb4978-c0c8-4452-a4bc-f0dab13ceb08',
    isFavorite: true,
    offers: [],
    type: 'sightseeing'
  },
  {
    id: '478de40f-ae90-458e-8f5a-75ed911993c5',
    basePrice: 8315,
    dateFrom: '2025-03-24T16:38:08.471Z',
    dateTo: '2025-03-26T11:37:08.471Z',
    destination: 'fe3ffc98-ad62-4a83-a554-2e178249f9da',
    isFavorite: false,
    offers: [
      '130808ad-de7e-4773-8403-1e6c4bf49e04',
      '6f35e3ff-f568-4650-9869-bb291415229a',
      '7e62088c-00fb-4e9b-b683-ca752f1ae5e5'
    ],
    type: 'train'
  },
  {
    id: 'dba78c79-f7d0-4694-9747-9d9e77dc2d23',
    basePrice: 137,
    dateFrom: '2025-03-27T12:31:08.471Z',
    dateTo: '2025-03-27T21:43:08.471Z',
    destination: 'fe3ffc98-ad62-4a83-a554-2e178249f9da',
    isFavorite: false,
    offers: [
      '8c8aa9db-579e-433d-8c09-9909b7e5f42f'
    ],
    type: 'bus'
  },
  {
    id: '139f90a1-838e-45f4-8836-f6140550f58d',
    basePrice: 1198,
    dateFrom: '2025-03-28T18:25:08.471Z',
    dateTo: '2025-03-29T09:30:08.471Z',
    destination: '794ae94e-05a0-4f21-89d5-d647fc500cab',
    isFavorite: true,
    offers: [
      '63dff9d9-5f14-43fb-bb0b-0eca56afe828',
      '72936736-1a6e-48bf-b41e-709c781fd55e',
      'bf221865-3803-4248-82b7-331fff5604f2'
    ],
    type: 'check-in'
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoint };

