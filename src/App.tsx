import { useEffect, useState } from "react";
import { Chat } from "stream-chat-react";
import { DefaultGenerics, StreamChat } from "stream-chat";
import { toast } from "react-toastify";

import { authTokenKey, processResponse } from "./services/client";
import { BottomNav, NavBar, Routes } from "./components";
import { createAndGetChatToken } from "./services/chatToken";
import { Product } from "./hooks/useProducts";
import { ProductsContext, ShowNavContext, UserContext } from "./contexts";
import auth from "./services/auth";
import CartContext, { CartProducts } from "./contexts/CartContext";
import usersApi from "./services/users";
import useUser, { User } from "./hooks/useUser";

const apiKey = "nhum746n7hwy";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User>();
  const { googleUser } = useUser();
  const [client, setClient] = useState<StreamChat<DefaultGenerics>>();
  const [showNav, setShowNav] = useState(true);
  const [cartProducts, setCartProducts] = useState<CartProducts>({
    count: 0,
    ids: {},
  });

  useEffect(() => {
    initUser();
    checkChatToken();
    initChatClient();
  }, [user?._id, googleUser?.uid, auth.getJwt(), client?.userID]);

  function initChatClient() {
    if (!user || !user.chatToken) return;

    const chatClient = StreamChat.getInstance(apiKey);
    chatClient.connectUser(
      { id: user._id, name: user.name, image: user.avatar },
      user.chatToken
    );

    setClient(chatClient);
  }

  async function initUser() {
    if (user) return;

    const storedUser = auth.getCurrentUserFromStorage();
    if (storedUser) return setUser(storedUser);

    // TODO: Rectify google login first
    // if (!googleUser) return;
    // const { email, displayName, photoURL } = googleUser;
    // if (!email || !displayName || !photoURL) return;
    // const res = await usersApi.register({
    //   email,
    //   name: displayName,
    //   password: "",
    // });

    // const { data, ok } = processResponse(res);
    // if (ok) {
    //   auth.loginWithJwt(res.headers[authTokenKey]);
    //   setUser(data as User);
    // } else toast.error("Login failed");
  }

  const checkChatToken = async () => {
    if (!user || user.chatToken) return;

    try {
      const res = await createAndGetChatToken();
      if (res?.ok)
        setUser((prevUser) => ({
          ...(prevUser as User),
          chatToken: res.data as string,
        }));
    } catch (error) {
      toast.error("Failed to get chat token");
    }
  };

  const MainApp = () => (
    <UserContext.Provider value={{ user, setUser }}>
      <ProductsContext.Provider value={{ products, setProducts }}>
        <CartContext.Provider value={{ cartProducts, setCartProducts }}>
          <ShowNavContext.Provider value={{ setShowNav, showNav }}>
            <NavBar />
            <article style={{ marginTop: "4.5rem" }}>
              <Routes />
            </article>
          </ShowNavContext.Provider>
          <BottomNav />
        </CartContext.Provider>
      </ProductsContext.Provider>
    </UserContext.Provider>
  );

  if (!user) return <MainApp />;

  if (!client) {
    initChatClient();
    return <></>;
  }

  return (
    <Chat client={client} theme="messaging light">
      <MainApp />
    </Chat>
  );
}

export default App;
