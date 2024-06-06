import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { NewShop, NewShopTypes, Shop } from "./useShop";
import { ShopsContext } from "../contexts";
import { ShopTypes } from "../components/shop/TypesSelector";
import service from "../services/shops";

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

  return { create, isLoading, shops };
};

export default useShops;
