import { type ResponseData } from "@/types";
import { api } from "./axios";
import { userServices } from "./users";
import { offerServices } from "./offers";
/**
 * useService
 * @param api
 */
export const useService = () => ({
  loadData: () => api.get<ResponseData>("/data.json"),
  offers: offerServices(api),
  user: userServices(api),
});
