import { createRoute } from '@tanstack/react-router';
import { rootRoute } from 'routes/root';
import { HomePage } from './HomePage';

export const homePageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage
});
