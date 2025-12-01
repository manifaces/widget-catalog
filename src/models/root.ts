import { makeAutoObservable } from 'mobx';
import { Cart } from './cart';
import { Catalog } from './catalog';
import { CatalogFilters } from './catalogFilters';
import { Dealers } from './dealers';

export class RootStore {
  catalog: Catalog;
  filters: CatalogFilters;
  dealers: Dealers;
  cart: Cart;

  constructor(initialDealerIds?: string[]) {
    this.dealers = new Dealers(initialDealerIds);
    this.filters = new CatalogFilters(this.dealers);
    this.catalog = new Catalog(this.filters, this.dealers, initialDealerIds);
    this.cart = new Cart();

    makeAutoObservable(this);
  }
}