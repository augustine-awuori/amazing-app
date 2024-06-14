import { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  AxiosHeaderValue,
  AxiosResponseHeaders,
  RawAxiosResponseHeaders,
} from "axios";

import { authTokenKey, processResponse } from "../services/client";
import { UserContext } from "../contexts";
import auth, { googleAuth, GoogleUser } from "../services/auth";
import logger from "../utils/logger";
import usersApi from "../services/users";
import { createAndGetChatToken } from "../services/chatToken";
import { toast } from "react-toastify";

export interface OtherAccounts {
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
  youtube?: string;
}

export interface User {
  _id: string;
  aboutMe?: string;
  avatar?: string;
  chatToken?: string;
  email: string;
  chatIds?: { [email: string]: string };
  isAdmin: boolean;
  isVerified: boolean;
  name: string;
  otherAccounts?: OtherAccounts;
  pushTokens?: { [token: string]: string };
  timestamp: number;
}

const useUser = (): {
  user: User | undefined;
  googleUser: null | GoogleUser | undefined;
} => {
  const { setUser, user } = useContext(UserContext);
  const [googleUser] = useAuthState(googleAuth);

  useEffect(() => {
    retrieveUser();
    checkChatToken();
  }, [googleUser?.uid, user?._id]);

  const loginWithJwt = (
    headers:
      | AxiosResponseHeaders
      | Partial<
          RawAxiosResponseHeaders & {
            Server: AxiosHeaderValue;
            "Content-Type": AxiosHeaderValue;
            "Content-Length": AxiosHeaderValue;
            "Cache-Control": AxiosHeaderValue;
            "Content-Encoding": AxiosHeaderValue;
          }
        >
  ) => {
    const jwt = headers?.[authTokenKey];

    if (jwt) auth.loginWithJwt(jwt);
  };

  async function retrieveUser() {
    if (googleUser && !user?.email) {
      const res = await usersApi.register({
        email: googleUser.email || "",
        name: googleUser.displayName || "",
        avatar: googleUser.photoURL || "",
      });

      if (processResponse(res).ok) {
        setUser(res.data as User);
        loginWithJwt(res.headers);
      } else toast.error("Failed to login");
    }
  }

  async function checkChatToken() {
    if (!user || user.chatToken) return;

    const res = await createAndGetChatToken();
    if (res?.ok) setUser({ ...user, chatToken: res.data as string });
  }

  return { user, googleUser };
};

export default useUser;
