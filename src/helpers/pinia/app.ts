import type { ICategoryProducts, INotification, IProduct, IProductCart, IProductCategory } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const STORE_KEY = 'pinia/useAppStore';
/**
 * useAppStore
 */
export const useAppStore = defineStore(STORE_KEY, () => {
	const notifications = ref<INotification[]>([]);
	const timer = ref([]);

	function notify(n: INotification) {
		notifications.value.push(n);
		setTimeout(() => {
			notifications.value.pop();
		}, 4000);
	}

	function error(content: string) {
		notify({ content, type: 'negative' })
	}

	function success(content: string) {
		notify({ content, type: 'positive' })
	}

	function axiosError(axiosError: unknown, content = 'Ha ocurrido un error') {
		console.log({ axiosError });
		error(content);
	}

	return { notifications, notify, error, success, axiosError }
});
