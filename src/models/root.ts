import { makeAutoObservable } from 'mobx';
import { Cart } from './cart';
import { Catalog } from './catalog';
import { CatalogFilters } from './catalogFilters';

export class RootStore {
  catalog: Catalog;
  filters: CatalogFilters;
  cart: Cart;

  constructor(initialDealerIds: string[] = []) {
    this.filters = new CatalogFilters(initialDealerIds);
    this.catalog = new Catalog(this.filters, initialDealerIds);
    this.cart = new Cart();
    makeAutoObservable(this);
  }
}