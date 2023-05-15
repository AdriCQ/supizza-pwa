import { UserLogin, UserCreate, AuthResponse } from "@/types";
import { AxiosInstance } from "axios";

const userServices = (api: AxiosInstance) => ({
  login: (params: UserLogin) =>
    api.post<AuthResponse>("/api/login_cliente", params),
  register: (params: UserCreate) =>
    api.post<AuthResponse>("/api/registro_app", params),
});

export { userServices };
