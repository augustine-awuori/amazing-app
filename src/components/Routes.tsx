import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  ChatsPage,
  EventsPage,
  MartGuidePage,
  NotFoundPage,
  NotificationsPage,
  ProductActivityPage,
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
  ShopsPage,
} from "../pages";
import {
  ImagesContext,
  NotificationsContext,
  OrderContext,
  PostersContext,
  ProfileUserContext,
  ShopsContext,
  UsersContext,
} from "../contexts";
import { endpoint } from "../services/notifications";
import { Notification } from "./Notification";
import { Order } from "../hooks/useOrder";
import { Poster } from "../hooks/usePosters";
import { Shop } from "../hooks/useShop";
import { useData } from "../hooks";
import { User } from "../hooks/useUser";
import RedirectRoot from "../navigation/RedirectRoot";

const AppRoutes = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [posters, setPosters] = useState<Poster[]>([]);
  const [order, setOrder] = useState<Order>();
  const [profileUser, setProfileUser] = useState<User>();
  const [activeChatId, setActiveChatId] = useState("");
  const { data } = useData<Notification>(`${endpoint}/seller`);
  const { data: shopsData, isLoading: shopsLoading } = useData<Shop>("/shops");
  const { data: usersData } = useData<User>("/users");

  useEffect(() => {
    setNotifications(data);
    setShops(shopsData);
    setUsers(usersData);
  }, [shopsData.length]);

  return (
    <ShopsContext.Provider value={{ shops, setShops, isLoading: shopsLoading }}>
      <ImagesContext.Provider value={{ images, setImages }}>
        <UsersContext.Provider value={{ users, setUsers }}>
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
                    <Route path="/mart/guides" element={<MartGuidePage />} />
                    <Route
                      path="/mart/guides/:guide"
                      element={<MartGuidePage />}
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
                      path="/mart/products/:productId/activity"
                      element={<ProductActivityPage />}
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
                    <Route path="/mart/shops" element={<ShopsPage />} />
                    <Route path="/mart" element={<ProductsPage />} />
                    <Route index element={<RedirectRoot />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </NotificationsContext.Provider>
              </PostersContext.Provider>
            </OrderContext.Provider>
          </ProfileUserContext.Provider>
        </UsersContext.Provider>
      </ImagesContext.Provider>
    </ShopsContext.Provider>
  );
};

export default AppRoutes;
