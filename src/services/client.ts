import axios, { AxiosResponse } from "axios";

import auth from "./auth";

export const backendURL = "campus-mart-site.onrender.com/api";

export const authTokenKey = "x-auth-token";

const apiClient = axios.create({ baseURL: `https://${backendURL}` });
apiClient.interceptors.request.use((config) => {
  const authToken = auth.getJwt();

  if (authToken && config.headers) {
    config.headers[authTokenKey] = authToken;
  }

  return config;
});

export const processResponse = ({ data, status }: AxiosResponse) => {
  const response: { ok: boolean; data: unknown } = { ok: false, data: [] };

  if (status >= 200 && status < 300) response.ok = true;
  response.data = data;

  return response;
};

export default apiClient;
