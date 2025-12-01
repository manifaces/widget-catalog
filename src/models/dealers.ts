import { makeAutoObservable, runInAction } from "mobx";
import { Dealer } from "./dealer";
import { ApiDealerId, fetchDealers } from "services";

export class Dealers {
  dealers: Dealer[] = [];
  loading = false;
  error: string | null = null;

  constructor(initialDealerIds?: string[]) {
    makeAutoObservable(this);

    if (initialDealerIds && initialDealerIds.length > 0) {
      runInAction(() => {
        this.dealers = initialDealerIds.map(id => new Dealer(id));
      });
    } else {
      this.loadDealers();
    }
  }

  async loadDealers() {
    this.loading = true;
    this.error = null;

    try {
      const apiDealers: ApiDealerId[] = await fetchDealers();

      runInAction(() => {
        this.dealers = apiDealers.map(id => new Dealer(id));
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error 
          ? e.message 
          : "Произошла ошибка при загрузке дилеров";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  get ready() {
    return !this.loading && !this.error && this.dealers.length > 0;
  }

  get list() {
    return [...this.dealers]
  }
}