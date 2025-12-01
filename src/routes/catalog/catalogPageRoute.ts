import { createRoute } from '@tanstack/react-router';
import { rootRoute } from 'routes/root';
import { CatalogPage } from './CatalogPage';
import { CatalogSearchParams } from 'models/catalogFilters';

export const catalogPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/catalog',
  component: CatalogPage,
  validateSearch: (search: Record<string, unknown>): CatalogSearchParams => {
    let dealers: string | undefined;

    if (Array.isArray(search.dealers)) {
      dealers = search.dealers.join(','); // объединяем в одну строку
    } else if (typeof search.dealers === 'string') {
      dealers = search.dealers;
    }

    let priceOrder: 'asc' | 'desc' | undefined;
    
    if (search.priceOrder === 'asc' || search.priceOrder === 'desc') {
      priceOrder = search.priceOrder;
    }

    return {
      dealers,
      priceOrder
    }
  }
});
