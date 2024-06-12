import { NewOrder, Order } from "../hooks/useOrder";
import client, { processResponse } from "./client";

export const endpoint = "/orders";

const makeOrder = (order: NewOrder) => client.post(endpoint, order);

const getOrder = async (orderId: string) => {
  try {
    const res = processResponse(
      await client.get(`${endpoint}/single/${orderId}`)
    );
    if (res.ok) return res.data as Order;
  } catch (error) {}
};

const getShopOrUserOrders = async (id: string): Promise<Order[]> => {
  try {
    const res = processResponse(await client.get(`${endpoint}/${id}`));
    return res.ok ? (res.data as Order[]) : [];
  } catch (error) {
    return [];
  }
};

const updateOrder = (orderId: string, update: object) =>
  client.patch(`${endpoint}/${orderId}`, update);

export default {
  getOrder,
  getShopOrUserOrders,
  makeOrder,
  updateOrder,
};
