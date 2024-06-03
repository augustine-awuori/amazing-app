import { Route, Routes } from "react-router-dom";

import {
  ProductDetailsPage,
  ProductsPage,
  ProfilePage,
  ShoppingCartPage,
} from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/cart" element={<ShoppingCartPage />} />
      <Route path="/profile/:userId" element={<ProfilePage />} />
      <Route path="/products/:productId" element={<ProductDetailsPage />} />
      <Route index element={<ProductsPage />} />
    </Routes>
  );
};

export default AppRoutes;
