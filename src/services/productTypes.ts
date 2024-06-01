import { ProductType } from "../components/products/TypesList";
import client, { processResponse } from "./client";

const endpoint = "/types";

const getProductTypes = async (): Promise<ProductType[]> => {
  try {
    const { data, ok } = processResponse(await client.get(endpoint));
    return ok ? (data as ProductType[]) : [];
  } catch (error) {
    return [];
  }
};

export default { getProductTypes };
