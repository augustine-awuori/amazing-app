import { endpoint } from "./products";
import { Product } from "../hooks/useProducts";
import client, { processResponse } from "./client";

export const getShopProducts = async (shopId: string): Promise<Product[]> => {
  try {
    const res = processResponse(await client.get(`${endpoint}/${shopId}`));

    return res.ok ? (res.data as Product[]) : [];
  } catch (error) {
    return [];
  }
};

export default { getShopProducts };
