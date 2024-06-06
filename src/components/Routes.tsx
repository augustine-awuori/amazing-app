import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  ProductDetailsPage,
  ProductsPage,
  ProfilePage,
  ShopEditPage,
  ShopPage,
  ShoppingCartPage,
} from "../pages";
import { Shop } from "../hooks/useShop";
import { ImagesContext, ShopsContext } from "../contexts";

const AppRoutes = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [images, setImages] = useState<File[]>([]);

  return (
    <ShopsContext.Provider value={{ shops, setShops }}>
      <ImagesContext.Provider value={{ images, setImages }}>
        <Routes>
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path="/shops/:shopId" element={<ShopPage />} />
          <Route path="/shops/new" element={<ShopEditPage />} />
          <Route index element={<ProductsPage />} />
        </Routes>
      </ImagesContext.Provider>
    </ShopsContext.Provider>
  );
};

export default AppRoutes;
