import axios, { AxiosRequestHeaders } from "axios";

const api = axios.create({
  // baseURL: 'https://n8n.terio.xyz/',
  timeout: 30000,
});

api.interceptors.request.use((req) => {
  /* Append content type header if its not present */
  if (!(req.headers as AxiosRequestHeaders)["Content-Type"]) {
    (req.headers as AxiosRequestHeaders)["Content-Type"] = "application/json";
  }
  return req;
});

export { api };
