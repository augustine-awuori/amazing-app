import { Route, Routes } from "react-router-dom";

import { ProductsPage } from "../pages";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<ProductsPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
