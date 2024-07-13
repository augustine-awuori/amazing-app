import { createContext } from "react";

import { Shop } from "../hooks/useShop";

interface ShopsContextValue {
  shops: Shop[];
  setShops: (shops: Shop[]) => void;
  isLoading: boolean;
}

const ShopsContext = createContext<ShopsContextValue>({
  shops: [],
  setShops: () => {},
  isLoading: false,
});

ShopsContext.displayName = "Shops Context";

export default ShopsContext;
