import type { OrderCreate } from "@/types";
import type { AxiosInstance } from "axios";

export const orderServices = (api: AxiosInstance) => ({
  createOrder: (param: OrderCreate) => api.post("/api/pedidos_app_link", param),
});
