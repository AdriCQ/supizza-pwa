import type { RouteRecordRaw } from "vue-router";
import { ROUTE_NAME } from "./names";
import MainLayout from "@/components/layouts/MainLayout.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: ROUTE_NAME.HOME,
        component: () => import("@/pages/HomePage.vue"),
      },
      {
        path: "details",
        name: ROUTE_NAME.HOME,
        component: () => import("@/pages/OfferDetails.vue"),
      },
    ],
  },
  // {
  // 	path: '/:catchAll(.*)*',
  // 	component: () => import('@/pages/ErrorNotFound.vue'),
  // },
];
