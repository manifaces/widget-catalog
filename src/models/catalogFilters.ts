import { makeAutoObservable, runInAction } from "mobx";
import { fetchDealers, PriceSortOrder } from "services";

export interface CatalogSearchParams {
  dealers?: string;
  priceOrder?: 'asc' | 'desc';
}

const STORAGE_KEY = 'catalogFilters';
const STORAGE_TTL = 10 * 60 * 1000;

export class CatalogFilters {
  selectedDealerIds = new Set<string>();
  priceSortOrder: PriceSortOrder = null;

  availableDealers: string[] = [];
  loading = true;
  error: string | null = null;

  _initialized = false;

  constructor(initialDealerIds?: string[]) {
    makeAutoObservable(this);
    void this.init(initialDealerIds);
  }

  get initialized() {
    return this._initialized;
  }

  initializeFrom(search: CatalogSearchParams) {
    if (this._initialized) return;

    this.initFromSearchOrStorage(search);
    this._initialized = true;
  }

  private init = async (initialDealerIds?: string[]) => {
    try {
      let dealers: string[];

      if (initialDealerIds && initialDealerIds.length > 0) {
        dealers = [...initialDealerIds];
      } else {
        const apiDealers = await fetchDealers();
        dealers = apiDealers;
      }

      runInAction(() => {
        this.availableDealers = dealers;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error
          ? e.message
          : "Не удалось загрузить список дилеров";

        if (initialDealerIds && initialDealerIds.length > 0) {
          this.availableDealers = [...initialDealerIds];
        } else {
          this.availableDealers = [];
        }
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  toggleDealer(id: string, checked: boolean) {
    if (checked) {
      this.selectedDealerIds.add(id);
    } else {
      this.selectedDealerIds.delete(id);
    }
    this.updateLocalStorage();
  }

  setPriceSortOrder(order: PriceSortOrder) {
    this.priceSortOrder = order;
    this.updateLocalStorage();
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
      // this.updateLocalStorage();
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
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }

  initFromSearch(search: CatalogSearchParams) {
    if (search.dealers) {
      this.selectedDealerIds = new Set(search.dealers.split(','));
    }

    if (search.priceOrder === 'asc' || search.priceOrder === 'desc') {
      this.priceSortOrder = search.priceOrder;
    }
  }

  toSearchParams(): CatalogSearchParams {
    return {
      dealers: this.selectedDealerIds.size ? [...this.selectedDealerIds].join(',') : undefined,
      priceOrder: this.priceSortOrder ?? undefined,
    };
  }
}