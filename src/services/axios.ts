import { useUserStore } from "@/store";
import axios, { AxiosRequestHeaders } from "axios";

const api = axios.create({
  // baseURL: 'https://n8n.terio.xyz/',
  timeout: 30000,
});

api.interceptors.request.use((req) => {
  const userStore = useUserStore();
  /* Append content type header if its not present */
  if (!(req.headers as AxiosRequestHeaders)["Content-Type"]) {
    (req.headers as AxiosRequestHeaders)["Content-Type"] = "application/json";
  }
  /* Append authorization header if its not present */
  if (!(req.headers as AxiosRequestHeaders)["Authorization"]) {
    (req.headers as AxiosRequestHeaders)[
      "Authorization"
    ] = `Bearer ${userStore.auth_token}`;
  }
  return req;
});

export { api };
