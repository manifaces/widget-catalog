import { createRoute } from '@tanstack/react-router';
import { CatalogSearchParams } from 'models/catalogFilters';
import { rootRoute } from 'routes/root';
import { CatalogPage } from './CatalogPage';

export const catalogPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/catalog',
  component: CatalogPage,
  validateSearch: (search: Record<string, unknown>): CatalogSearchParams => {
    let dealers: string | undefined;

    if (Array.isArray(search.dealers)) {
      dealers = search.dealers.join(',');
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
