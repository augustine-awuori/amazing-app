import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { authTokenKey, processResponse } from "./services/client";
import { BottomNav, NavBar, Routes } from "./components";
import { createAndGetChatToken } from "./services/chatToken";
import { Product } from "./hooks/useProducts";
import { ProductsContext, UserContext } from "./contexts";
import auth from "./services/auth";
import CartContext, { CartProducts } from "./contexts/CartContext";
import usersApi from "./services/users";
import useUser, { User } from "./hooks/useUser";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User>();
  const { googleUser } = useUser();
  const [cartProducts, setCartProducts] = useState<CartProducts>({
    count: 0,
    ids: {},
  });

  useEffect(() => {
    initUser();
    checkChatToken();
  }, [user?._id, googleUser?.uid, auth.getJwt()]);

  const initUser = async () => {
    if (user) return;

    const storedUser = auth.getCurrentUserFromStorage();
    if (storedUser) return setUser(storedUser);

    if (!googleUser) return;
    const { email, displayName, photoURL } = googleUser;
    if (!email || !displayName || !photoURL) return;
    const res = await usersApi.register({
      email,
      name: displayName,
      avatar: photoURL,
      isAccountVerified: true,
    });

    const { data, ok } = processResponse(res);
    if (ok) {
      auth.loginWithJwt(res.headers[authTokenKey]);
      setUser(data as User);
    } else toast.error("Login failed");
  };

  const checkChatToken = async () => {
    if (!user || user.chatToken) return;

    try {
      const res = await createAndGetChatToken();
      if (res?.ok) {
        setUser((prevUser) => ({
          ...(prevUser as User),
          chatToken: res.data as string,
        }));
      }
    } catch (error) {
      toast.error("Failed to get chat token");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ProductsContext.Provider value={{ products, setProducts }}>
        <CartContext.Provider value={{ cartProducts, setCartProducts }}>
          <NavBar />
          <article style={{ marginTop: "4.5rem" }}>
            <Routes />
          </article>
          <BottomNav />
        </CartContext.Provider>
      </ProductsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
