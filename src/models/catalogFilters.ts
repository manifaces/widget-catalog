import { makeAutoObservable } from "mobx";
import { PriceSortOrder } from "services";
import { Dealer } from "./dealer";
import { Dealers } from "./dealers";

export interface CatalogSearchParams {
  dealers?: string;
  priceOrder?: 'asc' | 'desc';
}

const STORAGE_KEY = 'catalogFilters';
const STORAGE_TTL = 10 * 60 * 1000;

export class CatalogFilters {
  selectedDealers: Set<Dealer> = new Set();
  priceSortOrder: PriceSortOrder = null;

  dealers: Dealers;

  constructor(dealers: Dealers) {
    this.dealers = dealers;
    makeAutoObservable(this);
  }

  get availableDealers(): Dealer[] {
    return this.dealers.list;
  }

  updateLocalStorage() {
    const payload = {
      timestamp: Date.now(),
      params: this.toSearchParams()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }

  initFromSearchOrStorage(search: CatalogSearchParams) {
    if (search.dealers || search.priceOrder) {
      this.initFromSearch(search);
      this.updateLocalStorage();
      
      return;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { timestamp: number; params: CatalogSearchParams };
        const age = Date.now() - parsed.timestamp;
        
        if (age < STORAGE_TTL) {
          this.initFromSearch(parsed.params);
        } else {
          localStorage.removeItem(STORAGE_KEY); // устарело — очищаем
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }

  initFromSearch(search: CatalogSearchParams) {
    if (search.dealers) {
      const ids = search.dealers.split(',');
      const selected = this.availableDealers.filter(d => ids.includes(d.id));
      this.selectedDealers = new Set(selected);
    }

    if (search.priceOrder === 'asc' || search.priceOrder === 'desc') {
      this.priceSortOrder = search.priceOrder;
    }
  }

  toSearchParams(): CatalogSearchParams {
    const params: CatalogSearchParams = {};
    
    if (this.selectedDealers.size > 0) {
      params.dealers = [...this.selectedDealers].map(d => d.id).join(',');
    }
    
    if (this.priceSortOrder) {
      params.priceOrder = this.priceSortOrder;
    }
    return params;
  }

  toggleDealer(dealer: Dealer, checked: boolean) {
    if (checked) {
      this.selectedDealers.add(dealer);
    }
    else {
      this.selectedDealers.delete(dealer);
    }

    this.updateLocalStorage();
  }

  setPriceSortOrder(order: PriceSortOrder) {
    this.priceSortOrder = order;
    this.updateLocalStorage();
  }

  clearDealers() {
    this.selectedDealers.clear();
    this.updateLocalStorage();
  }

  clear() {
    this.clearDealers();
    this.priceSortOrder = null;
    this.updateLocalStorage();
  }
}