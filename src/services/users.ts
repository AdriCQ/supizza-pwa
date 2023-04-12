import { UserCreate, UserVerify } from "@/types";
import { api } from "./axios";

const userServices = () => ({
  /**
   * create
   * @param UserCreate params
   * @returns AxiosPromise
   */
  create: (params: UserCreate) => api.post("/api", params),
  /**
   * verify
   * @param UserVerify params
   * @returns AxiosPromise
   */
  verify: (params: UserVerify) => api.post("/api", params),
});

export { userServices };
