import React, { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Chat } from "stream-chat-react";
import { DefaultGenerics, StreamChat } from "stream-chat";
import { toast } from "react-toastify";

import { authTokenKey, processResponse } from "./services/client";
import { BottomNav, NavBar, Routes } from "./components";
import { createAndGetChatToken } from "./services/chatToken";
import { LoadingPage } from "./pages";
import { Product } from "./hooks/useProducts";
import {
  ProductsContext,
  ShowDrawerContext,
  ShowNavContext,
  UserContext,
} from "./contexts";
import auth from "./services/auth";
import CartContext, { CartProducts } from "./contexts/CartContext";
import Drawer from "./components/common/Drawer";
import DrawerContent from "./components/drawer/DrawerContent";
import usersApi from "./services/users";
import useUser, { User } from "./hooks/useUser";

const apiKey = "nhum746n7hwy";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User>();
  const { googleUser } = useUser();
  const [client, setClient] = useState<StreamChat<DefaultGenerics>>();
  const [showNav, setShowNav] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [cartProducts, setCartProducts] = useState<CartProducts>({
    count: 0,
    ids: {},
  });

  useEffect(() => {
    initUser();
    checkChatToken();
    initChatClient();
    showRegisteredActiveUsers();
  }, [client, user?._id, user?.chatToken]);

  async function showRegisteredActiveUsers() {
    if (!user?.isAdmin) return;

    const response = await client?.queryUsers({});

    const onlineCount =
      response?.users.filter((user) => user.online).length || 0;
    const countIsOne = onlineCount === 1;

    toast(
      `${onlineCount} registered user${countIsOne ? "" : "s"} ${
        countIsOne ? "is" : "are"
      } online`
    );
  }

  async function initChatClient() {
    if (!user || !user.chatToken || client?.userID) return;

    const chatClient = StreamChat.getInstance(apiKey);
    await chatClient.connectUser(
      { id: user._id, name: user.name, image: user.avatar },
      user.chatToken
    );

    setClient(chatClient);
  }

  async function initUser() {
    if (user) return;

    const storedUser = auth.getCurrentUserFromStorage();
    if (storedUser) return setUser(storedUser);

    if (!googleUser) return;
    const { email, displayName, photoURL } = googleUser;
    if (!email || !displayName || !photoURL) return;
    const res = await usersApi.quickAuth({
      email,
      name: displayName,
      avatar: photoURL,
    });

    const { data, ok } = processResponse(res);
    if (ok) {
      auth.loginWithJwt(res.headers[authTokenKey]);
      setUser(data as User);
    } else toast.error("Login failed");
  }

  async function checkChatToken() {
    if (!user || user.chatToken) return;

    const res = await createAndGetChatToken();

    if (res?.ok)
      setUser((prevUser) => ({
        ...(prevUser as User),
        chatToken: res.data as string,
      }));
    else {
      toast.error(res.problem);
      auth.logout();
      window.location.href = "/";
    }
  }

  if (!client) {
    initChatClient();
    return <LoadingPage />;
  }

  const Container = ({ children }: { children: ReactNode }) =>
    client.userID ? (
      <Chat client={client} theme="messaging light">
        {children}
      </Chat>
    ) : (
      <React.Fragment>{children}</React.Fragment>
    );

  return (
    <Container>
      <UserContext.Provider value={{ user, setUser }}>
        <ProductsContext.Provider value={{ products, setProducts }}>
          <CartContext.Provider value={{ cartProducts, setCartProducts }}>
            <ShowDrawerContext.Provider value={{ setShowDrawer, showDrawer }}>
              <ShowNavContext.Provider value={{ setShowNav, showNav }}>
                <NavBar />
                <article style={{ marginTop: "4.5rem", marginBottom: "5rem" }}>
                  <Drawer
                    children={<DrawerContent />}
                    isOpen={showDrawer}
                    toggleDrawer={() => setShowDrawer(false)}
                  />
                  <Routes />
                </article>
              </ShowNavContext.Provider>
            </ShowDrawerContext.Provider>
            <BottomNav />
          </CartContext.Provider>
        </ProductsContext.Provider>
      </UserContext.Provider>
    </Container>
  );
}

export default App;
