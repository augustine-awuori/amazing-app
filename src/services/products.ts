import { Product } from "../hooks/useProducts";
import apiClient, { processResponse } from "./client";

export const endpoint = "/products";

export interface NewProduct {
  author: string;
  description?: string | undefined;
  name: string;
  price: string;
  images: string[];
  shop: string;
  type: string;
}

const create = async (product: NewProduct) => {
  try {
    return processResponse(await apiClient.post(endpoint, product));
  } catch (error) {}
};

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

export default { create, getProducts, getProduct };
