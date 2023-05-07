import { type ResponseData } from "@/types";
import type { AxiosInstance } from "axios";
import { api } from "./axios";
/**
 * useService
 * @param api
 */
const useService = (api: AxiosInstance) => ({
  loadData: () => api.get<ResponseData>("/data.json"),
});
/**
 * service
 */
const $service = useService(api);

export { $service, useService };
