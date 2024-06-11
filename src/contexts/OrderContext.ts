import { createContext } from "react";

import { Order } from "../hooks/useOrder";

interface ContextValue {
  order: Order | undefined;
  setOrder: (order: Order) => void;
}

const OrderContext = createContext<ContextValue>({
  order: undefined,
  setOrder: () => {},
});

OrderContext.displayName = "Order Context";

export default OrderContext;
