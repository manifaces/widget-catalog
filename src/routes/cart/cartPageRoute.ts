import { createRoute } from '@tanstack/react-router';
import { rootRoute } from 'routes/root';
import { CartPage } from './CartPage';

export const cartPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartPage
});
