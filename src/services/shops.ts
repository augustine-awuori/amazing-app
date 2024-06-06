import { endpoint as productsEndpoint } from "./products";
import { NewShop, Shop } from "../hooks/useShop";
import { Product } from "../hooks/useProducts";
import client, { processResponse } from "./client";

const endpoint = "/shops";

const create = async (shop: NewShop) =>
  processResponse(await client.post("/shops", shop));

export const getShopProducts = async (shopId: string): Promise<Product[]> => {
  try {
    const res = processResponse(
      await client.get(`${productsEndpoint}/${shopId}`)
    );

    return res.ok ? (res.data as Product[]) : [];
  } catch (error) {
    return [];
  }
};

const getShops = async (): Promise<Shop[]> => {
  try {
    const res = processResponse(await client.get(endpoint));
    return res.ok ? (res.data as Shop[]) : [];
  } catch (error) {
    return [];
  }
};

export default { create, getShopProducts, getShops };
