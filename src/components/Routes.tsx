import { Route, Routes } from "react-router-dom";

import { ProductDetailsPage, ProductsPage } from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/products/:productId" element={<ProductDetailsPage />} />
      <Route index element={<ProductsPage />} />
    </Routes>
  );
};

export default AppRoutes;
