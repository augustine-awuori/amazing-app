import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  ProductDetailsPage,
  ProductsPage,
  ProfileOrderPage,
  ProfileOrdersPage,
  ProfilePage,
  ShopEditPage,
  ShopOrderPage,
  ShopOrdersPage,
  ShopPage,
  ShoppingCartPage,
} from "../pages";
import {
  ImagesContext,
  OrderContext,
  ProfileUserContext,
  ShopsContext,
} from "../contexts";
import { Shop } from "../hooks/useShop";
import { User } from "../hooks/useUser";
import { Order } from "../hooks/useOrder";

const AppRoutes = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [order, setOrder] = useState<Order>();
  const [profileUser, setProfileUser] = useState<User>();

  return (
    <ShopsContext.Provider value={{ shops, setShops }}>
      <ImagesContext.Provider value={{ images, setImages }}>
        <ProfileUserContext.Provider value={{ profileUser, setProfileUser }}>
          <OrderContext.Provider value={{ order, setOrder }}>
            <Routes>
              <Route path="/cart" element={<ShoppingCartPage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
              <Route
                path="/profile/:userId/orders"
                element={<ProfileOrdersPage />}
              />
              <Route
                path="/profile/:userId/orders/:orderId"
                element={<ProfileOrderPage />}
              />
              <Route
                path="/products/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/shops/:shopId" element={<ShopPage />} />
              <Route
                path="/shops/:shopId/orders"
                element={<ShopOrdersPage />}
              />
              <Route
                path="/shops/:shopId/orders/:orderId"
                element={<ShopOrderPage />}
              />
              <Route path="/shops/new" element={<ShopEditPage />} />
              <Route index element={<ProductsPage />} />
            </Routes>
          </OrderContext.Provider>
        </ProfileUserContext.Provider>
      </ImagesContext.Provider>
    </ShopsContext.Provider>
  );
};

export default AppRoutes;
