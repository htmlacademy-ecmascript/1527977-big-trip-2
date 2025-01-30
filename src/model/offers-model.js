export default class OffersModel {
  #offers = [];
  #offersApiService = null;

  constructor({ offersApiService }) {
    this.#offersApiService = offersApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = await this.#offersApiService.offers;
    } catch(err) {
      this.offers = [];
    }
  }

  getOffersByType(type) {
    const offersByType = this.#offers.find((offer) => offer.type === type) ?? [];
    return offersByType;
  }

}


