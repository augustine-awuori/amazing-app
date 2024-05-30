import { create } from "apisauce";

export const backendURL = "campus-mart-site.onrender.com/api";

const apiClient = create({ baseURL: `https://${backendURL}` });

export default apiClient;
