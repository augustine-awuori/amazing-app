import axios, { AxiosResponse } from "axios";

export const backendURL = "campus-mart-site.onrender.com/api";

const apiClient = axios.create({ baseURL: `https://${backendURL}` });

export const processResponse = ({ data, status }: AxiosResponse) => {
  const response: { ok: boolean; data: unknown } = { ok: false, data: [] };

  if (status >= 200 && status < 300) response.ok = true;
  response.data = data;

  return response;
};

export default apiClient;
