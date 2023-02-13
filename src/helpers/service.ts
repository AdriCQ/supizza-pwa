import { IResponseData } from "@/types";
import axios, { AxiosRequestHeaders, AxiosInstance } from "axios";

const api = axios.create({
  // baseURL: 'https://n8n.terio.xyz/',
  timeout: 30000,
});

api.interceptors.request.use((req) => {
  /* Append content type header if its not present */
  if (!(req.headers as AxiosRequestHeaders)["Content-Type"]) {
    (req.headers as AxiosRequestHeaders)["Content-Type"] = "application/json";
  }
  return req;
});
/**
 * useService
 * @param api
 */
const useService = (api: AxiosInstance) => ({
  loadData: () => api.get<IResponseData>("/pizza.json"),
});
/**
 * service
 */
const $service = useService(api);

export { $service, useService, api };
