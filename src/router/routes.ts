import AppVue from '@/App.vue';
import { RouteRecordRaw } from 'vue-router';
import { ROUTE_NAME } from './names';


export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: AppVue
	},
	// {
	// 	path: '/:catchAll(.*)*',
	// 	component: () => import('@/pages/ErrorNotFound.vue'),
	// },
];
