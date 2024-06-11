import React, { createContext } from "react";

export interface CartProducts {
  count: number;
  ids: { [id: string]: number };
}

export interface Cart {
  cartProducts: CartProducts;
  setCartProducts: React.Dispatch<React.SetStateAction<CartProducts>>;
}

const CartContext = createContext<Cart>({
  cartProducts: { ids: {}, count: 0 },
  setCartProducts: () => {},
});

CartContext.displayName = "Cart Context";

export default CartContext;
