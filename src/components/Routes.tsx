import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Product } from "../hooks/useProducts";
import { ProductsContext } from "../contexts";
import { ProductsPage } from "../pages";

const AppRoutes = () => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      <Routes>
        <Route index element={<ProductsPage />} />
      </Routes>
    </ProductsContext.Provider>
  );
};

export default AppRoutes;
