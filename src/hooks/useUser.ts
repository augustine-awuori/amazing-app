import { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithRedirect, GoogleAuthProvider, signOut } from "firebase/auth";
import {
  AxiosHeaderValue,
  AxiosResponseHeaders,
  RawAxiosResponseHeaders,
} from "axios";

import { authTokenKey, processResponse } from "../services/client";
import { UserContext } from "../contexts";
import auth, { googleAuth } from "../services/auth";
import logger from "../utils/logger";
import usersApi from "../services/users";

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
  email: string;
  chatIds?: { [email: string]: string };
  isAdmin: boolean;
  isVerified: boolean;
  name: string;
  otherAccounts?: OtherAccounts;
  pushTokens?: { [token: string]: string };
  timestamp: number;
}

export const userSignOut = () => signOut(googleAuth);

export const userSignIn = () =>
  signInWithRedirect(googleAuth, new GoogleAuthProvider());

const useUser = () => {
  const [googleUser] = useAuthState(googleAuth);
  const { setUser, user } = useContext(UserContext);

  useEffect(() => {
    retrieveUser();
  }, [googleUser?.uid]);

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
    try {
      const cachedUser = auth.getCurrentUserFromCache();
      if (!cachedUser && user?.email) await usersApi.restoreToken(user.email);

      if (cachedUser && !cachedUser?.email && googleUser?.email) {
        const res = await usersApi.updateUserInfo({
          email: googleUser.email,
          avatar: googleUser?.photoURL,
        });

        if (processResponse(res).ok) loginWithJwt(res.headers);
      }

      if (googleUser && !user?.email) {
        const res = await usersApi.register({
          email: googleUser.email || "",
          name: googleUser.displayName || "",
          avatar: googleUser.photoURL || "",
        });

        if (processResponse(res).ok) setUser(res.data as User);
        loginWithJwt(res.headers);
      }
    } catch (error) {
      logger.log(error);
    }
  }

  return { user, googleUser };
};

export default useUser;
