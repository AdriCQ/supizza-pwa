import { UserCreate, UserVerify } from "@/types";
import { api } from "./axios";

const userServices = () => ({
  create: (params: UserCreate) => api.post("/api", params),
  verify: (params: UserVerify) => api.post("/api", params),
});

export { userServices };
