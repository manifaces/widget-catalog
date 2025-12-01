import { apiUrl } from "store/config";
import { ApiDealerId, ApiProduct } from "./types";


export const fetchDealers = async (): Promise<ApiDealerId[]> => {
  const response = await fetch(`${apiUrl}/dealers/`);
  
  if (!response.ok) {
    throw new Error(`Ошибка получения дилеров: ${response.status.toString()}`);
  }
  
  return (await response.json()) as ApiDealerId[];
};

export const fetchProducts = async (dealerIds?: string[]): Promise<ApiProduct[]> => {
  let url = `${apiUrl}/goods/`;
  
  if (dealerIds && dealerIds.length > 0) {
    const params = new URLSearchParams({ dealers: dealerIds.join(',') });
    url += `?${params}`;
  }
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Ошибка получения товаров: ${response.status.toString()}`);
  }
  
  return (await response.json()) as ApiProduct[];
};