import type { IAddress, IClient, IOrder, IOrderCreate, IProduct, IOrderProduct, IMapGeolocation, IAddressCreate } from '@/types';
import axios, { AxiosRequestHeaders } from 'axios';

const api = axios.create({
	// baseURL: 'https://n8n.terio.xyz/',
	timeout: 30000,
});

api.interceptors.request.use(req => {
	/* Append content type header if its not present */
	if (!(req.headers as AxiosRequestHeaders)['Content-Type']) {
		(req.headers as AxiosRequestHeaders)['Content-Type'] =
			'application/json';
	}

	return req;
});

export interface IRecord<T> {
	id: number;
	fields: T;
}

export interface IResponse<T> {
	records: IRecord<T>
}
export interface IResponseArray<T> {
	records: IRecord<T>[];
}
const useServices = () => ({
	/**
	 * getProducts
	 * @returns 
	 */
	getProducts: () => api.get<IProduct[]>('https://n8n.terio.xyz/webhook/get_products'),
	/**
	 * getOrders
	 * @returns 
	 */
	getOrders: () => api.get<IResponseArray<IOrder>>('https://docs.getgrist.com/api/docs/p243WUskyFAH/tables/Pedidos/records'),
	/**
	 * getOrdersByClientPhone
	 * @returns 
	 */
	getOrdersByClientPhone: (phone: string) => {
		const params = {
			filter: JSON.stringify(
				{ "Cliente": [phone], "Status": ["Nuevo", "Aceptado", "EnRuta"] }
			)
		};
		return api.get<IResponseArray<IOrder>>('https://docs.getgrist.com/api/docs/p243WUskyFAH/tables/Pedidos/records', { params })
	},
	/**
	 * getOrderById
	 * @param data 
	 * @returns 
	 */
	getOrderById: (data: { filter: { Pedido: string[] } }) => {
		const params = {
			filter: JSON.stringify(data.filter)
		};
		return api.get<IResponseArray<IOrder>>('https://docs.getgrist.com/api/docs/p243WUskyFAH/tables/Pedidos/records', { params })
	},
	/**
	 * getAddressByPhone
	 * @param data 
	 * @returns 
	 */
	getAddressByPhone: (data: { filter: { Cliente: string[] } }) => {
		const params = {
			filter: JSON.stringify(data.filter)
		}
		return api.get<IResponseArray<IAddress>>('https://docs.getgrist.com/api/docs/p243WUskyFAH/tables/Direcciones/records', { params })
	},
	/**
	 * createOrder
	 * @param params 
	 * @returns 
	 */
	createOrder: (params: IOrderCreate) => api.post<IOrder>('https://n8n.terio.xyz/webhook/create_order', params),
	/**
	 * createClient
	 * @param params 
	 * @returns 
	 */
	createClient: (params: IClient) => api.post<IOrder>('https://n8n.terio.xyz/webhook/24Link/v1/prod/clientCreateOne', params),
	/**
	 * createClientAddress
	 * @param params 
	 * @returns 
	 */
	createClientAddress: (params: { records: { fields: IAddressCreate }[] }) => api.post<IAddress>('https://docs.getgrist.com/api/docs/p243WUskyFAH/tables/Direcciones/records', params),
	/**
	 * getProductsByOrder
	 * @param pedidoId 
	 * @returns 
	 */
	getProductsByOrder: (pedidoId: string) => {
		const params = {
			filter: JSON.stringify({ PedidoId: [pedidoId] })
		}
		return api.get<IResponseArray<IOrderProduct>>('https://docs.getgrist.com/api/docs/p243WUskyFAH/tables/ProductosEnPedido/records', {
			params
		});
	}
});

const useMapServices = () => ({
	reverse: (params: { lat: number, lon: number }) => {
		return api.get<IMapGeolocation>('https://nominatim.openstreetmap.org/reverse', {
			params: {
				format: 'json',
				...params,
			}
		})
	}
})

export { useServices, api, useMapServices }