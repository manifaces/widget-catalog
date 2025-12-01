export type ApiDealerId = string;

export interface ApiProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}

export type PriceSortOrder = 'asc' | 'desc' | null;