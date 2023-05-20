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
  {
    path: "/map",
    name: ROUTE_NAME.MAP_SELECTOR,
    component: () => import("@/pages/MapPage.vue"),
  },
  {
    path: "/cart",
    name: ROUTE_NAME.CART,
    component: () => import("@/pages/CartPage.vue"),
  },
  {
    path: "/checkout",
    name: ROUTE_NAME.CHECKOUT,
    component: () => import("@/pages/CheckoutPage.vue"),
  },
  {
    path: "/orders",
    name: ROUTE_NAME.ORDERS,
    component: () => import("@/pages/OrdersPage.vue"),
  },
  {
    path: "/address",
    name: ROUTE_NAME.ADDRESS,
    component: () => import("@/pages/AddressPage.vue"),
  },
  // {
  // 	path: '/:catchAll(.*)*',
  // 	component: () => import('@/pages/ErrorNotFound.vue'),
  // },
];
