import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getProducts } from "../services/products";
import { ProductsContext } from "../contexts";
import { ShopProduct } from "./useShop";
import { User } from "./useUser";
import service from "../services/products";
import storage from "../db/image";

interface Item {
  _id: string;
  icon?: React.JSX.Element;
  label: string;
  onClick?: () => void;
  rightIcon?: React.JSX.Element;
  route?: string;
}

export interface ProductType extends Item {}

export interface View {
  _id: string;
  viewer: string;
  timestamp: number;
}

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
  views?: View[];
}

export default () => {
  const { products, setProducts } = useContext(ProductsContext);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    prepareProducts();
  }, []);

  const prepareProducts = async () => {
    if (!products.length) setLoading(true);
    const data = await getProducts();

    if (!products.length) {
      setProducts(data);
      setLoading(false);
      return;
    }

    if (data.length !== products.length) setProducts(data);
  };

  const deleteProductById = async (productId: string) => {
    const initial = [...products];
    let found: Product | undefined;

    toast.loading("Deleting product...");
    setProducts(
      initial.filter((p) => {
        if (p._id === productId) found = p;

        return p._id !== productId;
      })
    );

    const { ok, problem } = await service.deleteProductBy(productId);
    toast.dismiss();

    let error = problem || "Product deletion terminated unsuccessfully!";
    if (!ok) {
      setProducts(initial);
      toast.error(error);
    } else {
      storage.deleteImages(found?.images || []);
      toast("Product deleted succesfully!");
    }

    return { ok, error };
  };

  const findById = (id: string | undefined) =>
    products.find((p) => p._id === id);

  const findByIdAndUpdate = (id: string, update: Product) => {
    const updated = products.map((p) => (p._id === id ? update : p));

    setProducts(updated);
  };

  return {
    deleteProductById,
    findById,
    findByIdAndUpdate,
    products,
    isLoading,
  };
};
