import { useState } from "react";

import { BottomNav, NavBar, Routes } from "./components";
import { Product } from "./hooks/useProducts";
import { ProductsContext, UserContext } from "./contexts";
import { User } from "./hooks/useUser";
import CartContext, { CartProducts } from "./contexts/CartContext";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User>();
  const [cartProducts, setCartProducts] = useState<CartProducts>({
    count: 0,
    ids: {},
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ProductsContext.Provider value={{ products, setProducts }}>
        <CartContext.Provider value={{ cartProducts, setCartProducts }}>
          <NavBar />
          <div className="mt-20 md:mt-24 lg:mt-12.5 mb-14 md:mb-0">
            <Routes />
          </div>
          <BottomNav />
        </CartContext.Provider>
      </ProductsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
