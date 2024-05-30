import React, { useContext, useEffect } from "react";

import { ProductsContext } from "../contexts";
import { ShopProduct } from "./useShop";
import { User } from "./useUser";

interface Item {
  _id: string;
  icon?: React.JSX.Element;
  label: string;
  onClick?: () => void;
  rightIcon?: React.JSX.Element;
  route?: string;
}

export interface ProductType extends Item {}

export interface Product {
  _id: string;
  author: User;
  description: string;
  images: string[];
  name: string;
  price: number;
  shop: ShopProduct;
  timestamp: number;
  type: ProductType;
}

export default () => {
  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    setProducts([]);
  }, []);

  return { products };
};
