import { RootStore } from "models/root";

let widgetStore: RootStore | null = null;

export const initRootStore = (initialDealerIds?: string[]) => {
  widgetStore = new RootStore(initialDealerIds);
  return widgetStore;

};

export const getRootStore = (): RootStore => {
  if (!widgetStore) throw new Error('RootStore не инициализирован');
  return widgetStore;
};