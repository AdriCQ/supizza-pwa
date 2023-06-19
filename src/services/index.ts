// import { type ResponseData } from "@/types";
import { api } from "./axios";
import { userServices } from "./users";
import { offerServices } from "./offers";
import { orderServices } from "./orders";
/**
 * useService
 * @param api
 */
export const useService = () => ({
  // loadData: () => api.get<ResponseData>("/data.json"),
  offers: offerServices(api),
  orders: orderServices(api),
  user: userServices(api),
});

export * from "./geolocation";
