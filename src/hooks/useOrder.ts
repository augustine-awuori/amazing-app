import { useContext } from "react";

import { OrderContext } from "../contexts";
import { Shop } from "./useShop";
import { Status } from "./useStatus";
import { User } from "./useUser";

export interface OrderProducts {
  [productId: string]: number;
}

export interface NewOrder {
  message?: string;
  products: OrderProducts;
  shop: string;
  status: string;
}

export interface Order {
  canceled: boolean;
  seen: boolean;
  _id: string;
  buyer: User;
  message?: string;
  products: OrderProducts;
  shop: Shop;
  status: Status;
  timestamp: number;
}

export default () => useContext(OrderContext);
