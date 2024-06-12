import { endpoint as productsEndpoint } from "./products";
import { NewShop, Shop, UpdatableShopInfo } from "../hooks/useShop";
import { Product } from "../hooks/useProducts";
import client, { emptyResponse, processResponse } from "./client";

const endpoint = "/shops";

const create = async (shop: NewShop) => {
  try {
    return processResponse(await client.post("/shops", shop));
  } catch (error) {
    return emptyResponse;
  }
};

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

const update = async (shop: UpdatableShopInfo, shopId: string) => {
  try {
    return processResponse(await client.patch(`${endpoint}/${shopId}`, shop));
  } catch (error) {
    return emptyResponse;
  }
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

const incViews = async (shopId: string) => {
  try {
    return processResponse(await client.patch(`${endpoint}/views/${shopId}`));
  } catch (error) {}
};

const deleteShop = async (shopId: string) => {
  try {
    return processResponse(await client.delete(`${endpoint}/${shopId}`));
  } catch (error) {}
};

export default {
  create,
  deleteShop,
  incViews,
  getShop,
  getShopProducts,
  getShops,
  update,
};
