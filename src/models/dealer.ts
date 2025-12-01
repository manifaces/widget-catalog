import { makeAutoObservable } from 'mobx';
import { ApiDealerId } from 'services';

export class Dealer {
  id = '';

  constructor(apiDealerId?: ApiDealerId) {
    if (apiDealerId) {
      this.setFromApi(apiDealerId);
    }

    makeAutoObservable(this);
  }

  get displayName() {
    return this.id;
  }

  setFromApi(apiDealerId: ApiDealerId) {
    this.id = apiDealerId;
  }
}