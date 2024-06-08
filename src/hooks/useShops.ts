import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { cache } from "../utils";
import { NewShop, NewShopTypes, Shop } from "./useShop";
import { ShopsContext } from "../contexts";
import { ShopTypes } from "../components/shop/TypesSelector";
import service from "../services/shops";
import { processResponse } from "../services/client";

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
  const { setShops, shops } = useContext(ShopsContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!shops.length) initShops();
  }, []);

  const initShops = async () => {
    setLoading(true);
    setShops(await service.getShops());
    setLoading(false);
  };

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

  return { create, incShopViews, isLoading, shops };
};

export default useShops;
