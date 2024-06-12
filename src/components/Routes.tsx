import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  NotFoundPage,
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
import RedirectRoot from "../navigation/RedirectRoot";

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
              <Route path="/mart/cart" element={<ShoppingCartPage />} />
              <Route path="/mart/profile/:userId" element={<ProfilePage />} />
              <Route
                path="/mart/profile/:userId/orders"
                element={<ProfileOrdersPage />}
              />
              <Route
                path="/mart/profile/:userId/orders/:orderId"
                element={<ProfileOrderPage />}
              />
              <Route
                path="/mart/products/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/mart/shops/:shopId" element={<ShopPage />} />
              <Route
                path="/mart/shops/:shopId/orders"
                element={<ShopOrdersPage />}
              />
              <Route
                path="/mart/shops/:shopId/orders/:orderId"
                element={<ShopOrderPage />}
              />
              <Route path="/mart/shops/new" element={<ShopEditPage />} />
              <Route path="/mart" element={<ProductsPage />} />
              <Route index element={<RedirectRoot />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </OrderContext.Provider>
        </ProfileUserContext.Provider>
      </ImagesContext.Provider>
    </ShopsContext.Provider>
  );
};

export default AppRoutes;
