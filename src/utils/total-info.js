export function getCheckedOffers(offers, type) {
  const offerByType = offers.find((offer) => offer.type === type);
  return offerByType ? offerByType.offers : [];
}

export function getTotalOffers(offersID = [], availableOffers = []) {
  const offersTotal = offersID.reduce((totalCost, id) => {
    const offer = availableOffers.find((item) => item.id === id);
    return totalCost + (offer ? offer.price : 0);
  }, 0);
  return offersTotal;
}
