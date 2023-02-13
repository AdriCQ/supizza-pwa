import type { RouteRecordRaw } from "vue-router";
import { ROUTE_NAME } from "./names";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: ROUTE_NAME.HOME,
    component: () => import("@/pages/HomePage.vue"),
  },
  {
    path: "/details",
    name: ROUTE_NAME.OFFER_DETAILS,
    component: () => import("@/pages/OfferDetails.vue"),
  },
  // {
  // 	path: '/:catchAll(.*)*',
  // 	component: () => import('@/pages/ErrorNotFound.vue'),
  // },
];
