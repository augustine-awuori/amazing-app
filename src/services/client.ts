import axios, { AxiosResponse } from "axios";

import auth from "./auth";

export const backendURL = "campus-mart-site.onrender.com/api";

export const authTokenKey = "x-auth-token";

export interface DataError {
  error?: string;
}

const apiClient = axios.create({ baseURL: `https://${backendURL}` });
apiClient.interceptors.request.use((config) => {
  const authToken = auth.getJwt();

  if (authToken && config.headers) {
    config.headers[authTokenKey] = authToken;
  }

  return config;
});

export interface Response {
  ok: boolean;
  data: unknown;
  problem: string;
}

export const emptyResponse: Response = {
  ok: false,
  data: [],
  problem: "",
};

export const processResponse = ({ data, status }: AxiosResponse) => {
  const response: Response = {
    ok: false,
    data: [],
    problem: "",
  };

  if (status >= 200 && status < 300) {
    response.ok = true;
    response.data = data;
  } else
    response.problem = (response.data as DataError).error || "Unknown Error";

  return response;
};

export default apiClient;
