import React, { useContext, useEffect, useState } from "react";

import { getProducts } from "../services/products";
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
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    prepareProducts();
  }, []);

  const prepareProducts = async () => {
    setLoading(true);
    setProducts(await getProducts());
    setLoading(false);
  };

  return { products, isLoading };
};
