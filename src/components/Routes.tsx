import { Route, Routes } from "react-router-dom";

import { ProductDetailsPage, ProductsPage, ShoppingCartPage } from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/cart" element={<ShoppingCartPage />} />
      <Route path="/products/:productId" element={<ProductDetailsPage />} />
      <Route index element={<ProductsPage />} />
    </Routes>
  );
};

export default AppRoutes;
