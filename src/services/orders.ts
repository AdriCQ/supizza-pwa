import type { PedidoCreate, Pedido } from "@/types";
import type { AxiosInstance } from "axios";

export const orderServices = (api: AxiosInstance) => ({
  createOrder: (param: PedidoCreate) => api.post<Pedido>("/api/pedidos", param),
});
