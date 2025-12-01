import { makeAutoObservable, reaction, runInAction } from "mobx";
import { ApiProduct, fetchProducts } from "services";
import { CatalogFilters } from "./catalogFilters";
import { Product } from "./product";

export class Catalog {
  products: Product[] = [];
  allProducts: Product[] = [];
  loading = false;
  error: string | null = null;

  filter: CatalogFilters;
  initialDealerIds?: string[];

  constructor(filter: CatalogFilters, initialDealerIds?: string[]) {
    this.filter = filter;
    this.initialDealerIds = initialDealerIds;
    makeAutoObservable(this);
    
    void this.loadAllProducts();
    void this.loadProducts();
    
    reaction(
      () => [
        [...this.filter.selectedDealerIds].join(","),
        this.filter.priceSortOrder
      ],
      () => {
        void this.loadProducts();
      }
    );
  }

  get currentDealerIds(): string[] | undefined {
    if (this.filter.selectedDealerIds.size > 0) {
      return [...this.filter.selectedDealerIds];
    }
    return this.initialDealerIds;
  }

  loadProducts = async () => {
    this.loading = true;
    this.error = null;

    try {
      const apiProducts: ApiProduct[] = await fetchProducts(this.currentDealerIds);
      
      runInAction(() => {
        this.products = apiProducts.map(p => new Product(p));
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error 
          ? e.message 
          : "Произошла ошибка при загрузке товаров";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  loadAllProducts = async () => {
    try {
      const apiProducts: ApiProduct[] = await fetchProducts(this.initialDealerIds);
      runInAction(() => {
        this.allProducts = apiProducts.map(p => new Product(p));
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error 
          ? e.message 
          : "Произошла ошибка при загрузке товаров";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  get filteredAndSortedProducts(): Product[] {
    const result = [...this.products];

    if (this.filter.priceSortOrder === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.filter.priceSortOrder === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }

  get productsForHomeCarousel(): Product[] {
    const filtered = this.allProducts.filter(p => p.price >= 10);
    if (filtered.length >= 5) return filtered;
    return this.allProducts.slice(0, 8);
  }
}