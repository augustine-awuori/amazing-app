import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  ChatsPage,
  EventsPage,
  NotFoundPage,
  NotificationsPage,
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
  ActiveChatIdContext,
  ImagesContext,
  NotificationsContext,
  OrderContext,
  PostersContext,
  ProfileUserContext,
  ShopsContext,
} from "../contexts";
import { endpoint } from "../services/notifications";
import { Notification } from "./Notification";
import { Order } from "../hooks/useOrder";
import { Poster } from "../hooks/usePosters";
import { Shop } from "../hooks/useShop";
import { useData } from "../hooks";
import RedirectRoot from "../navigation/RedirectRoot";
import useUser, { User } from "../hooks/useUser";

const AppRoutes = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [posters, setPosters] = useState<Poster[]>([]);
  const [order, setOrder] = useState<Order>();
  const [profileUser, setProfileUser] = useState<User>();
  const [activeChatId, setActiveChatId] = useState("");
  const { user } = useUser();
  const { data } = useData<Notification>(`${endpoint}/seller`);

  useEffect(() => {
    setNotifications(data);
  }, []);

  return (
    <ActiveChatIdContext.Provider value={{ activeChatId, setActiveChatId }}>
      <ShopsContext.Provider value={{ shops, setShops }}>
        <ImagesContext.Provider value={{ images, setImages }}>
          <ProfileUserContext.Provider value={{ profileUser, setProfileUser }}>
            <OrderContext.Provider value={{ order, setOrder }}>
              <PostersContext.Provider value={{ posters, setPosters }}>
                <NotificationsContext.Provider
                  value={{ notifications, setNotifications }}
                >
                  <Routes>
                    <Route path="/chats" element={<ChatsPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route
                      path="/notifications"
                      element={<NotificationsPage />}
                    />
                    <Route path="/mart/cart" element={<ShoppingCartPage />} />
                    <Route
                      path="/mart/profile/:userId"
                      element={<ProfilePage />}
                    />
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
                    <Route
                      path="/mart/shops/:shopName"
                      element={<ShopPage />}
                    />
                    <Route
                      path="/mart/shops/:shopName/orders"
                      element={<ShopOrdersPage />}
                    />
                    <Route
                      path="/mart/shops/:shopName/orders/:orderId"
                      element={<ShopOrderPage />}
                    />
                    <Route path="/mart/shops/new" element={<ShopEditPage />} />
                    <Route path="/mart" element={<ProductsPage />} />
                    <Route index element={<RedirectRoot />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </NotificationsContext.Provider>
              </PostersContext.Provider>
            </OrderContext.Provider>
          </ProfileUserContext.Provider>
        </ImagesContext.Provider>
      </ShopsContext.Provider>
    </ActiveChatIdContext.Provider>
  );
};

export default AppRoutes;
