import { Product } from "../hooks/useProducts";
import apiClient from "./client";

export const endpoint = "/products";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await apiClient.get(endpoint);
    return data as Product[];
  } catch (error) {
    return [];
  }
};

export const getProduct = async (productId: string) =>
  await apiClient.get(`${endpoint}/single/${productId}`);

export default { getProducts, getProduct };
