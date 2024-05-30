import { Product } from "../hooks/useProducts";
import apiClient, { processResponse } from "./client";

const endpoint = "/products";

export const getProducts = async (): Promise<Product[]> => {
  const response = processResponse(await apiClient.get(endpoint));

  return response.ok ? (response.data as Product[]) : [];
};

export const getProduct = async (productId: string) =>
  await apiClient.get(`${endpoint}/single/${productId}`);

export default { getProducts, getProduct };
