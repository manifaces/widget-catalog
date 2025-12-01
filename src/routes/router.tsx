import { createRouter } from '@tanstack/react-router';
import { cartRoute } from './cart';
import { catalogRoute } from './catalog';
import { homeRoute } from './home';
import { rootRoute } from './root';

const routeTree = rootRoute.addChildren([homeRoute, catalogRoute, cartRoute]);

export const router = createRouter({
  routeTree,
  scrollRestoration: true,
});