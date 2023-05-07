import { UserLogin, UserCreate, AuthResponse } from "@/types";
import { AxiosInstance } from "axios";

const userServices = (api: AxiosInstance) => ({
  login: (params: UserLogin) =>
    api.post<AuthResponse>("/login_cliente", params),
  register: (params: UserCreate) =>
    api.post<AuthResponse>("/registro_app", params),
});

export { userServices };
