import { createRouter } from '@tanstack/react-router';
import { homeRoute } from './home';
import { rootRoute } from './root';
import { catalogRoute } from './catalog';
import { cartRoute } from './cart';

const routeTree = rootRoute.addChildren([homeRoute, catalogRoute, cartRoute]);

export const router = createRouter({
  routeTree,
  scrollRestoration: true,
});