import { create } from "apisauce";

import cache from "../utils/cache";

export interface DataError {
  error?: string;
}

export const backendURL = "campus-mart-site.onrender.com/api";

const apiClient = create({ baseURL: `https://${backendURL}` });

export async function getCacheData<T>(url: string) {
  return ((await cache.get(url)) || []) as T[];
}

export default apiClient;
