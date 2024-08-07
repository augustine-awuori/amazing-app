import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { cache } from "../utils";
import { NewShop, NewShopTypes, Shop } from "./useShop";
import { ShopsContext } from "../contexts";
import { ShopTypes } from "../components/shop/TypesSelector";
import service from "../services/shops";
import storage from "../db/image";
import useProducts from "./useProducts";

export const prepShopTypes = (
  selectedShopTypes: ShopTypes | NewShopTypes
): NewShopTypes => {
  const result: NewShopTypes = {};

  Object.keys(selectedShopTypes).forEach((id) => {
    result[id] = id;
  });

  return result;
};

const useShops = () => {
  const { setShops, shops, isLoading } = useContext(ShopsContext);
  const { products } = useProducts();

  const create = async (info: NewShop) => {
    const res = await service.create(info);
    const error = res.problem;

    if (!res.ok) toast.error(`Failed! ${error}`);
    else {
      setShops([res.data as Shop, ...shops]);
      toast.success("Shop created successfully!");
    }

    return { ...res, error };
  };

  const decShopViews = (shopId: string, initial: Shop[]) => {
    setShops(initial);
    cache.removeViewFor(shopId);
  };

  const incShopViews = async (shopId: string) => {
    if (cache.hasViewedShop(shopId)) return;

    const previous = shops;
    setShops(
      shops.map((s) => (s._id === shopId ? { ...s, views: s.views + 1 } : s))
    );

    const res = await service.incViews(shopId);
    if (!res?.ok) decShopViews(shopId, previous);
  };

  const deleteShop = async (shopId: string) => {
    toast.loading("Deleting shop from the server...");

    const res = await service.deleteShop(shopId);

    if (!res?.ok) {
      toast.error(res?.problem);
      toast.dismiss();
      return false;
    }

    toast.success("Shop deleted successfully from the server!");

    const shopToDelete = shops.find((shop) => shop._id === shopId);

    if (shopToDelete) {
      toast.loading("Deleting shop images from the server...");
      await storage.deleteImage(shopToDelete.image);

      const productDeletions = products
        .filter(({ shop }) => shop._id === shopId)
        .map(({ images }) => storage.deleteImages(images));

      await Promise.all(productDeletions);
    }

    toast.dismiss();
    return true;
  };

  return { create, deleteShop, incShopViews, isLoading, shops };
};

export default useShops;
