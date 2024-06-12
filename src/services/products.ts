import { Product } from "../hooks/useProducts";
import apiClient, { emptyResponse, processResponse } from "./client";

export const endpoint = "/products";

export interface NewProduct {
  author: string;
  description?: string | undefined;
  name: string;
  price: number;
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

const getProductURL = (productId: string) => `${endpoint}/${productId}`;

const deleteProductBy = async (productId: string) => {
  try {
    return processResponse(await apiClient.delete(getProductURL(productId)));
  } catch (error) {
    return emptyResponse;
  }
};

const update = async (info: object, productId: string) => {
  try {
    return processResponse(
      await apiClient.patch(getProductURL(productId), info)
    );
  } catch (error) {
    return emptyResponse;
  }
};

export default { create, deleteProductBy, getProducts, getProduct, update };
