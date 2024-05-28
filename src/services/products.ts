import client from "./client";

export const endpoint = "/products";

export interface NewProduct {
  author: string;
  description: string;
  name: string;
  price: string;
  images: string[];
  shop: string;
  type: string;
}

const create = (product: NewProduct) => client.post(endpoint, product);

const getProductURL = (productId: string) => `${endpoint}/${productId}`;

const update = (info: object, productId: string) =>
  client.patch(getProductURL(productId), info);

const deleteProductBy = (productId: string) =>
  client.delete(getProductURL(productId));

const updateImage = (productId: string, image: string) =>
  client.patch(`${endpoint}/image/${productId}`, { image });

const getProduct = (productId: string) =>
  client.get(`${endpoint}/single/${productId}`);

export default { create, deleteProductBy, getProduct, update, updateImage };
