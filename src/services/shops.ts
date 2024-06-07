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

const update = async (shop: object, shopId: string) => {
  try {
    return processResponse(await client.patch(`${endpoint}/${shopId}`, shop));
  } catch (error) {}
};

const getShop = (shopId: string) => client.get(`${endpoint}/${shopId}`);

const getShops = async (): Promise<Shop[]> => {
  try {
    const res = processResponse(await client.get(endpoint));
    return res.ok ? (res.data as Shop[]) : [];
  } catch (error) {
    return [];
  }
};

const incViews = (shopId: string) =>
  client.patch(`${endpoint}/views/${shopId}`);

export default { create, incViews, getShop, getShopProducts, getShops, update };
